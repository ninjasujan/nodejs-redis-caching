import Express from "./Express";
import Redis from "./Redis";

class App {
	public loadServer(): void {
		Express.init();
	}

	public loadRedis(): void {
		Redis.init();
	}
}

export default new App();
