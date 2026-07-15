import { Media } from '../models/Media';
import { MediaPermission } from '../models/MediaPermission';
export declare class PublicAccessPolicy {
    static canAccess(media: Media, permissions: MediaPermission[]): boolean;
}
