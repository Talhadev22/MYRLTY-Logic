const viableUtils = require("viable-utils");
const moment = require("moment");

module.exports = {


    friendlyName: 'Create',
  
  
    description: 'Create users.',
  
  
    inputs: {
        // property_id :{
        //     type :"string"
        //   },
          question: {
            type: "string",
            required: true,
        },
        answer: {
          type: "string",
          required: true,
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
      sails.log.debug('calling admin/faqs/create.js');
     
  
  
      try {
       const obj = {
        //property_id:inputs.property_id,
        question:inputs.question,
        answer:inputs.answer,
        
      }
      
        const data = await sails.models.propertyfaqs.create(obj).fetch();
        return exits.success({ data: data });
      } catch (e) {
        sails.log.error('error: admin/notes/create.js', e);
        return exits.invalid({ status: false, data: [], message: e.message });
      }
    }
  
  
  };
  