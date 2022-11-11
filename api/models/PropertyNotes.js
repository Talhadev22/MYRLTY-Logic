/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

    tableName:"property_notes",
    attributes: {
      //updated_at: false,
      //created_at:false,
      // id: {
      //   type: "string",
      //  // required: true
      // },

      property_id: {
        model: 'PropertyListing',
        unique: true
      },

    description :{
        type :"string"
    },
    
    deleted_at: {
      type: "ref",
      columnType: "datetime"
    }
      
  
     
  
    },
  
  };
  
  