/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"packages",
  attributes: {
    //updatedAt: false,
    //createdAt:false,

    package_name :{
      type:"string"
    },
    status :{
      type:"number"
    },
    deleted_at: {
      type:"string"
    },
    subscriptions: {
      collection: "Subscriptions",
      via: 'package_id'
    },

   

  },

};

