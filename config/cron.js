
module.exports.cron = {
  myFirstJob: {
    schedule: '*/60 * * * * *',
   // schedule: '1 */15 * * * *',
    onTick: async function () {
       await sails.helpers.cron.showings();
      sails.log.debug('sending notification')

    },

  },

  mySecondJob: {
    schedule: '* * */12 * * *',
    onTick: async function () {
      await sails.helpers.cron.mls();
      sails.log.debug('adding mls')

    },

  },

  myThirdJob: {
    schedule: '*/5 * * * *',
    onTick: async function () {
      await sails.helpers.cron.cancelFreeSubs();
      sails.log.debug('cancel free subscription')

    },
    

  },

  // myFourthJob: {
  //   schedule: '* * * * * *',
  //   //schedule: '1 */15 * * * *',
  //   onTick: async function () {
  //      await sails.helpers.cron.update();
  //     sails.log.debug('sending price update notification')

  //   },

  // },
  // myFourthJob: {
  //   schedule: '*/5 * * * *',
  //   onTick: async function () {
  //     sails.log.debug('price update')

  //     await sails.helpers.mailsubscription.mail();

  //   },
    

  // },





};