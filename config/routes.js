const corsPolicy = {
  allRoutes: true,
  allowOrigins: ['http://localhost:3000', 'https://realtor-12.web.app', 'https://myrlty123.herokuapp.com'],
  allowCredentials: true,
  allowHeaders: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  allowRequestHeaders: '*',
};

/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const adminPrefix = 'admin';
module.exports.routes = {

  'GET /': function (req, res) {
    res.send({ status: 'Alive' });
  },
  [`POST /api/v1/admin/users`]: { cors: corsPolicy, action: 'admin/users/create' },
  [`GET /api/v1/admin/users`]: { cors: corsPolicy, action: 'admin/users/list' },
  [`GET /api/v1/admin/users/:id`]: { cors: corsPolicy, action: 'admin/users/get-one' },
  [`PUT /api/v1/admin/users/:id`]: { cors: corsPolicy, action: 'admin/users/update' },
  [`DELETE /api/v1/admin/users/:id`]: { cors: corsPolicy, action: 'admin/users/delete' },

  [`POST /api/v1/admin/notes`]: { cors: corsPolicy, action: 'admin/notes/create' },
  [`GET /api/v1/admin/notes`]: { cors: corsPolicy, action: 'admin/notes/list' },
  [`GET /api/v1/admin/notes/:id`]: { cors: corsPolicy, action: 'admin/notes/get-one' },
  [`PUT /api/v1/admin/notes/:id`]: { cors: corsPolicy, action: 'admin/notes/update' },
  [`DELETE /api/v1/admin/notes/:id`]: { cors: corsPolicy, action: 'admin/notes/delete' },

  //Subscription
  [`GET /api/v1/admin/subscriptions`]: { cors: corsPolicy, action: 'admin/subscriptions/list' },
  [`GET /api/v1/admin/subscriptions/:id`]: { cors: corsPolicy, action: 'admin/subscriptions/get-one' },
  [`PUT /api/v1/admin/subscriptions/:id`]: { cors: corsPolicy, action: 'admin/subscriptions/update' },
  

  [`POST /api/v1/admin/showings`]: { cors: corsPolicy, action: 'admin/showings/create' },
  [`GET /api/v1/admin/showings`]: { cors: corsPolicy, action: 'admin/showings/list' },
  [`GET /api/v1/admin/showings/:id`]: { cors: corsPolicy, action: 'admin/showings/get-one' },
  [`PUT /api/v1/admin/showings/:id`]: { cors: corsPolicy, action: 'admin/showings/update' },
  [`DELETE /api/v1/admin/showings/:id`]: { cors: corsPolicy, action: 'admin/showings/delete' },
  [`POST /api/v1/admin/faqs`]: { cors: corsPolicy, action: 'admin/faqs/create' },
  [`GET /api/v1/admin/faqs`]: { cors: corsPolicy, action: 'admin/faqs/list' },
  [`GET /api/v1/admin/faqs/:id`]: { cors: corsPolicy, action: 'admin/faqs/get-one' },
  [`PUT /api/v1/admin/faqs/:id`]: { cors: corsPolicy, action: 'admin/faqs/update' },
  [`DELETE /api/v1/admin/faqs/:id`]: { cors: corsPolicy, action: 'admin/faqs/delete' },

  [`POST /api/v1/admin/setting`]: { cors: corsPolicy, action: 'admin/setting/create' },
  [`GET /api/v1/admin/setting`]: { cors: corsPolicy, action: 'admin/setting/list' },
  [`GET /api/v1/admin/setting/:id`]: { cors: corsPolicy, action: 'admin/setting/get-one' },
  [`PUT /api/v1/admin/setting/:id`]: { cors: corsPolicy, action: 'admin/setting/update' },
  [`DELETE /api/v1/admin/setting/:id`]: { cors: corsPolicy, action: 'admin/setting/delete' },

  //Reports
  [`GET /api/v1/admin/report`]: { cors: corsPolicy, action: 'admin/reports/list' },

  [`GET /api/v1/admin/properties`]: { cors: corsPolicy, action: 'admin/properties/list' },
  [`POST /api/v1/admin/properties`]: { cors: corsPolicy, action: 'admin/properties/create' },
  [`GET /api/v1/admin/properties/:id`]: { cors: corsPolicy, action: 'admin/properties/get-one' },
  [`PUT /api/v1/admin/properties/:id`]: { cors: corsPolicy, action: 'admin/properties/update' },
  [`DELETE /api/v1/admin/properties/:id`]: { cors: corsPolicy, action: 'admin/properties/delete' },


  [`GET /api/v1/admin/property_types`]: { cors: corsPolicy, action: 'admin/property_types/list' },

  [`GET /api/v1/admin/property_buyers`]: { cors: corsPolicy, action: 'admin/property_buyers/list' },
  [`POST /api/v1/admin/property_buyers`]: { cors: corsPolicy, action: 'admin/property_buyers/create' },
  [`GET /api/v1/admin/property_buyers/:id`]: { cors: corsPolicy, action: 'admin/property_buyers/get-one' },
  [`PUT /api/v1/admin/property_buyers/:id`]: { cors: corsPolicy, action: 'admin/property_buyers/update' },
  [`DELETE /api/v1/admin/property_buyers/:id`]: { cors: corsPolicy, action: 'admin/property_buyers/delete' },

  [`GET /api/v1/admin/property_sellers`]: { cors: corsPolicy, action: 'admin/property_sellers/list' },
  [`POST /api/v1/admin/property_sellers`]: { cors: corsPolicy, action: 'admin/property_sellers/create' },
  [`GET /api/v1/admin/property_sellers/:id`]: { cors: corsPolicy, action: 'admin/property_sellers/get-one' },
  [`PUT /api/v1/admin/property_sellers/:id`]: { cors: corsPolicy, action: 'admin/property_sellers/update' },
  [`DELETE /api/v1/admin/property_sellers/:id`]: { cors: corsPolicy, action: 'admin/property_sellers/delete' },
  [`GET /api/v1/aws/sign-url`]: 'aws/sign-url',

  //User Api's
  'POST /api/v1/user/post-registration': { cors: corsPolicy, action: 'user/post-registration/post-registration' },
  'POST /api/v1/user/edit-profile': { cors: corsPolicy, action: 'user/edit-profile/editprofile' },



  //Property Api's
  //'POST /api/v1/user/addproperty': { cors: corsPolicy, action: 'user/listing-property/listingproperty' },
  //'GET /api/v1/user/getproperty': { cors: corsPolicy, action: 'user/get-listing/getlisting' },
  //'GET /api/v1/user/getproperty/:id': { cors: corsPolicy, action: 'user/getpropertylistingbyid/propertylistingbyid' },
  //'POST /api/v1/user/markfavourite': { cors: corsPolicy, action: 'property/mark-as-favourite/markasfavourite' },
  'POST /api/v1/user/add-buyer': { cors: corsPolicy, action: 'user/buyer/propertybuyer' },
  'POST /api/v1/user/add-seller': { cors: corsPolicy, action: 'user/seller/propertyseller' },
  'POST /api/v1/user/is-sold': { cors: corsPolicy, action: 'user/sold/propertysold' },

  'POST /api/v1/user/add-property': { cors: corsPolicy, action: 'user/listing-property/listingproperty' },
  'POST /api/v1/user/edit-property': { cors: corsPolicy, action: 'user/editproperty/editproperty' },

  'GET /api/v1/user/get-property': { cors: corsPolicy, action: 'user/get-listing/getlisting' },
  'GET /api/v1/user/get-property/:id': { cors: corsPolicy, action: 'user/getpropertylistingbyid/propertylistingbyid' },
  'GET /api/v1/user/get-all-favourite-property': { cors: corsPolicy, action: 'user/getallfavouriteproperty/getallfavouriteproperty' },


  'POST /api/v1/user/mark-favourite': { cors: corsPolicy, action: 'property/mark-as-favourite/markasfavourite' },
  'DELETE /api/v1/user/delete-property': { cors: corsPolicy, action: 'user/delete-property/deleteproperty' },

  'GET /api/v1/user/search-favourite-property': { cors: corsPolicy, action: 'user/searchfavouriteproperty/searchfavouriteproperty' },


  'GET /api/v1/user/search-property': { cors: corsPolicy, action: 'user/searchproperty/searchproperty' },
  'GET /api/v1/user/search-buyer': { cors: corsPolicy, action: 'user/searchbuyer/searchbuyer' },
  'GET /api/v1/user/search-seller': { cors: corsPolicy, action: 'user/searchseller/searchseller' },

  'GET /api/v1/user/get-categories': { cors: corsPolicy, action: 'user/categories/getcategories' },
  'GET /api/v1/user/get-user-profile': { cors: corsPolicy, action: 'user/getprofile/getprofile' },

  'POST /api/v1/user/add-showing': { cors: corsPolicy, action: 'user/showings/addshowing' },
  'GET /api/v1/user/get-all-showing': { cors: corsPolicy, action: 'user/showings/allshowings' },
  'PUT /api/v1/user/update-showing': { cors: corsPolicy, action: 'user/showings/editshowing' },
  'DELETE /api/v1/user/delete-showing': { cors: corsPolicy, action: 'user/showings/deleteshowing' },

  'PUT /api/v1/user/edit-notes': { cors: corsPolicy, action: 'user/notes/editnotes' },
  'DELETE /api/v1/user/delete-notes': { cors: corsPolicy, action: 'user/notes/deletenotes' },

  'GET /api/v1/user/get-all-notes': { cors: corsPolicy, action: 'user/allnotes/allnotes' },

  'POST /api/v1/user/add-notes': { cors: corsPolicy, action: 'user/notes/addnotes' },
  'GET /api/v1/user/property-counts': { cors: corsPolicy, action: 'user/propertycounts/propertycounts' },
  'GET /api/v1/user/monthly-revenue': { cors: corsPolicy, action: 'user/monthlyrevenue/monthlyrevenue' },
  'GET /api/v1/user/graph-api': { cors: corsPolicy, action: 'user/graphapi/graphapi' },
  'GET /api/v1/user/get-setting': { cors: corsPolicy, action: 'user/setting/get-setting' },
  'GET /api/v1/user/get-faqs': { cors: corsPolicy, action: 'user/setting/get-faqs' },



  'POST /api/v1/device-token': { cors: corsPolicy, action: 'devicetoken/save' },
  'POST /api/v1/allow-notification': { cors: corsPolicy, action: 'allow-notification/toggle' },
  'GET /api/v1/get-notification-list': { cors: corsPolicy, action: 'allow-notification/get-notifications' },
  'PUT /api/v1/is-open': { cors: corsPolicy, action: 'allow-notification/is-open' },
  'GET /api/v1/is-open-count': { cors: corsPolicy, action: 'allow-notification/is-open-count' },
  
  'PUT /api/v1/is-notification-open': { cors: corsPolicy, action: 'allow-notification/is-notification-open' },
  'POST /api/v1/user/sendnotification': { cors: corsPolicy, action: 'notification/send' },


  'GET /api/v1/user/mls/get': { cors: corsPolicy, action: 'user/mls/get' },
  'GET /api/v1/user/report': { cors: corsPolicy, action: 'user/report/report' },
  'GET /api/v1/user/report/res': { cors: corsPolicy, action: 'user/report/get' },
  'GET /api/v1/user/report/test': { cors: corsPolicy, action: 'user/report/testreport' },

  //Subscription
  'GET /api/v1/user/subscriptions/get': { cors: corsPolicy, action: 'user/subscriptions/get' },
  'POST /api/v1/user/subscriptions/purchase': { cors: corsPolicy, action: 'user/subscriptions/purchase' },
  'POST /api/v1/user/subscriptions/apple-purchase': { cors: corsPolicy, action: 'user/subscriptions/apple-pay' },
  'POST /api/v1/user/subscriptions/google-purchase': { cors: corsPolicy, action: 'user/subscriptions/google-pay' },
  
  'POST /api/v1/user/subscriptions/cancel': { cors: corsPolicy, action: 'user/subscriptions/cancel-subscription' },
  
  "POST /api/v1/test-payment" :{
    cors: corsPolicy,
    action: "test-payment",
  },
  'POST /api/v1/stripe/webhook': 'stripe/webhook',
  //TODO delete below route
  'GET /api/v1/tshowings': { action: 'tshowings' },
  'GET /api/v1/property_types': { action: 'property_types' },
  'GET /api/v1/notify': { action: 'notify' },
  'GET /api/v1/logout': { action: 'logout' },
}
