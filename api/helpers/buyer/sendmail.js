const axios = require('axios')
module.exports = {


  friendlyName: 'Send otp',


  description: '',


  inputs: {
    email: {
      type: 'string',
      isEmail: true,
      required: true
    },
    
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({email}) {
    sails.log.debug('calling helpers/send-otp', {email});
    const {data} = await axios.post(sails.config.GATEWAY_SERVER+'send-email',{
      to: email,
      subject: 'Verify email',
      msg: `Your OTP is`
    });
    return data;
  }


};

