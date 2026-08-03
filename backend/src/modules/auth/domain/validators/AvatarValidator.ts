export class AvatarValidator {
  static validate(url: string): void {
    const avatarRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!avatarRegex.test(url)) {
      throw new Error('Invalid avatar URL format');
    }
  }
}
