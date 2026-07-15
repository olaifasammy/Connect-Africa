import { AttachMediaDto } from '../dtos/AttachMediaDto';

export class AttachMediaCommand {
  constructor(public readonly data: AttachMediaDto) {}
}
