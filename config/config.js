var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'sodab-server'
    },
    port: process.env.PORT || 8080,
    db: 'postgres://localhost/sodab-server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'sodab-server'
    },
    port: process.env.PORT || 8080,
    db: 'postgres://localhost/sodab-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'sodab-server'
    },
    port: process.env.PORT || 8080,
    db: 'postgres://localhost/sodab-server-production'
  }
};

module.exports = config[env];
