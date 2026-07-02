export abstract class DatabaseProvider {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
}
