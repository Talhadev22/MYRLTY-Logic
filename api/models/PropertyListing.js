/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "properties",
  attributes: {
    // updated_at: false,
    // created_at:false,

    user_id: {
      type: "string"
    },
    property_type_id: {
      type: "string"
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
      type: "string",
      //columnType:"date"
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
      type: "number"
    },
    deleted_at: {
      type: "ref",
      columnType: "datetime",
    },
    sold_at: {
      type: "string",
      
    },
    buyer: {
      collection: "PropertyBuyer",
      via: 'property_id'
    },
    seller: {
      collection: "PropertySeller",
      via: 'property_id'
    },
    notes: {
      collection: "PropertyNotes",
      via: 'property_id'
    },
    images: {
      collection: 'propertyImages',
      via: 'property_id'
    }





  },

};

