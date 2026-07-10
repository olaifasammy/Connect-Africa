import { CreateEntityDto } from '@modules/entity/application/dto/CreateEntityDto';

export class CreateEntityCommand {
  constructor(
    public readonly dto: CreateEntityDto,
    public readonly userId: string
  ) {}
}
