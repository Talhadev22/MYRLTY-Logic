module.exports = {


  friendlyName: 'Testq',


  description: 'Testq something.',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run testq`)');
    console.log(
        await PropertyListing.find({id: 2}).populate('buyer')
      )

  }


};

