import { ValueObject } from '@shared/domain/ValueObject';

interface ImageDimensionsProps {
  width: number;
  height: number;
}

export class ImageDimensions extends ValueObject<ImageDimensionsProps> {
  private constructor(props: ImageDimensionsProps) {
    super(props);
  }

  static create(width: number, height: number): ImageDimensions {
    if (width <= 0 || height <= 0) {
      throw new Error('Image dimensions must be positive');
    }
    return new ImageDimensions({ width, height });
  }

  get width(): number {
    return this.props.width;
  }

  get height(): number {
    return this.props.height;
  }
}
