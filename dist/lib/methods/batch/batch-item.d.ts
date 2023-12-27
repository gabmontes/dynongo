import { BatchDeleteItem, BatchPutItem } from '../../types/interfaces';
export declare abstract class BatchItem {
    table: string;
    key: any;
    protected constructor(table: string, key: any);
    abstract buildRawQuery(): BatchPutItem | BatchDeleteItem;
}
