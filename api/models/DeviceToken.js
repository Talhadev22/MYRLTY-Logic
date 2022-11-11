/**
 * DeviceTokens.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "device_tokens",
  attributes: {
    created_at: false,
    updated_at: false,
    createdAt: { type: 'ref', columnType: 'timestamp', autoCreatedAt: true, },
    updatedAt: { type: 'ref', columnType: 'timestamp', autoUpdatedAt: true, },

    device_token: {
      type: "string",
      required: true,
    },
    device_platform: {
      type: "string",
      // required: true,
    },
    unique_id: {
      type: "string",
      // required: true,
      // unique: true,
    },
    user: {
      model: 'User'
    }
  },
};
