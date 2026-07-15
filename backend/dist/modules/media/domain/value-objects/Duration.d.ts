import { ValueObject } from '../../../../shared/domain/ValueObject';
interface DurationProps {
    seconds: number;
}
export declare class Duration extends ValueObject<DurationProps> {
    private constructor();
    static create(seconds: number): Duration;
    get seconds(): number;
}
export {};
