
const redis = require("redis");

let redisClientConnect;

const initializeRedisClient = async () => {
  if (!redisClientConnect) {
    redisClientConnect = redis.createClient({
      socket: {
        host: '127.0.0.1',
        port: 6379,
      },
    });

    redisClientConnect.on('error', (error) => {
      console.error(`Redis connection error: ${error}`);
    });

    await redisClientConnect.connect();
    console.log('Redis connected successfully');
  }
  return redisClientConnect;
};

// Export a function to get the Redis client
const redisClient = () => {
  if (!redisClientConnect) {
    throw new Error('Redis client is not initialized');
  }
  return redisClientConnect;
};


module.exports = { redisClient, initializeRedisClient };
