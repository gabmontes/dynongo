import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import {
	NodeHttpHandler,
	NodeHttpHandlerOptions,
} from "@aws-sdk/node-http-handler";
import { Credentials } from "@aws-sdk/types";
import { Agent as HttpAgent, AgentOptions } from "http";
import { Options as RetryOptions } from "p-retry";

import { Table, TableOptions } from "./table";
import {
	ListTables,
	DeleteTable,
	CreateTable,
	TransactWrite,
	WriteItem,
	TransactRead,
	ReadItem,
	BatchWrite,
} from "./methods";
import { Schema } from "./types";
import { configureRetryOptions } from "./utils";
import { BatchItem } from "./methods/batch";

export type DynamoDBOptions = Pick<
	DynamoDBClientConfig,
	"endpoint" | "region"
> &
	Partial<
		Pick<Credentials, "accessKeyId" | "secretAccessKey" | "sessionToken">
	> &
	Pick<AgentOptions, "keepAlive"> & {
		httpOptions?: Omit<NodeHttpHandlerOptions, "httpAgent" | "httpsAgent">;
	} & {
		local?: boolean;
		host?: string;
		localPort?: number;
		prefix?: string;
		prefixDelimiter?: string;
		retries?: number | RetryOptions;
	};

export class DynamoDB {
	public raw?: DynamoDBDocument;
	private options: Pick<DynamoDBOptions, "prefix" | "prefixDelimiter"> = {};
	private _retries?: DynamoDBOptions["retries"];

	connect(_options?: DynamoDBOptions) {
		const mergedOptions = Object.assign(
			{
				// //docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-reusing-connections.html
				keepAlive: true,
				local: false,
				prefix: "",
				prefixDelimiter: ".",
				host: "localhost",
				localPort: 8000,
			},
			_options ?? {}
		);

		const {
			accessKeyId,
			endpoint = mergedOptions.local
				? `http://${mergedOptions.host}:${mergedOptions.localPort}`
				: undefined,
			httpOptions,
			keepAlive,
			local,
			prefix,
			prefixDelimiter,
			retries,
			region,
			secretAccessKey,
			sessionToken,
		} = mergedOptions;

		this.options = {
			prefix,
			prefixDelimiter,
		};

		this._retries = configureRetryOptions(retries);

		const requestHandler = new NodeHttpHandler({
			...httpOptions,
			[local ? "httpAgent" : "httpsAgent"]: new HttpAgent({
				keepAlive,
			}),
		});

		const client = new DynamoDBClient({
			...(accessKeyId && secretAccessKey
				? {
						credentials: {
							accessKeyId,
							secretAccessKey,
							sessionToken,
						},
				  }
				: {}),
			endpoint,
			region,
			requestHandler,
		});

		this.raw = DynamoDBDocument.from(client);
	}

	get delimiter() {
		return this.options.prefixDelimiter;
	}

	get prefix() {
		return this.options.prefix;
	}

	get retries() {
		return this._retries;
	}

	/**
	 * Returns the table that can be used to interact with it.
	 *
	 * @param  name		The name of the table that is being interacted with.
	 * @param  options	Options object.
	 */
	table(name: string, options?: TableOptions) {
		return new Table(name, this, options);
	}

	/**
	 * Returns the table that can be used to interact with. The table name will not be prefixed automatically.
	 *
	 * @param  name		The name of the table that is being interacted with.
	 */
	rawTable(name: string) {
		return new Table(name, this, { raw: true });
	}

	/**
	 * Instantiate a dropped table object.
	 *
	 * @param	name		The name of the table that should be dropped.
	 * @param	options		Options object.
	 */
	dropTable(name: string, options?: TableOptions): DeleteTable {
		return this.table(name, options).drop();
	}

	/**
	 * Instantiate a raw dropped table object. The table name will not be prefixed automatically.
	 *
	 * @param	name		The name of the table that should be dropped.
	 */
	dropRawTable(name: string): DeleteTable {
		return this.dropTable(name, { raw: true });
	}

	/**
	 * Instantiate a create table object.
	 *
	 * @param	schema		The schema of the table that should be created.
	 * @param	options		Options object.
	 */
	createTable(schema: Schema, options?: TableOptions): CreateTable {
		if (typeof schema !== "object") {
			throw new TypeError(
				`Expected \`schema\` to be of type \`object\`, got \`${typeof schema}\``
			);
		}

		if (!schema.TableName) {
			throw new Error("Schema is missing a `TableName`");
		}

		return this.table(schema.TableName, options).create(schema);
	}

	/**
	 * Instantiate a create table object.
	 *
	 * @param	schema		The schema of the table that should be created.
	 */
	createRawTable(schema: Schema): CreateTable {
		return this.createTable(schema, { raw: true });
	}

	/**
	 * Instantiate a list tables object.
	 */
	listTables() {
		return new ListTables(this);
	}

	/**
	 * Start a write transaction with the provided actions.
	 *
	 * @param	actions		List of transaction actions.
	 */
	transactWrite(...actions: WriteItem[]) {
		return new TransactWrite(this, actions);
	}

	/**
	 * Start a read transaction with the provided actions.
	 *
	 * @param	actions		List of transaction actions.
	 */
	transactRead(...actions: ReadItem[]) {
		return new TransactRead(this, actions);
	}

	batchWrite(...items: BatchItem[]) {
		return new BatchWrite(this, items);
	}
}
