/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

    tableName:"settings",
    attributes: {
      //updated_at: false,
      //created_at:false,
      // id: {
      //   type: "string",
      //  // required: true
      // },

      // property_id: {
      //   model: 'PropertyListing',
      //   unique: true
      // },
    term_and_condition :{
        type :"string"
    },
    privacy_policy :{
        type :"string"
    },
    about_us :{
      type :"string"
  },
    
    deleted_at: {
      type: "ref",
      columnType: "datetime"
    }
      
  
     
  
    },
  
  };
  
  