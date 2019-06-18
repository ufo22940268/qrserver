module.exports = {
  apps : [{
    name: 'API',
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '106.12.82.179',
      ref  : 'origin/master',
      repo : 'https://github.com/ufo22940268/qrserver',
      path : '/var/www/production',
      'post-deploy' : 'npm install && npx pm2 reload ecosystem.config.js --env production'
    }
  }
};
