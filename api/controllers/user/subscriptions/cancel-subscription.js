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


  fn: async function (inputs,exits) {

    try {
      user_info  = await sails.models.user.findOne({user_id:inputs.user.id})
      if(!user_info){
        return exits.success({ status: true, message: "user not found", data: {} })

      }
      if(user_info.is_cancelled == false){
      var cancel = await sails.helpers.stripe.subscriptions.update(user_info.id,user_info.stripe_subscription_id)
      return exits.success({ status: true, message: "successfull", data: cancel })
      }else{
        return exits.success({ status: false, message: "subscription already cancelled", data: {} })

      }

    } catch (error) {
      return exits.success({ status: false, message: "error", data: {} })
    }

  }


};
