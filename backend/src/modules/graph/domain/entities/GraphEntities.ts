import { GraphValidationError } from '../errors/GraphErrors';

export interface SourceCitation {
  readonly sourceId: string;
  readonly confidence: number;
  readonly provenance: string;
}

function cloneRecord(
  value: Record<string, unknown>,
): Record<string, unknown> {
  return { ...value };
}

function cloneSources(
  sources: readonly SourceCitation[],
): SourceCitation[] {
  return sources.map((source) => ({
    sourceId: source.sourceId,
    confidence: source.confidence,
    provenance: source.provenance,
  }));
}

function validateIdentifier(
  value: string,
  fieldName: string,
): string {
  const normalized = value?.trim();

  if (!normalized) {
    throw new GraphValidationError(
      `${fieldName} is required.`,
    );
  }

  return normalized;
}

function validateRecord(
  value: Record<string, unknown>,
  fieldName: string,
): void {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    throw new GraphValidationError(
      `${fieldName} must be an object.`,
    );
  }
}

function validateSources(
  sources: readonly SourceCitation[],
): void {
  for (const source of sources) {
    validateIdentifier(
      source.sourceId,
      'Source citation source ID',
    );

    if (
      !Number.isFinite(source.confidence) ||
      source.confidence < 0 ||
      source.confidence > 1
    ) {
      throw new GraphValidationError(
        'Source citation confidence must be a number between 0 and 1.',
      );
    }

    validateIdentifier(
      source.provenance,
      'Source citation provenance',
    );
  }
}

export class GraphNode {
  private readonly _entityId: string;
  private readonly _type: string;
  private readonly _labels: string[];
  private _metadata: Record<string, unknown>;
  private readonly _sources: SourceCitation[];

  constructor(
    entityId: string,
    type: string,
    labels: readonly string[] = [],
    metadata: Record<string, unknown> = {},
    sources: readonly SourceCitation[] = [],
  ) {
    this._entityId = validateIdentifier(
      entityId,
      'Entity ID',
    );

    this._type = validateIdentifier(
      type,
      'Entity type',
    );

    validateRecord(
      metadata,
      'Node metadata',
    );

    this._labels = labels.map((label) =>
      validateIdentifier(label, 'Node label'),
    );

    this._metadata = cloneRecord(metadata);
    this._sources = cloneSources(sources);

    validateSources(this._sources);
  }

  get entityId(): string {
    return this._entityId;
  }

  get type(): string {
    return this._type;
  }

  get labels(): string[] {
    return [...this._labels];
  }

  get metadata(): Record<string, unknown> {
    return cloneRecord(this._metadata);
  }

  get sources(): SourceCitation[] {
    return cloneSources(this._sources);
  }

  public updateMetadata(
    newMetadata: Record<string, unknown>,
  ): void {
    validateRecord(
      newMetadata,
      'Node metadata',
    );

    this._metadata = {
      ...this._metadata,
      ...newMetadata,
    };
  }

  public addSource(
    source: SourceCitation,
  ): void {
    validateSources([source]);
    this._sources.push({
      sourceId: source.sourceId,
      confidence: source.confidence,
      provenance: source.provenance,
    });
  }
}

export class GraphEdge {
  private readonly _sourceEntityId: string;
  private readonly _targetEntityId: string;
  private readonly _relationshipType: string;
  private _properties: Record<string, unknown>;
  private readonly _sources: SourceCitation[];

  constructor(
    sourceEntityId: string,
    targetEntityId: string,
    relationshipType: string,
    properties: Record<string, unknown> = {},
    sources: readonly SourceCitation[] = [],
  ) {
    this._sourceEntityId =
      validateIdentifier(
        sourceEntityId,
        'Source entity ID',
      );

    this._targetEntityId =
      validateIdentifier(
        targetEntityId,
        'Target entity ID',
      );

    this._relationshipType =
      validateIdentifier(
        relationshipType,
        'Relationship type',
      );

    validateRecord(
      properties,
      'Edge properties',
    );

    if (
      this._sourceEntityId ===
      this._targetEntityId
    ) {
      throw new GraphValidationError(
        'A graph edge cannot connect an entity to itself.',
      );
    }

    this._properties =
      cloneRecord(properties);

    this._sources =
      cloneSources(sources);

    validateSources(this._sources);
  }

  get sourceEntityId(): string {
    return this._sourceEntityId;
  }

  get targetEntityId(): string {
    return this._targetEntityId;
  }

  get relationshipType(): string {
    return this._relationshipType;
  }

  get properties(): Record<string, unknown> {
    return cloneRecord(this._properties);
  }

  get sources(): SourceCitation[] {
    return cloneSources(this._sources);
  }

  public updateProperties(
    properties: Record<string, unknown>,
  ): void {
    validateRecord(
      properties,
      'Edge properties',
    );

    this._properties = {
      ...this._properties,
      ...properties,
    };
  }

  public addSource(
    source: SourceCitation,
  ): void {
    validateSources([source]);

    this._sources.push({
      sourceId: source.sourceId,
      confidence: source.confidence,
      provenance: source.provenance,
    });
  }
}