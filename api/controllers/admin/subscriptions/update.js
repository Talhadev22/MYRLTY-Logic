// TODO update create/edit showings files
module.exports = {


  friendlyName: 'subscriptions update',


  description: 'Property subscriptions Update',


  inputs: {
    id: {
      type: "string",
      required: true,
    },
    duration: {
        type: 'string'
    },
    price: {
      type: 'string',
  },


  },


  exits: {
    adminResponse: {
      responseType: 'adminResponse'
    },
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    sails.log.debug('calling admin/subscriptions/update.js');



    try {
      // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['name', 'email'], ...inputs });
      if(inputs.id == 1){
        const data = await sails.models.subscriptions.updateOne({ id: inputs.id }).set({duration:inputs.duration});
        return exits.success({ data: data });

      }
      const subscription = await sails.models.subscriptions.findOne({id: inputs.id})
      if(!subscription){
        return exits.invalid({ status: false, data: [], message: 'subscription not found' });

      }
      let price = inputs.price * 100
      const create_price = await sails.helpers.stripe.prices.create(price,subscription.type,subscription.stripe_product_id)
      if(!create_price){
        return exits.invalid({ status: false, data: [], message: 'unable to create price' });

      }
      //update price on stripe
      const stripe = require("stripe")(sails.config.STRIPE.SECRET_KEY);
      const product = await stripe.products.update(
        subscription.stripe_product_id,
        {
         metadata: {product_id: subscription.id, subscription_type:subscription.type},
         default_price:create_price.price.id
        },
        
      );
      //end update stripe prices
      obj = {
        duration: inputs.duration,
        price: inputs.price,
        stripe_price_id:create_price.price.id
        
       
      }
      
      const data = await sails.models.subscriptions.updateOne({ id: inputs.id }).set(obj);
      const send = await sails.helpers.cron.update(inputs.price,subscription.type);
      // const allUser = await sails.models.userauth.find({isAdmin:0})
      // let emailList = []
      // for(Us of allUser){
      //   emailList.push({email:Us.email, 
      //                   reason:'price_update',
      //                   price:inputs.price,
      //                   type:subscription.type})
      // } 
      // const ui = await sails.models.sendemail.createEach(emailList).fetch()
      //emailList.push(allUser.email)
      // let emailList = _.map(allUser,"email")

      //const sendMail = await sails.helpers.mailSubscription.sendmail(emailList,inputs.price,subscription.type)
      return exits.success({ data: data });
    } catch (e) {
      sails.log.error('error: admin/subscriptions/update.js', e);
      return exits.invalid({ status: false, data: [], message: e.message });
    }
  }


};
