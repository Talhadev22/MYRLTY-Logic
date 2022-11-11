/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"property_types",
  attributes: {
    //updatedAt: false,
    //createdAt:false,

    category_name :{
      type:"string"
    },
    deleted_at: {
      type:"string"
    }

   

  },

};

