import { UploadMediaDto } from '../dtos/UploadMediaDto';

export class UploadMediaCommand {
  constructor(
    public readonly userId: string,
    public readonly data: UploadMediaDto
  ) {}
}
