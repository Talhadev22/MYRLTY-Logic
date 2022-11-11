//const { initConfig } = require('grunt');
const moment = require('moment');

const { convertUnixToUtc } = require("../../../util");

module.exports = {


  friendlyName: 'Purchase subs using apple pay',


  description: 'Purchase subs using apple pay by fans',


  inputs: {

    user: {
      type: 'ref',
      required: true
    },
    subscription_id: {
      type: 'string',
      required: true
    }, 
    payment_method_id: {
      type:'string'
    },
    client_stripe_customer: {
      type: 'string'
    }
        
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      
      sails.log.debug('action subscription/apple-pay.js called with inputs: ', JSON.stringify(inputs), '\nTime: ', moment().format())

      const check_user = await sails.models.user.find({
            user_id:inputs.user.id
      })
      const authUser = await sails.models.userauth.findOne({id:inputs.user.id});
      if (!authUser)  {
      return { status: false, message: 'user not found', data: {} }
      }
      if(check_user.length < 1){
        return exits.success({
            status: false,
            message: 'User not found',
            data: {}
          })
      }
      // if (user.email !== email) {
      //   sails.log.debug('action user/account/form.js exited: User not found \nTime: ', moment().format())
      //   return exits.success({
      //     status: false,
      //     message: 'Form Submission failed, email is incorrect',
      //     data: {}
      //   })
      // }
      const subscription = await sails.models.subscriptions.find({
        id:inputs.subscription_id
      })
      if(subscription.length < 1){
        return exits.success({
            status: false,
            message: 'subscription not found',
            data: {}
          })
      }
     
      // const check_page = await sails.models.fan_activations.find({
      //   page_id:check[0].page_id,
      // })
      // if(check_page.length > 0){
      //   return exits.success({
      //       status: false,
      //       message: 'Activation already bought against this page',
      //       data: {}
      //     })
      // }
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
    ///payment
    let phone = authUser.phone 
    let email = authUser.email
  
      let payment_info = null
      let customer_response;
      if(check_user[0].stripe_customer_id == ''){
      const create_customer = await sails.helpers.stripe.customers.create(inputs.user.id,email,phone,check_user[0].agency_name)
      customer_response = {customer:{id:create_customer.customer.id}};
      const user_update = await sails.models.user.updateOne({
      id:check_user[0].id
      }).set({
        stripe_customer_id:create_customer.customer.id
      })
      }else{
        customer_response = {customer:{id:check_user[0].stripe_customer_id}};

      }
      
      // await sails.helpers.stripe.customers.create(
      //   inputs.user.id,
      //   inputs.user.email
      // );
      switch (subscription[0].type) {
        case 'month':
        case 'year':
        //  let interval = subscription[0].duration_type == 'M'?'month':'year'
        
          let payment_method_response = await sails.helpers.stripe.paymentMethods.attach(					
            customer_response.customer.id,
            inputs.payment_method_id
          );
          if (payment_method_response.error) {
            return exits.success({
              status: false,
              message: payment_method_response.error.message,
              data: {}
            })
          }
          customer_response = await sails.helpers.stripe.customers.update.with({
            customer_id: customer_response.customer.id,
            user_id:inputs.user.id,
            default_payment_method:payment_method_response.payment_method.id
           }
            
          );
          // if(customer_response){
          //   return exits.success({
          //     status: false,
          //     message: 'Customer not found',
          //     data: {}
          //   })
          // }
          // let price_response = await sails.helpers.stripe.prices.create(
          //   { name: check[0].activation_name },
          //   check[0].activation_price,
          //   interval,
          // );
          // if (price_response.error) {
          //   return exits.success({
          //     status: false,
          //     message: price_response.error.message,
          //     data: {}
          //   })
          // }
          
            let items = []
          items.push({ price: subscription[0].stripe_price_id })
          let metadata = {user_id:inputs.user.id,subscription_id:inputs.subscription_id}
          payment_info = await sails.helpers.stripe.subscriptions.create.with({
            customer:customer_response.customer.id,
            items,
            metadata
          });            
                      
          
          break;
      }
    if (payment_info.error) {
      return exits.success({
        status: false,
        message: payment_info.error.message,
        data: {}
      })
    }
      if (payment_info.result) {
        return exits.success({
          status: true,
          message: 'Processed successfully',
          data:{client_secret:payment_info.result.client_secret}
        })
      }
      subscription_start = convertUnixToUtc(payment_info.subscription.current_period_start)
      subscription_end = convertUnixToUtc(payment_info.subscription.current_period_end)
     // payment_reference = payment_info.subscription.id
      const user_update = await sails.models.user.updateOne({
        user_id:inputs.user.id
    }).set({
        is_subcribe: 1,
        is_checked: 1,
        free_consumed:1,
        package_id:subscription[0].package_id,
        subscription_id:subscription[0].id,
        stripe_customer_id:customer_response.customer.id,
        stripe_subscription_id:payment_info.subscription.id,
        subscription_start_time:subscription_start,
        subscription_end_time:subscription_end,

       
    })
    if (!user_update) {
            sails.log.debug('action subscription/apple-pay.js called with inputs: User not found \nTime: ', moment().format())
            return exits.success({
            status: false,
            message: 'Form Submission failed',
            data: {}
            })
        }

      // const _user = await sails.helpers.jwt.generateToken.with({ user: updateUser });
      sails.log.debug('action subscription/apple-pay.js called with inputs successfully executed \nTime: ', moment().format())
      return exits.success({
        status: true,
        message: 'Form submitted successfully',
        data: { client_secret:payment_info.subscription.payment_intent.client_secret }
      })

    } catch (error) {

      sails.log.error('action subscription/apple-pay.js called with inputs execution failed: ', error, ' \nTime: ', moment().format())
      return exits.success({
        status: false,
        message: error.message,
        data: {}
      })
    }

  }


};
