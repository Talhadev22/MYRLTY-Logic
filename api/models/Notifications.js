/**
 * Notifications.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    notification_type: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    user: {
      model: "User"
    },
    image: {
      type: 'string',
      allowNull: true
    },
    unique_ids: {
      type: 'string'
    },
    is_open: {
      type: 'string'
    },
    // showing_id: {
    //   type: 'string',

    // },
    deleted_at: {
      type: 'ref',
      columnType: 'timestamp',
    },
    showing_id: {
      model: 'PropertyShowing'
    }
  }
};

