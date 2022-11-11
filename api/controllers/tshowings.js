module.exports = {


  friendlyName: 'Tshowings',


  description: 'Tshowings something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    sails.log('Running custom shell script... (`sails run schedule-showings`)');
    try {
      await sails.helpers.cron.showings();
    } catch (e) {
      sails.log.error({ err: e.message });
    }

  }


};
