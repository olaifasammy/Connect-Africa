import { ValueObject } from '@shared/domain/ValueObject';

export enum StorageProviderType {
  LOCAL = 'local',
  S3 = 's3',
  GCS = 'gcs'
}

interface StorageProviderProps {
  type: StorageProviderType;
}

export class StorageProvider extends ValueObject<StorageProviderProps> {
  private constructor(props: StorageProviderProps) {
    super(props);
  }

  static create(type: StorageProviderType): StorageProvider {
    return new StorageProvider({ type });
  }

  get type(): StorageProviderType {
    return this.props.type;
  }
}
