import { UploadMediaDto } from '../dtos/UploadMediaDto';
export declare class UploadMediaCommand {
    readonly userId: string;
    readonly data: UploadMediaDto;
    constructor(userId: string, data: UploadMediaDto);
}
