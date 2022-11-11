module.exports = {
  friendlyName: 'Notification',

  description: 'Notification Open',

  inputs: {
    user: {
      type: 'ref'
    },
    showing_id: {
      type: "number"
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
    sails.log.debug('calling get-notification/toggle');
    try {
      const check = await sails.models.user.findOne({ user_id: inputs.user.id })
      if (!check) {
        return exits.success({ status: false, message: 'user not found', data: [] });
      }
      let obj = {
        is_open: 1
      }
      const notification = await sails.models.notifications.updateOne({
        showing_id: inputs.showing_id,
        deleted_at: null
      }).set(obj)
      return exits.success({ status: true, message: 'Notification Opened', data: [] });
    } catch (e) {
      sails.log.error('error device-token/save', e);
      return exits.invalid(
        e.message || 'Server error: can not save device token'
      );
    }
  },
};
