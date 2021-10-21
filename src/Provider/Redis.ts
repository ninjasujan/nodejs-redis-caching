import { createClient, RedisClient, RedisError } from "redis";
import { promisify } from "util";
import Locals from "./Locals";

class Redis {
	/**
	 * Redis client
	 */
	private redisClient: RedisClient;
	private redisPort: string;
	private redisServer: string;

	/**
	 * Redis method - promsisify
	 */

	private redisClientGet;
	private redisClientSet;

	constructor() {
		const { redisServer, redisPort } = Locals.config();
		this.redisPort = redisPort;
		this.redisServer = redisServer;
		/**
		 * Creating redis client
		 */
		this.redisClient = createClient({
			url: `${this.redisServer}:${this.redisPort}`,
		});

		/**
		 * Instantiate redis methods to promise
		 */

		this.redisClientGet = promisify(this.redisClient.get).bind(
			this.redisClient
		);
		this.redisClientSet = promisify(this.redisClient.set).bind(
			this.redisClient
		);
	}

	public init = async () => {
		/**
		 * Connect redis client
		 */

		this.redisClient.on("connect", () => {
			console.log(
				"\x1b[33m%s\x1b[0m",
				`[Redis db running on port ${this.redisPort}]`
			);
		});

		this.redisClient.on("error", (error: RedisError) => {
			console.log("[Redis error]", error);
		});
	};

	public getRedisMethods = async () => {
		try {
			return {
				redisClinetGet: this.redisClientGet,
				redisClientSet: this.redisClientSet,
			};
		} catch (error) {
			throw error;
		}
	};

	public getredisClient = async () => {
		return this.redisClient;
	};
}

export default new Redis();
