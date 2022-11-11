/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "property_showing",
  attributes: {
    //updated_at: false,
    //created_at:false,

    user_id: {
      model: "User"
    },
    name: {
      type: "string"
    },
    address: {
      type: "string"
    },
    date: {
      type: "ref",
      columnType: 'date'
    },
    start_time: {
      type: "string"
    },
    end_time: {
      type: "string"
    },
    description: {
      type: "string"
    },
    property_id: {
      type: "number",
      defaultsTo: 0
    },
    deleted_at: {
      type: "ref",
      columnType: "datetime"
    },
    notify: {
      collection: 'Notifications',
      via: 'showing_id'
    },
    is_notify:{
      type:'boolean'
    }




  },
  findByUser: function (userId, conditions = {}) {
    const defaultConditions = {
      user_id: userId,
      deleted_at: null
    };
    conditions = { ...defaultConditions, ...conditions };
    const filter = { where: { ...conditions } };
    return this.find(filter).sort('id DESC');
  }

};

