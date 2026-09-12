export interface UpdateMediaDto {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly metadata?: Record<string, any>;
}
