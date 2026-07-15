import { UploadMediaDto } from '../dtos/UploadMediaDto';

export class UploadMediaCommand {
  constructor(public readonly data: UploadMediaDto) {}
}
