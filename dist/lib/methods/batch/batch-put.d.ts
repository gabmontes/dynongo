import { BatchItem } from './batch-item';
import { BatchPutItem } from '../../types/interfaces';
export declare class PutRequest extends BatchItem {
    private body;
    constructor(props: any, key: any, body: any);
    buildRawQuery(): BatchPutItem;
}
