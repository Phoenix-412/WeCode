const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12686.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12686
    }
});
console.log(`\nREDIS connected !!`)

module.exports= redisClient;