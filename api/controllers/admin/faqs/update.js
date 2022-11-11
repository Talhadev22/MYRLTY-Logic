module.exports = {


    friendlyName: 'Faq update',
  
  
    description: 'Property Faq Update',
  
  
    inputs: {
      id: {
        type: "string",
        required: true,
      },
      // property_id:{
      //   required:true,
      //   type:'string'
      // },
      question:{
        required:true,
        type:'string'
      },
      answer:{
        required:true,
        type:'string'
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
      sails.log.debug('calling admin/faqs/update.js');
     
  
  
      try {
       // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['name', 'email'], ...inputs });
        obj = {
          question:inputs.question,
          answer:inputs.answer,
          
        }
        const data = await sails.models.propertyfaqs.updateOne({id: inputs.id}).set(obj);
        return exits.success({ data: data });
      } catch (e) {
        sails.log.error('error: admin/faqs/update.js', e);
        return exits.invalid({ status: false, data: [], message: e.message });
      }
    }
  
  
  };
  