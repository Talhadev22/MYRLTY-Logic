module.exports = {


  friendlyName: 'Price update',


  description: '',


  fn: async function () {
    await sails.helpers.mailsubscription.mail();

    sails.log('Running custom shell script... (`sails run price-update`)');

  }


};

