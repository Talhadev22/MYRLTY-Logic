module.exports = {


    friendlyName: 'Notes update',
  
  
    description: 'Property Note Update',
  
  
    inputs: {
      id: {
        type: "string",
        required: true,
      },
      property_id:{
        required:true,
        type:'string'
      },
      description:{
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
      sails.log.debug('calling admin/notes/update.js');
     
  
  
      try {
       // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['name', 'email'], ...inputs });
        obj = {
          property_id:inputs.property_id,
          description:inputs.description,
          
        }
        const data = await sails.models.propertynotes.updateOne({id: inputs.id}).set(obj);
        return exits.success({ data: data });
      } catch (e) {
        sails.log.error('error: admin/notes/update.js', e);
        return exits.invalid({ status: false, data: [], message: e.message });
      }
    }
  
  
  };
  