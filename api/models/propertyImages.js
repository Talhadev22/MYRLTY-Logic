/**
 * PropertyImages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "property_image",
  attributes: {
    updated_at: false,
    created_at: false,
    path: {
      type: "string"
    },
    property_id: {
      model: "PropertyListing"
    },
    is_thumbnail: {
      type: "number"
    }
  },

};

