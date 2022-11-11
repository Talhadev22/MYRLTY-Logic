module.exports = {
  friendlyName: 'Save',

  description: 'Save device token.',

  inputs: {
    device_token: {
      type: 'string',
      required: true,
    },
    device_platform: {
      type: 'string',
      // required: true,
    },
    unique_id: {
      type: 'string',
      // required: true,
    },
    user: {
      type: 'ref'
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

  fn: async function (inputs, exits) {
    // interest_ids = JSON.parse(interest_ids);
    sails.log.debug('calling device-token/save');
    // this.res.setHeader("Access-Control-Allow-Origin", "*");
    let returnObj = {};
    try {
      let _user = await User.findOne({ user_id: inputs.user.id });
      if (!_user) {
        throw new Error('User not found.');
      }
      const user = { ...inputs.user, ..._user };
      let duplicateToken = await DeviceToken.findOne({
        device_token: inputs.device_token,
        user: user.id
      });
      if (!duplicateToken) {
        let _obj = {
          device_token: inputs.device_token,
          unique_id: user.id + Date.now(),
          user: user.id,
        };

        device_tokens = await DeviceToken.create(_obj).fetch();
        sails.log.debug('saved device token');
        returnObj = {
          status: true,
          message: 'Device Token Updated Successfully',
        };
      } else {
        returnObj = {
          data: duplicateToken,
          status: true,
          message: 'Duplicate Device Token found',
        };
      }
      return exits.success(returnObj);
    } catch (e) {
      sails.log.error('error device-token/save', e);
      return exits.invalid(
        e.message || 'Server error: can not save device token'
      );
    }
  },
};
