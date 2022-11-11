module.exports = {


  friendlyName: 'Sign',


  description: 'Sign upload.',


  inputs: {
    folder: {
      type: 'string',
      defaultsTo: ''
    },
    ext: {
      type: 'string',
      required: true
    },
    contentType: {
      type: 'string'
    },
    objectName: {
      type: 'string'
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
    unauthorized: {
      responseType: 'unauthorized'
    },
    forbidden: {
      responseType: 'forbidden',
    },
    serverError: {
      responseType: 'serverError',
    },
    notFound: {
      responseType: 'notFound',
    }
  },


  fn: async function ({ folder, ext }, exits) {
    sails.log.debug('calling upload/sign', folder);
    try {
      const returnData = await sails.helpers.aws.sign.with({
        folder,
        ext
      });
      sails.log.debug('sending response', returnData);
      return exits.success({ signedUrl: returnData, status: true, data: returnData, message: 'Signed Url generated successfully' });
    } catch (e) {
      sails.log.debug('e', e);
      return exits.invalid({ status: false, data: [], message: 'Error fetching pages' });
    }
  }


};