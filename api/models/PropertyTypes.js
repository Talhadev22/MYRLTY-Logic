/**
 * PropertyTypes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'property_types',
  attributes: {

    category_name: {
      type: 'string'
    },
    mls_category: {
      type: 'string',
      allowNull: true
    },
    deleted_at: {
      type: "ref",
      columnType: "datetime"
    }
  },

};

