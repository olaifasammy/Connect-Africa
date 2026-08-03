import { FileHash } from '../value-objects/FileHash';

export class DuplicateMediaPolicy {
  static isDuplicate(newHash: FileHash, existingHashes: FileHash[]): boolean {
    return existingHashes.some(hash => hash.value === newHash.value);
  }
}
