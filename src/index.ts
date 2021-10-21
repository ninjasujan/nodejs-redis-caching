import App from "./Provider/App";

/**
 * Redis connection
 */

App.loadRedis();

/**
 * Mongoose connection
 */

App.loadMongoDB();

/**
 * Connecting server
 */
App.loadServer();
