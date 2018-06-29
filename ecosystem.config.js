module.exports = {
  apps: [{
    name: 'takecare-api',
    script: 'app.js',
    node_args: '--harmony',
    watch: false,
    ignore_watch: [
      'public',
      'views',
    ],
    exec_mode: 'fork',
    combine_logs: true,
    env: {
      PORT: 3001,
      NODE_ENV: 'dev',
    },
  }],

};
