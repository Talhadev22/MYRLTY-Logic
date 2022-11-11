/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "mlsproperties",
  attributes: {
    user_id: {
      type: "number"
    },
    property_type_id: {
      type: "number"
    },
    property_address: {
      type: "string"
    },

    property_title: {
      type: "string"
    },
    property_description: {
      type: "string"
    },
    property_price: {
      type: "number"
    },
    property_area: {
      type: "string"
    },
    property_square_feet: {
      type: "string"
    },
    property_year_built: {
      type: "ref",
      columnType: "datetime"
    },
    latitude: {
      type: "number",
      columnType: "double"
    },
    longitude: {
      type: "number",
      columnType: "double"
    },

    is_favourite: {
      type: "number"
    },
    is_sold: {
      type: "number"
    },
    property_id: {
      type: "string"
    },
    deleted_at: {
      type: "ref",
      columnType: "datetime",
    },
    sold_at: {
      type: "string",
    },
    images: {
      collection: 'MLSPropertiesImages',
      via: 'img_property_id'
    }
  },

};

