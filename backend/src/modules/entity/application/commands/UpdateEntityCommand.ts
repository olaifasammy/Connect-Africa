import { UpdateEntityRequest } from '@modules/entity/application/dto/UpdateEntityRequest';

export class UpdateEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly dto: UpdateEntityRequest,
    public readonly userId: string
  ) {}
}