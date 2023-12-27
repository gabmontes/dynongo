import { UpdateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { DynamoDB } from "./dynamodb";
import { Query, Scan, InsertItem, UpdateItem, DeleteItem, DeleteTable, DescribeTimeToLive, CreateTable, UpdateTableConfig, UpdateTimeToLive } from "./methods";
import { Map, Schema } from "./types";
import { PutRequest, DeleteRequest } from "./methods/batch";
export interface TableOptions {
    raw?: boolean;
}
export declare class Table {
    private tableName;
    private dynamodb;
    private options;
    constructor(tableName: string, dynamodb: DynamoDB, options?: TableOptions);
    get name(): string;
    find(): Scan;
    find(query: any, indexName?: string): Query;
    /**
     * Initialize a query builder that is limited to one result.
     *
     * @param  query			The query for the index to filter on.
     * @param  indexName		The name of the global secondary index.
     */
    findOne(query?: any, indexName?: string): Query;
    /**
     * Return and remove a record.
     *
     * @param	query			The query for the index to filter on.
     */
    findOneAndRemove(query: any): DeleteItem;
    /**
     * This method will insert a new item in the table.
     *
     * @param  key				The primary key of the record we want to insert.
     * @param  data				The data associated with the primary key.
     */
    insert(key: Map<string | number>, data?: any): InsertItem;
    /**
     * This method will create a new put request item.
     *
     * @param  key			The primary key of the record we want to insert.
     * @param  data				The data associated with the primary key.
     */
    createBatchPutItem(key: Map<string | number>, data: any): PutRequest;
    /**
     * This method will create a new delete request item.
     *
     * @param  key				The primary key of the record we want to insert.
     */
    createBatchDeleteItem(key: Map<string | number>): DeleteRequest;
    /**
     * Update an already existing item associated with the key provided.
     *
     * @param	key				The key of the item we wish to update.
     * @param	data			The data of the item to update the item with.
     * @param	options			The extra options object.
     */
    update(key: any, data: any, options?: any): UpdateItem;
    /**
     * Update an already existing item or inserts a new item if the item does not yet exist.
     *
     * @param	key				The key of the item we wish to update.
     * @param	data			The data of the item to update the item with.
     */
    upsert(key: any, data: any): UpdateItem;
    /**
     * Remove an object.
     *
     * @param	query			The query for the index to filter on.
     */
    remove(query: any): DeleteItem;
    /**
     * Drop the table.
     */
    drop(): DeleteTable;
    /**
     * This method will create a new table.
     *
     * @param	schema The schema object.
     */
    create(schema: Schema): CreateTable;
    /**
     * This method will return the time to live status of the table.
     */
    describeTimeToLive(): DescribeTimeToLive;
    /**
     * This method updates the table configuration
     */
    updateConfig(params: Omit<UpdateTableCommandInput, "TableName">): UpdateTableConfig;
    /**
     * This method updates the time to live configuration of the table
     */
    updateTimeToLive(params: {
        attribute: string;
        enabled: boolean;
    }): UpdateTimeToLive;
}
