module.exports = {


  friendlyName: 'Notify',


  description: 'Notify something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    await sails.helpers.cron.showings();

    return;

  }


};
