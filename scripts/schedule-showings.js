module.exports = {


  friendlyName: 'Schedule showings',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run schedule-showings`)');
    try {
      await sails.helpers.cron.showings();
    } catch (e) {
      sails.log.error({ err: e.message });
    }

  }


};

