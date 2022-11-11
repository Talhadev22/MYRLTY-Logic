const sailsHookOrm = require("sails-hook-orm");
const moment = require("moment");
module.exports = {


  friendlyName: 'get subscription packages',


  description: '',


  inputs: {
    user: {
      type: 'ref',
      //  required: true
    },

    

  },


  exits: {

  },


  fn: async function (inputs) {


    try {
      var packages_ = await sails.models.packages.find().populate('subscriptions')
      // if (check.length < 1) {
      //   return { status: false, message: 'invalid user', data: {} }
      // }
      let data = {}
      packages_[0].subscriptions.map((d) => {
        data[d.type] = {
          id: d.id,
          type:d.type,
          price: d.price,
          title: packages_.package_name,
          duration_type:d.duration_type,
          description: '',
        }
               
      });
           
      return { status: true, message: "successfull", data: data }

    } catch (error) {
      return { status: false, message: error.message, data: {} }
    }

  }


};
