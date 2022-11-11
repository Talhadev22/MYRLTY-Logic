const viableUtils = require("viable-utils");
const moment = require("moment");

module.exports = {


    friendlyName: 'Create',
  
  
    description: 'Create users.',
  
  
    inputs: {
    user_id: {
        type: "string",
        required: true,
    },
    property_type_id :{
      type :"number"
    },
    property_address :{
      type :"string"
    },

    property_title :{
      type :"string"
    },
    property_description :{
      type :"string"
    },
    property_price :{
      type :"number"
    },
    property_area :{
      type :"string"
    },
    property_square_feet :{
      type :"string"
    },
    property_year_built:{
      type :"string",
      //columnType:"date"
    },
    latitude:{
      type :"number",
      columnType:"double"
    },
    longitude:{
      type :"number",
      columnType:"double"
    },
    property_images: {
      type: 'ref'
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
      // const property_id = viableUtils.generateOTP();
      const property_id = Date.now() + viableUtils.generateOTP();
    //    const check = await sails.models.user.find({
    //     user_id: inputs.user_id
    //     });

    //     if (check.length < 1) {
    //         return {
    //             status: false,
    //             message: "No such user found",
    //             data: {}
    //         }
    // }     
       const obj = {
        property_type_id:inputs.property_type_id,
        user_id:inputs.user_id,
        property_address:inputs.property_address,
        property_title:inputs.property_title,
        property_description:inputs.property_title,
        property_price:inputs.property_price,
        property_area:inputs.property_area,
        property_square_feet:inputs.property_square_feet,
        property_year_built:inputs.property_year_built,
        //latitude:inputs.latitude,
        //longitude:inputs.longitude,
        property_id:property_id

      }
      const data = await sails.models.propertylisting.create(obj).fetch();
      let property_images = inputs.property_images; //['1', '2', '3']
      if (property_images && property_images.length > 0) {
        await sails.models.propertyimages.destroy({ property_id: data.id });
        await sails.models.propertyimages.createEach([property_images].flat().map(e => { return { path: e, property_id: data.id, is_thumbnail: 0 }; }));
       }

       let lt_prop = await sails.models.propertylisting.find({
        
        id: data.id
        //  is_sold: 0,

    }).populate('images').sort('id DESC');
         
        return exits.success({ data: lt_prop });
      } catch (e) {
        sails.log.error('error: admin/users/create.js', e);
        return exits.invalid({ status: false, data: [], message: 'Error user create ' });
      }
    }
  
  
  };
  