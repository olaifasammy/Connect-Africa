import { Pool } from 'pg';
import { DatabaseProvider } from './DatabaseProvider';
export declare class PostgresProvider extends DatabaseProvider {
    private _pool;
    constructor();
    get pool(): Pool;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    healthCheck(): Promise<boolean>;
    query(text: string, params?: any[]): Promise<any>;
}
