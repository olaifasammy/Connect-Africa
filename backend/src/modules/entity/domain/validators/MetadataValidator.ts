export class MetadataValidator {
  static validate(description?: string, source?: string): boolean {
    return (description ? description.length <= 2000 : true) && 
           (source ? source.length <= 255 : true);
  }
}
