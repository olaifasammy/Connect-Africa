export interface MediaSearchDto {
    readonly query?: string;
    readonly type?: string;
    readonly tags?: string[];
    readonly page?: number;
    readonly limit?: number;
}
