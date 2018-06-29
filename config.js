module.exports = {
  id: 'takecare',
  host: '127.0.0.1',
  port: 3001,
  session_secret: '535801d2xxxxxxx',
  saltRounds: 10,
  tmpdir: '/tmp',

  title: '介護',
  desc: '',
  url: 'http://localhost:3001',
  pageSize: 20,


  mongoose: {
    connect: 'mongodb://localhost/takecare',
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: 'huarui1111',
    redis_retry_strategy: (options) => {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error('Retry time exhausted');
      }
      if (options.times_connected > 10) {
        return undefined;
      }
      // reconnect after
      return Math.max(options.attempt * 100, 3000);
    },
  },
  smtp: {
    host: 'smtp.qiye.163.com',
    user: 'no-reply@accounts.tt.org',
    pass: 'xxx',
  },
};
