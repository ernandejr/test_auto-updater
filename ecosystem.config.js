module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'Auto-updater',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
    {
      "watch": ["server", "client"],
      "ignore_watch" : ["*.zip"],
      "watch_options": {
        "followSymlinks": false
      }
    }
  ],
};
