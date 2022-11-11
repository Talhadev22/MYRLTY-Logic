
module.exports = {
  datastores: {

    /***************************************************************************
        *                                                                          *
        * Configure your default production database.                              *
        *                                                                          *
        * 1. Choose an adapter:                                                    *
        *    https://sailsjs.com/plugins/databases                                 *
        *                                                                          *
        * 2. Install it as a dependency of your Sails app.                         *
        *    (For example:  npm install sails-mysql --save)                        *
        *                                                                          *
        * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
        *    and any other, adapter-specific customizations.                       *
        *    (See https://sailsjs.com/config/datastores for help.)                 *
        *                                                                          *
        ***************************************************************************/
    default: {
      adapter: 'sails-mysql',
      url: 'mysql://admin:5jaxUxZkRYXRwFn6@myrlty.cjmv31rxbe5p.us-east-1.rds.amazonaws.com:3306/myrlty',
      //  url:'mysql://root:AbcXyz123@localhost:3306/myrlty_latest',
      //   url:'mysql://ba87c5e71d4469:01621b57@us-cdbr-east-05.cleardb.net/heroku_588aa5f654c9d66',
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
    },
    mongo: {
      adapter: 'sails-mongo',
      url: 'mongodb://muzammil:muzammil123@cluster0-shard-00-00.7ug5i.mongodb.net:27017,cluster0-shard-00-01.7ug5i.mongodb.net:27017,cluster0-shard-00-02.7ug5i.mongodb.net:27017/auth?ssl=true&replicaSet=atlas-u4dsa8-shard-0&authSource=admin&retryWrites=true&w=majority',
      ssl: true,
      replicaSet: process.env.REPLICASET,
      authSource: 'admin',
    }
  },
  JWT: {
    ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  },
  AWS: {
    BUCKET: process.env.AWS_BUCKET
  },
  STRIPE: {
    PUBLISHABLE_KEY: process.env.STRIPE_PULISHABLE_KEY,
    SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  PAYPAL: {
    MODE: process.env.PAYPAL_MODE,
    CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET
  },
  GATEWAY_SERVER: process.env.GATEWAY_SERVER,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  keepResponseErrors: true,
  fcm: {
    user: {
      type: 'service_account',
      project_id: 'realtor-12',
      private_key_id: 'f5bff6ae0133dfc533f814ee1a0a994a65b5c5ba',
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDQPGXe0QPH/hRy\nU+OTremq5Wq63bSY/HkfYvy+6/JItF6Xp+TvdG/D+0FNpjwm81i04yVmAkYPVtv0\n+RFJwCczvtcnTCDlEhx610Nu9p+kAslu/S+tuJT2IixLjas3JgVQe+l0oWc1fLPh\n2YP4YIeiLUW5DloXJfDS2B+N9RkQByfNDgsYiNdHtp6Dba21TlOOw7vgEIqD8UNe\nO+bU5c/D5brnu4T3JCZ+RPp53fJmLHexYmxpBowoW5QmblmsEtSwBU3WWBJb+hJn\nqRhyrEWS9YjdaRTUAgvNnEOfW/gm2th2+x3FXK+yi2/XOEjUTRCHpCAH+zWf28up\n4dw10oKtAgMBAAECggEAC4H2+D4RSS1ZqGrJ5hijk+nrQMntR9IWCH3CLXPhFxL+\nsj9ZR8Flxs0dEgM4ikeC9LYj1DQWdpUMgUh9Y9e+Yt3uSnHq1HXwhHpec+SltFzi\nEGPmDWHou4RucbtxxZGwk/7RCzy7NSm/0CCi6ig9fqElXAF2yZYzbZd7gO8VVD0T\ncU403am784AAZ2K8w6o8M+pSogAS/ET5slkAn91bT4AQttOFCOYEDW1rYpxhGI7z\nVtpqYBNbm9eeaf1B7HXDz/JBF8sd4BxMqz6vSn8lB5XSRB+M4933qIXaylxCxyf5\nQXg2MVgjPH4oJD3fO5J7pC9vSgfEmu5ZW3loeRIteQKBgQDyokNML/0aK5zb3rd2\ns4ljveD8yHodCpHbNwH4tbQSuryYd0m3DR0R9nKNUEGSTYDz9pKTl3MVaMnsSn49\nExmMSDrdnf2agguVGTlm0xKhiOWtH6UlDw6YSkBSYxicIGUEyaF669Gj5Iqz0CIP\n5yoP+0TCFZUoiRHrN2SlB4ZJyQKBgQDbtQoaFRZgnuwogdG30V5QGD1Ol+HZObBp\nxheh+Bt6bRlbWPqEZA9jmD2GqOBgYi2ZICMdQlYCOqq2dyXkCPEQca6M/DRAYjK3\nFmTpd/x9lq5FmDWzn3+drUYdOJV8DQ0q7Edn5TNJQVlhZnTRLwjMcTl25punyOFb\n2z3nbttjxQKBgQCDBMXsVRmKUTShsdFF4sr0tirQtXzjQ7rhMgH5iDzVxEpk1j1T\nAFzLP1Y6IrVVyE4y7tnVovl8/RnUY6FpX2/zRWmsFE1GaqTQfU92y9GKsr67TpRB\nv7C04Zt8IZC/deq2vB5bnw2UP6v6TxCln8Eh4iAN4dOqkOHBLydEyhxkqQKBgQDB\n++6XaNcBKFBK05RfQDSNc1lt8xwtt4nTWluzXmSki38/8CgAjHgp71kjdCfn8cdg\n08ctJkzaWwIvaLPDy0FMy5LaWDOqRQmSLeubV51PJaNpPyLrHYCHr12gnz0c8kkW\nBNhnGy9VFqXcIaIyr9yM5cte9+2nDu4rNEBL/s0mIQKBgQDW8prMRTTvcP58Lgax\nFDhM0lu5MXWBP3A1EKp2irSsVM1hjs1Ex0RACJMOLrgrV2zcp679GWiTPCLjEIWa\n80ycdMRYYqOrLAAjD3cmL4ve9PmJt0kSVJeQexVeKcq8TgXFLw7ke2XJY/p3dd9G\nLvTbMN9FezQ6ESHp5i18WlSOpw==\n-----END PRIVATE KEY-----\n",
      client_email: "firebase-adminsdk-4brhf@realtor-12.iam.gserviceaccount.com",
      client_id: "117432161833765550474",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url:
        "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4brhf%40realtor-12.iam.gserviceaccount.com",

    }
  },
  MLS: {
    ACCESS_KEY: '56bk7DNIJb@3cixkeIczbF',
    ANCILLARY_KEY: '56bk7DNIJb@3cixkeIczbF',
    OUTPUT_TYPE: 'json',
    API_VERSION: '1.4.0'
  },

  LINKEDIN_URI: 'https://myrlty123.herokuapp.com/linkedin',

  port: process.env.PORT,
  // redis_url: 'redis://127.0.0.1:6379'
};
