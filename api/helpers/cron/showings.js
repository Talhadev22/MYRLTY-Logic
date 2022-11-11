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

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log.debug('calling helper/cron/showings');
    const next15 = roundToNearest15();
    const min = next15.minutes();
    const hour = next15.hours();
    // const currentDay = moment();
    const date = next15.format('YYYY-MM-DD');
    const start_time = `${hour}:${min}:00`;
    sails.log.debug(`time after add 15mins ${start_time}`)
    sails.log.debug(`time ${moment().utc()}`)
    // const end_time = moment().add(16, 'minutes').format('HH:mm:ss');
    const users = await sails.models.user.find({
      deleted_at: null,
      isNotificationAllowed: true
    
    }).populate('showings',{ where: { date, start_time,is_notify:0 } }).populate('device_tokens');
    // { where: { date, start_time } }
    // }).populate('showings', { where: { date, start_time: { '>': start_time, '<': end_time }, deleted_at: null } }).populate('device_tokens');
    //const users = await User.find({ isNotificationAllowed: true }).populate('showings', { where: { date, deleted_at: null } }).populate('device_tokens');
    
    // console.log({ end_time });
    const filteredUsers = users.filter(e => e.showings.length > 0);
    const promiseNotifications = [];
    const notificationSave = [];
    // const title = "Number of Showings today ";
    // const body = "Kindly visit your showings calender";
    const SHOWINGS_NOTIFICATION = 'showings_notification';

    for (let i = 0; i < filteredUsers.length; i++) {
      const _user = filteredUsers[i];
      const device_tokens = _user.device_tokens.map(e => e.device_token);
      // const numberOfShowings = _user.showings.length;
      let ids = []    
      if (device_tokens.length) {
        for (let j = 0; j < _user.showings.length; j++) {
          const _showing = _user.showings[j];
          _showing.date = moment(_showing.date).format('YYYY-MM-DD');
          const body = _showing.description;//`${title} ${numberOfShowings}`;
          const _title = _showing.name;//`${title} ${numberOfShowings}`;
          const _showing_id = _showing.id;
          sails.log.debug(_showing_id)
          promiseNotifications.push(sails.helpers.firebase.sendPushNotificationBulk(
            device_tokens,
            _title,
            body,
            false,
            JSON.stringify(_showing),
            SHOWINGS_NOTIFICATION
          ));
          ids.push(_showing_id)
          notificationSave.push(Notifications.create({
            notification_type: SHOWINGS_NOTIFICATION,
            title: _title,
            message: body,
            showing_id:_showing_id,
            user: _user.id,
            unique_ids: JSON.stringify(device_tokens),
          }));
        }

        await sails.models.propertyshowing.update({id: {in :ids }}).set({is_notify:1})
          
      }
    }

    const resolveNotificationTable = await Promise.all(notificationSave);
    const resolvedNotifications = await Promise.all(promiseNotifications);

    sails.log.debug({ date, showings: resolvedNotifications, db: resolveNotificationTable });
  }


};

