const moment = require("moment");

module.exports = {


    friendlyName: 'cancel free subscription',
  
  
    description: 'cron for cancelling free subscriptions automatically',
  
  
    fn: async function () {
  
      sails.log('helpers/cron/cancel-free-subs.js');
  
      try {
      const current_time = moment().toISOString()  
      sails.log.debug(current_time)
   //   end_subs =  moment().substract(5, 'minutes').toISOString();
   //   sails.log.debug(end_subs)
      const sq = await sails.models.user.update({
        subscription_end_time: { '<': current_time},
        free_consumed:1,
        is_subcribe:1,
        subscription_id:1,
        is_checked:1,
     }).set({
        is_subcribe:0,
        is_checked:0
     }).fetch()
      sails.log.debug(sq)
      } catch (error) {
        sails.log("Error", error.message)
      }
    }
  
  
  };
  
  