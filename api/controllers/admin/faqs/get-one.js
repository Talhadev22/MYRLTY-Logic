const PropertyNotes = require("../../../models/PropertyNotes");

module.exports = {


  friendlyName: 'Notes',


  description: 'Property notes get-one',


  inputs: {
    id:{
    required:true,
    type:'number'
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
    sails.log.debug('calling admin/notes/get-one.js');
   


    try {
     // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['name', 'email'], ...inputs });
      const data = await sails.models.propertyfaqs.findOne({id: inputs.id});
      sails.log.debug(data)
      return exits.success({ data: data });
    } catch (e) {
      sails.log.error('error: admin/notes/get-one.js', e);
      return exits.invalid({ status: false, data: [], message: e.message });
    }
  }


};
