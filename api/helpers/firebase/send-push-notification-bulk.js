const firebasePushNotifications = require('../../lib/PushNotifications/firebasePushNotifications');
const moment = require('moment');
// const uuidv1 = require('uuid/v1');
const { v1: uuidv1 } = require('uuid');


module.exports = {
  friendlyName: 'Send push notification',

  description: '',

  inputs: {
    user: {
      type: 'json',
      required: true,
      description: 'Array of user device ids',
    },
    title: {
      type: 'string',
    },

    body: {
      type: 'string',
    },

    silent: {
      type: 'boolean',
      required: true,
    },
    extra_data: {
      type: 'ref',
      required: true,
    },
    notification_type: {
      type: 'string',
      required: true,
    },
  },

  exits: {},

  fn: async (inputs, exits) => {

    sails.log.debug('sending bulk push notification: ', { inputs });

    let tokens = inputs.user;// user.map(o => o['device_token']);

    if (!inputs.silent) {
      if (!inputs.title) {
        sails.log.error(
          "helpers/send-push-notification - when notifications are noisy 'title' must be provided"
        );
      }
      if (!inputs.body) {
        sails.log.error(
          "helpers/send-push-notification - when notifications are noisy 'body' must be provided"
        );
      }


    }
    let notify = [];
    const uuid = uuidv1();
    try {
      // await NotificationError.create({
      //   user: user.id,
      //   deviceid: user.device_token || 'no_device_token',
      //   errormessage: JSON.stringify({
      //     title: inputs.title,
      //     body: inputs.body,
      //     silent: inputs.silent,
      //     type: inputs.notification_type,
      //     extra_data: inputs.extra_data,
      //     uuid,
      //   }),
      // });
    } catch (e) {
      sails.log.error('Error ', e);
    }



    notify = await firebasePushNotifications.sendBulk(
      tokens,
      inputs.title,
      inputs.body,
      inputs.silent,
      {
        notification_type: inputs.notification_type,
        extra_data: inputs.extra_data,
        notification_time: moment().toISOString(),
        id: uuid,
      },
      inputs.role
    );
    sails.log({ notify });
    if (_.isArray(notify) && !_.isEmpty(notify)) {
      sails.log({ notify: JSON.stringify(notify) });

    }
    // All done.
    return exits.success();
  },
};
