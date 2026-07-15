import { FileHash } from '../value-objects/FileHash';
export declare class DuplicateMediaPolicy {
    static isDuplicate(newHash: FileHash, existingHashes: FileHash[]): boolean;
}
