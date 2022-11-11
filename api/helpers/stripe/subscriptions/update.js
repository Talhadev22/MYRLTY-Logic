module.exports = {


  friendlyName: 'update',


  description: 'Update subscription',


  inputs: {
    id:{
      type:'number',
      required:true
    },
    subscription_id: {
      type: 'string',
      required:true
    },
   
   
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    sails.log.debug("Helper stripe/subscriptions/update started");
		let data = {};
		try {
			const stripe = require("stripe")(sails.config.STRIPE.SECRET_KEY);
     
      // const subscription = await stripe.subscriptions.update(inputs.subscription_id,
      //  inputs.data_to_update);
      // if (subscription) {
      //   data.subscription = subscription
      // }
      const subscription = await stripe.subscriptions.update(inputs.subscription_id, {cancel_at_period_end: true});
      const cancel_db = await sails.models.user.updateOne({id:inputs.id}).set({
        is_cancelled:1,
        
      })
      return exits.success(subscription);
		} catch (err) {
      sails.log.error(`Error in helper stripe/subscriptions/update. ${err}`);
      data.error = err
      return exits.success(data);
		}
  }


};

