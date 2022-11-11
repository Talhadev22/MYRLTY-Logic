/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"subscriptions",
  attributes: {
    //updatedAt: false,
    //createdAt:false,

    package_id :{
      model:"packages",
      
    },
    type :{
      type:"string"
    },
    price :{
      type:"string"
    },
    duration :{
      type:"string"
    },
    duration_type :{
      type:"string"
    },
    status :{
      type:"string"
    },
    deleted_at:{
      type: "ref",
      columnType: "datetime"
    },
    stripe_price_id:{
      type: "string",
      
    },
    stripe_product_id:{
      type: "string",
      
    },
    users: {
      collection: 'user',
      via: 'subscription_id'
    },
    is_new_price:{
      type: "number",
    }
    
    

   

  },

};

