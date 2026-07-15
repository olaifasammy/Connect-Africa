import { ValueObject } from '../../../../shared/domain/ValueObject';
interface ImageDimensionsProps {
    width: number;
    height: number;
}
export declare class ImageDimensions extends ValueObject<ImageDimensionsProps> {
    private constructor();
    static create(width: number, height: number): ImageDimensions;
    get width(): number;
    get height(): number;
}
export {};
