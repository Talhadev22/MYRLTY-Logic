module.exports = {


    friendlyName: 'Notes update',
  
  
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
      term_and_condition:{
        required:true,
        type:'string'
      },
      privacy_policy:{
        required:true,
        type:'string'
      },
      about_us:{
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
          privacy_policy:inputs.privacy_policy,
          term_and_condition:inputs.term_and_condition,
          about_us:inputs.about_us,
          
        }
        const data = await sails.models.propertysetting.updateOne({id: inputs.id}).set(obj);
        return exits.success({ data: data });
      } catch (e) {
        sails.log.error('error: admin/faqs/update.js', e);
        return exits.invalid({ status: false, data: [], message: e.message });
      }
    }
  
  
  };
  