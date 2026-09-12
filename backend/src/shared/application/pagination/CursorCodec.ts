import { createHmac, timingSafeEqual } from 'node:crypto';

export interface CursorPayload {
  version: 1;
  scope: string;
  sort: string;
  position: Record<string, string | number>;
}

export interface CursorCodecOptions {
  secret: string;
}

export class CursorCodec {
  private readonly secret: string;

  constructor(options: CursorCodecOptions) {
    const normalizedSecret = options.secret?.trim();

    if (!normalizedSecret) {
      throw new Error(
        'Cursor codec secret cannot be empty.',
      );
    }

    this.secret = normalizedSecret;
  }

  encode(payload: CursorPayload): string {
    this.validatePayload(payload);

    const encodedBody = Buffer
      .from(JSON.stringify(payload), 'utf8')
      .toString('base64url');

    const signature = this.sign(encodedBody);

    return `${encodedBody}.${signature}`;
  }

  decode(cursor: string): CursorPayload {
    const normalizedCursor = cursor?.trim();

    if (!normalizedCursor) {
      throw new Error('Cursor cannot be empty.');
    }

    const parts = normalizedCursor.split('.');

    if (parts.length !== 2) {
      throw new Error('Invalid cursor format.');
    }

    const [encodedBody, providedSignature] = parts;

    const expectedSignature = this.sign(encodedBody);

    const providedBuffer = Buffer.from(
      providedSignature,
      'utf8',
    );

    const expectedBuffer = Buffer.from(
      expectedSignature,
      'utf8',
    );

    if (
      providedBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(
        providedBuffer,
        expectedBuffer,
      )
    ) {
      throw new Error('Invalid cursor signature.');
    }

    let payload: unknown;

    try {
      payload = JSON.parse(
        Buffer
          .from(encodedBody, 'base64url')
          .toString('utf8'),
      );
    } catch {
      throw new Error('Invalid cursor payload.');
    }

    if (!this.isCursorPayload(payload)) {
      throw new Error('Invalid cursor payload.');
    }

    return payload;
  }

  private isCursorPayload(
    value: unknown,
  ): value is CursorPayload {
    if (
      typeof value !== 'object' ||
      value === null
    ) {
      return false;
    }

    const payload = value as Record<string, unknown>;

    if (
      payload.version !== 1 ||
      typeof payload.scope !== 'string' ||
      !payload.scope ||
      typeof payload.sort !== 'string' ||
      !payload.sort
    ) {
      return false;
    }

    if (
      typeof payload.position !== 'object' ||
      payload.position === null ||
      Array.isArray(payload.position)
    ) {
      return false;
    }

    return Object.values(
      payload.position as Record<string, unknown>,
    ).every(
      (item) =>
        (typeof item === 'string' && item.length > 0) ||
        typeof item === 'number',
    );
  }

  private validatePayload(
    payload: CursorPayload,
  ): void {
    if (payload.version !== 1) {
      throw new Error(
        'Unsupported cursor version.',
      );
    }

    if (!payload.scope.trim()) {
      throw new Error(
        'Cursor scope cannot be empty.',
      );
    }

    if (!payload.sort.trim()) {
      throw new Error(
        'Cursor sort cannot be empty.',
      );
    }

    if (
      !payload.position ||
      Object.keys(payload.position).length === 0
    ) {
      throw new Error(
        'Cursor position cannot be empty.',
      );
    }

    for (const value of Object.values(
      payload.position,
    )) {
      if (
        !(
          (typeof value === 'string' &&
            value.length > 0) ||
          typeof value === 'number'
        )
      ) {
        throw new Error(
          'Cursor position contains an invalid value.',
        );
      }
    }
  }

  private sign(value: string): string {
    return createHmac(
      'sha256',
      this.secret,
    )
      .update(value)
      .digest('base64url');
  }
}