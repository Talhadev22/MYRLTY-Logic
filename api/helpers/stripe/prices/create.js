module.exports = {


  friendlyName: 'Add price',


  description: '',


  inputs: {
    // product_data: {
    //   type: 'ref',
    //   required:true
    // },
    price: {
      type: 'number',
      required:true
    },
    interval: {
      type: 'string',
      required: true,
      isIn:['month','year','day']
    },
    product_id:{
      type:'string',
      required:true
    }
    // currency: {
    //   type: 'string',
    //   required: false,
    //   defaultsTo:"usd"
    // },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    sails.log.debug("Helper stripe/prices/create started");
		let data = {};
		try {
			const stripe = require("stripe")(sails.config.STRIPE.SECRET_KEY);
     let obj = {
      unit_amount: inputs.price,
      currency: 'usd',
      recurring: {interval: inputs.interval},            
    }
    if(inputs.product_id){
      obj.product = inputs.product_id
    }
      const price = await stripe.prices.create(obj);
      if (price) {
        data.price = price
      }
      return exits.success(data);
		} catch (err) {
      sails.log.error(`Error in helper stripe/prices/create. ${err}`);
      data.error = err
      return exits.success(data);
		}
  }


};

