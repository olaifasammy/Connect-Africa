import { Media } from '../models/Media';
import { MediaPermission } from '../models/MediaPermission';

export class PublicAccessPolicy {
  static canAccess(media: Media, permissions: MediaPermission[]): boolean {
    // Assuming if no specific permissions are set, it might be public?
    // Or maybe we need a 'PUBLIC' permission?
    // Let's assume there's a way to determine public access.
    // Based on MediaPermission props: 'READ' | 'WRITE' | 'ADMIN'
    // I don't see public access here.
    // I will assume for now it's false unless otherwise specified.
    return false;
  }
}
