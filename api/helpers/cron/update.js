const moment = require('moment');

// function roundToNearest15(date = moment().utc()) {
//   const minutes = 15;
//   const ms = 1000 * 60 * minutes;

//   return new Date(Math.ceil(date.getTime() / ms) * ms);
// }
function roundToNearest15(date = moment().utc()) {

  const remainder = 15 - (date.minute() % 15);

  return moment(date).add(remainder, 'minutes').utc();
}

module.exports = {


  friendlyName: 'Showings',


  description: 'Showings cron.',


  inputs: {

    price:{
      type:'string'
    },
    type:{
      type:'string'
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log.debug('calling helper/cron/update');
    const users = await sails.models.user.find({
      deleted_at: null,
      isNotificationAllowed: true
    
    }).populate('device_tokens');
    // { where: { date, start_time } }
    // }).populate('showings', { where: { date, start_time: { '>': start_time, '<': end_time }, deleted_at: null } }).populate('device_tokens');
    //const users = await User.find({ isNotificationAllowed: true }).populate('showings', { where: { date, deleted_at: null } }).populate('device_tokens');
    
    // console.log({ end_time });
    const filteredUsers = users;
    const promiseNotifications = [];
    const notificationSave = [];
    // const title = "Number of Showings today ";
    // const body = "Kindly visit your showings calender";
    const PRICE_NOTIFICATION = 'price_update_notification';

    for (let i = 0; i < filteredUsers.length; i++) {
      const _user = filteredUsers[i];
      const device_tokens = _user.device_tokens.map(e => e.device_token);
      // const numberOfShowings = _user.showings.length;
   //   let ids = []   
      if (device_tokens.length) {
          const _showing = 'eqwqqeqeq';
          const body = `New price for ${inputs.type}ly subscription is USD ${inputs.price}`;//`${title} ${numberOfShowings}`;
          const _title = 'Price update';//`${title} ${numberOfShowings}`;
          const _user_id = _user.id;
          promiseNotifications.push(sails.helpers.firebase.sendPushNotificationBulk(
            device_tokens,
            _title,
            body,
            false,
            JSON.stringify(_showing),
            PRICE_NOTIFICATION
          ));  
        //  ids.push(_user_id)
          notificationSave.push(Notifications.create({
            notification_type: PRICE_NOTIFICATION,
            title: _title,
            message: body,
            //showing_id:_showing_id,
            user: _user.id,
            unique_ids: JSON.stringify(device_tokens),
          }));    
      }
      
     // await sails.models.user.update({id: {in :ids }}).set({is_notify:1})
      
    }

    const resolveNotificationTable = await Promise.all(notificationSave);
    const resolvedNotifications = await Promise.all(promiseNotifications);

    sails.log.debug({ showings: resolvedNotifications, db: resolveNotificationTable });
  }


};

