import { BatchItem } from './batch-item';
import { BatchDeleteItem } from '../../types/interfaces';
export declare class DeleteRequest extends BatchItem {
    constructor(props: any, key: any);
    buildRawQuery(): BatchDeleteItem;
}
