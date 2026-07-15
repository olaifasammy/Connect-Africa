import * as mm from 'music-metadata';

export class AudioMetadataService {
  async extract(buffer: Buffer): Promise<Record<string, any>> {
    const metadata = await mm.parseBuffer(buffer);
    return {
      format: metadata.format.container,
      duration: metadata.format.duration,
      artist: metadata.common.artist,
      title: metadata.common.title
    };
  }
}
