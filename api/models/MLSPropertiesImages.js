/**
 * PropertyImages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

    tableName: "mlspropertiesimages",
    attributes: {
      updated_at: false,
      created_at: false,
      img_property_id: {
        model: "MLSProperties"
      },
      img_url: {
        type: "string"
      }
    },
  };
  
  