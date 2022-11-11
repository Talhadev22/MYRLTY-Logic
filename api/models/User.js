/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "user_profile",



  attributes: {
    // updatedAt: false,
    // createdAt:false,
    user_id: {
      type: "string"
    },
    agency_name: {
      type: "string"
    },
    bio: {
      type: "string"
    },
    location: {
      type: "string"
    },
    latitude: {
      type: "number"
    },
    longitude: {
      type: "number",
    },
    availability_from: {
      type: "string"
    },
    availability_to: {
      type: "string"
    },
    device_token: {
      type: "string",
      allowNull: true
    },
    preferences: {
      type: "string"
    },
    full_name: {
      type: "string"
    },
    profile_image: {
      type: "string",
      allowNull: true,
    },
    deleted_at: {
      type: "ref",
      columnType: "datetime",
    },
    isNotificationAllowed: {
      type: 'boolean',
      defaultsTo: true,
    },
    showings: {
      collection: 'PropertyShowing',
      via: 'user_id'
    },
    device_tokens: {
      collection: 'DeviceToken',
      via: 'user'
    },
    notifications: {
      collection: 'Notifications',
      via: 'user'
    },
    subscription_id: {
      model: 'Subscriptions',
    },
    package_id:{
      type:'number'
    },
    // subscription_id:{
    //   type:'number'
    // },
    is_subcribe:{
      type:'number'
    },
    subscription_start_time:{
      type: "ref",
      columnType: "datetime",
    },
    subscription_end_time:{
      type: "ref",
      columnType: "datetime",
    },
    stripe_customer_id:{
      type:"string"
    },
    stripe_subscription_id:{
      type:"string"
    },
    is_checked:{
      type:"number"
    },
    free_consumed:{
      type:"number"
    },
    is_cancelled:{
      type:"boolean"
    },
    cancelation_time:{
      type: "ref",
      columnType: "datetime"
    }



  },

};

