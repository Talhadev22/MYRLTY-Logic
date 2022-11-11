module.exports = {


  friendlyName: 'Cancel free subs',


  description: '',


  fn: async function () {

    
    sails.log('Running custom shell script... (`sails run cancel-free-subs`)');
    try {
      await sails.helpers.cron.cancelFreeSubs();
    } catch (e) {
      sails.log.error({ err: e.message });
    }

  }


};

