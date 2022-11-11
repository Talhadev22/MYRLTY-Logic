module.exports = {
    friendlyName: 'Open Notification Count',
  
    description: 'Open Notification Count',
  
    inputs: {
      user: {
        type: 'ref'
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
      sails.log.debug('calling get-notification-open-count');
      try {
        const check = await sails.models.user.findOne({user_id:inputs.user.id})
        if(!check){
            return exits.success({ status: false, message: 'user not found', data: [] }); 
        }
        const is_open_notification_count = await sails.models.notifications.count({
            user: check.id,
            is_open:0,
            deleted_at:null
        })
        return exits.success({ status: true, message: 'Notification Opened', data: is_open_notification_count });
      } catch (e) {
        sails.log.error('error get-notification-open-count', e);
        return exits.invalid(
          e.message || 'Server error: can not get open notification count'
        );
      }
    },
  };
  