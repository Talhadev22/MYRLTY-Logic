module.exports = {


  friendlyName: 'List',


  description: 'List users.',


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
    sails.log.debug('calling admin/users/get-one.js');
   


    try {
     // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['name', 'email'], ...inputs });
      const data = await PropertyListing.findOne({id: inputs.id}).populate('images');
      if(data.images.length){
       // data.property_images = _.map(data.images,"path")
       data.property_images = data.images
      }
      return exits.success({ data: data });
    } catch (e) {
      sails.log.error('error: admin/users/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error user list ' });
    }
  }


};
