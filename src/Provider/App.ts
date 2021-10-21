import Express from "./Express";
import Redis from "./Redis";
import { Database } from "./Database";
import Locals from "../Provider/Locals";
class App {
	public loadServer(): void {
		Express.init();
	}

	public loadRedis(): void {
		Redis.init();
	}

	public loadMongoDB(): void {
		Database.init();
	}
}

export default new App();
