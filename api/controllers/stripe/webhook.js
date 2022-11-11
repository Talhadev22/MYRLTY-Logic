
const express = require('express');
const { convertUnixToUtc } = require('../../util');
module.exports = {


  friendlyName: 'Webhook',


  description: '',


  inputs: {
    body: {
     type:'ref'
   }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    express.raw({ type: 'application/json' })    
    let request = this.req
    let response = this.res
    try {
      // const event = request.body;
      const event = inputs.body;
      let obj;     
    // Handle the event
      console.log(event.data.object)
      obj = event.data.object;
      console.log({eventType:event.type})
    switch (event.type) {            
      case 'customer.subscription.deleted':   
       update = await sails.models.user.update({user_id:obj.metadata.user_id}).set({       
        is_subcribe:0,
        is_checked:0,        
        })
        
        break;
        case 'subscription_schedule.canceled':   
       update = await sails.models.user.update({user_id:obj.metadata.user_id}).set({       
        is_subcribe:0,
        is_checked:0,        
        })
        
        break;
      
        


      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
      return exits.success();
    } catch (err) {
      sails.log.error(`Error in action stripe/webhook. ${err}`)
    }
    return exits.success({status:true,session:null})
    

  }


};
