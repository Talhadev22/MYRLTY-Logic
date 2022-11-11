const sailsHookOrm = require("sails-hook-orm");
const moment = require("moment");
const { convertUnixToUtc } = require("../../../util");


module.exports = {


  friendlyName: 'purchase subscription',


  description: '',


  inputs: {
      user: {
        type: 'ref',
      },
      subscription_id: {
        type: 'number',
        required: true
      },
      card_token: {
        type:'string'
      }
     

  },


  exits: {

  },


  fn: async function (inputs,exits) {


    try {

    const user = await sails.models.user.findOne({user_id:inputs.user.id})
    const authUser = await sails.models.userauth.findOne({id:inputs.user.id});
    if (!user && !authUser)  {
    return { status: false, message: 'user not found', data: {} }
    } 

    const subscription = await sails.models.subscriptions.findOne({id:inputs.subscription_id})
     if (!subscription) {
      return exits.success({ status: false, message: "subscription not found", data: {} })
    }  
    const is_purchased = await sails.models.user.find({
      user_id:inputs.user.id,
      is_subcribe:1
    })
    if(is_purchased.length > 0){
      return exits.success({
          status: false,
          message: 'subscription already purchased',
          data: {}
        })
    }
    if(subscription.type == 'free'){
       trail_period = subscription.duration
       let end_subs;
       let currentDateTime = moment().toISOString()
        end_subs =  moment().add(trail_period, 'days').toISOString();
        const user_update = await sails.models.user.updateOne({
        user_id:inputs.user.id
    }).set({
        is_subcribe: 0,
        is_checked: 1,
        free_consumed:1,
        subscription_id:1,
        subscription_start_time:currentDateTime,
        subscription_end_time:end_subs,
       
    })
      return exits.success({ status: true, message: "trail period started", data: user_update })
    }
    let interval = subscription.duration_type == 'M'?'month':'year'
    let phone = authUser.phone 
    let email = authUser.email
    const customer_response = await sails.helpers.stripe.customers.create(inputs.user.id,email,phone,user.agency_name)    
    let card_response = await sails.helpers.stripe.cards.add(					
        customer_response.customer.id,
        inputs.card_token
      );
      if (card_response.error) {
        return exits.success({
          status: false,
          message: card_response.error.message,
          data: {}
        })
      }

      let items = []
      items.push({ price: subscription.stripe_price_id })
      let metadata = {user_id:inputs.user.id,subscription_id:inputs.subscription_id}
             payment_info = await sails.helpers.stripe.subscriptions.create(
              customer_response.customer.id,
              items,
               card_response.card.id ,
              metadata
             );
             if (payment_info.error) {
                return exits.success({
                  status: false,
                  message: payment_info.error.message,
                  data: {}
                })
              }
              let subscription_start;
              let subscription_end;
                if (payment_info.subscription) {
                  subscription_start = convertUnixToUtc(payment_info.subscription.current_period_start)
                  subscription_end = convertUnixToUtc(payment_info.subscription.current_period_end)
                  payment_reference = payment_info.subscription.id
                } else {
                  payment_reference = payment_info.result.id
                }
    const user_update = await sails.models.user.updateOne({
        user_id:inputs.user.id
    }).set({
        is_subcribe: 1,
        is_checked: 1,
        free_consumed:1,
        package_id:subscription.package_id,
        subscription_id:subscription.id,
        stripe_customer_id:customer_response.customer.id,
        stripe_subscription_id:payment_info.subscription.id,
        subscription_start_time:subscription_start,
        subscription_end_time:subscription_end,

       
    })
      
    //   let data = {}
    //   packages_[0].subscriptions.map((d) => {
    //     data[d.type] = {
    //       price: d.price,
    //       title: packages_.package_name,
    //       duration_type:d.duration_type,
    //       description: '',
    //     }
               
    //   });
           
   return exits.success({ status: true, message: "successfull", data: user_update })

    } catch (error) {
        return exits.success({ status: false, message: error.message, data: {} })
    }

  }


};
