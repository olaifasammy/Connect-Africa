import { CreateEntityDto } from '../../../entity/application/dto/CreateEntityDto';
export declare class CreateEntityCommand {
    readonly dto: CreateEntityDto;
    readonly userId: string;
    constructor(dto: CreateEntityDto, userId: string);
}
