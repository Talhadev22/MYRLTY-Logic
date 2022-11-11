const axios = require('axios')
module.exports = {


  friendlyName: 'Send otp',


  description: '',


  inputs: {
    email: {
      type: 'ref',
     // required: true
    },
    price:{
      type:'string',
     // required: true
    },
    type:{
      type:'string',
     // required: true
    }
    
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try{
    sails.log.debug('calling helpers/send-price-email', inputs.email);
    sails.log.debug(sails.config.GATEWAY_SERVER)
    const getAllEmails = await sails.models.sendemail.find()
    sails.log.debug(getAllEmails)
    if(getAllEmails.length > 0){
    for(info of getAllEmails){
      sails.log.debug(info)
    const destroy = await sails.models.sendemail.destroy({id:info.id})
    sails.log.debug(info.email)
    sails.log.debug(info.type)
    sails.log.debug(info.price)
    const {data} = await axios.post(sails.config.GATEWAY_SERVER+'send-bulk-email',{
       to: info.email,
       subject: 'Price Update',
       msg: `New Price for ${info.type}ly subscription is USD ${info.price}`
     });
    
    }
  }else {
    return true
  }
}catch(e){
  sails.log.error(`Error in helper notifications/get. ${e}`);     

}
  }


};

