import { CreateEntityRequest } from '@modules/entity/application/dto/CreateEntityRequest';

export class CreateEntityCommand {
  constructor(
    public readonly dto: CreateEntityRequest,
    public readonly userId: string
  ) {}
}