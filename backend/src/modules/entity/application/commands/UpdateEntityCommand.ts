import { UpdateEntityDto } from '@modules/entity/application/dto/UpdateEntityDto';

export class UpdateEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly dto: UpdateEntityDto,
    public readonly userId: string
  ) {}
}
