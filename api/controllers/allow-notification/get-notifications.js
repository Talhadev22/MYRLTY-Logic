module.exports = {
  friendlyName: 'Get Notification',

  description: 'Get Notification List',

  inputs: {
    user: {
      type: 'ref'
    },
    limit: {
      type: 'number',
      defaultsTo: 3
    },
  offset: {
      type: 'number',
      defaultsTo: 0
  },
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
    sails.log.debug('calling get-all-notification');
    try {
      const check = await sails.models.user.findOne({ user_id: inputs.user.id })
      if (!check) {
        return exits.success({ status: false, message: 'user not found', data: [] });
      }
      const notification = await sails.models.notifications.find({
        user: check.id,
        deleted_at: null
      }).populate('showing_id').limit(inputs.limit).skip(inputs.offset).sort('created_at DESC');
      if(notification.length < 1){
      return exits.success({ status: true, message: 'Notifications not found', data: notification });
      }
      return exits.success({ status: true, message: 'Notifications list', data: notification });

    } catch (e) {
      sails.log.error('error get-all-notifcations', e);
      return exits.invalid(
        e.message || 'Server error: notifcation can be found'
      );
    }
  },
};
