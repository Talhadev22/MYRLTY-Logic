module.exports = {


  friendlyName: 'Property types',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    return exits.success({ status: true, message: '', data: await PropertyTypes.find({ deleted_at: null }) });

  }


};
