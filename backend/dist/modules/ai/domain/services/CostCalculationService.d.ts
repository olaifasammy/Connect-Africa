export interface ICostCalculationService {
    calculate(tokens: number, model: string): number;
}
