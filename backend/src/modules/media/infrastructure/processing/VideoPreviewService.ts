import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

export class VideoPreviewService {
  async generatePreview(buffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const stream = Readable.from(buffer);
      const chunks: Buffer[] = [];
      
      ffmpeg(stream)
        .screenshots({
          timestamps: ['10%'],
          filename: 'thumbnail.png',
        })
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', reject);
    });
  }
}
