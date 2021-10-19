import { createClient } from "redis";
import Locals from "./Locals";

class Redis {
	private redisClient: any;
	private redisPort: string;
	private redisServer: string;

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
	}

	public init = async () => {
		try {
			/**
			 * Connect redis client
			 */
			await this.redisClient.connect();
			console.log(
				"\x1b[33m%s\x1b[0m",
				`[Redis db running on port ${this.redisPort}]`
			);
		} catch (error) {
			console.log("[Redis connection error]", error);
		}
	};

	public getredisClient = async () => {
		return this.redisClient;
	};
}

export default new Redis();
