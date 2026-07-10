import { UpdateEntityDto } from '../../../entity/application/dto/UpdateEntityDto';
export declare class UpdateEntityCommand {
    readonly entityId: string;
    readonly dto: UpdateEntityDto;
    readonly userId: string;
    constructor(entityId: string, dto: UpdateEntityDto, userId: string);
}
