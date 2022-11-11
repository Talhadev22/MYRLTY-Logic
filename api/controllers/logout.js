module.exports = {


  friendlyName: 'Logout',


  description: 'Logout something.',


  inputs: {
    user: {
      type: 'ref',
      required: true
    },
    device_token: {
      type: 'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    try {
      sails.log.debug('calling logout', inputs.device_token);
      await DeviceToken.destroy({ user: inputs.user.user_id, device_token: inputs.device_token });
    } catch (e) {
      sails.log.error('error calling logout', e);
      return exits.invalid({ data: [], status: false, message: 'Invalid device token' })
    }

  }


};
