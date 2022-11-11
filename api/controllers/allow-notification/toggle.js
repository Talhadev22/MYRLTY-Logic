module.exports = {
  friendlyName: 'Save',

  description: 'Save device token.',

  inputs: {
    toggle: {
      type: 'boolean',
      required: true,
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
    sails.log.debug('calling allow-notification/toggle');
    try {
      let _user = await User.findOne({ user_id: inputs.user.id });
      if (!_user) {
        throw new Error('User not found.');
      }
      await User.update({ user_id: inputs.user.id }).set({ isNotificationAllowed: inputs.toggle });
      return exits.success({ status: true, message: 'Notification updated', data: [] });
    } catch (e) {
      sails.log.error('error device-token/save', e);
      return exits.invalid(
        e.message || 'Server error: can not save device token'
      );
    }
  },
};
