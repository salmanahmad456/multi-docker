const keys = require('./keys.js');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

console.log(keys.redisHost);

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}


console.log('[[[[[[[[[[[[[[[[[[ worker => index.js ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
sub.on('message', (channel, message) => {
  console.log('[[[[[[[[[[[[[[[[[[ worker => message ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]', message);
  redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');