/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  'user/post-registration/post-registration': ['isLoggedInJwt'],
  'user/edit-profile/editprofile': ['isLoggedInJwt'],
  'user/listing-property/listingproperty': ['isLoggedInJwt'],
  'user/get-listing/getlisting': ['isLoggedInJwt'],
  'user/getpropertylistingbyid/propertylistingbyid': ['isLoggedInJwt'],


  'user/buyer/propertybuyer': ['isLoggedInJwt'],
  'user/seller/propertyseller': ['isLoggedInJwt'],
  'user/sold/propertysold': ['isLoggedInJwt'],

  'property/mark-as-favourite/markasfavourite': ['isLoggedInJwt'],
  'user/delete-property/deleteproperty': ['isLoggedInJwt'],
  'user/getallfavouriteproperty/getallfavouriteproperty': ['isLoggedInJwt'],
  'user/searchfavouriteproperty/searchfavouriteproperty': ['isLoggedInJwt'],

  'user/searchproperty/searchproperty': ['isLoggedInJwt'],
  // 'admin/property_types/list': ['isLoggedInJwt'],

  'user/editproperty/editproperty': ['isLoggedInJwt'],
  'user/searchbuyer/searchbuyer': ['isLoggedInJwt'],
  'user/searchseller/searchseller': ['isLoggedInJwt'],
  'user/getprofile/getprofile': ['isLoggedInJwt'],

  'user/showings/addshowing': ['isLoggedInJwt'],
  'user/showings/editshowing': ['isLoggedInJwt'],
  'user/showings/deleteshowing': ['isLoggedInJwt'],
  'user/showings/allshowings': ['isLoggedInJwt'],


  'user/notes/addnotes': ['isLoggedInJwt'],
  'user/notes/editnotes': ['isLoggedInJwt'],
  'user/notes/deletenotes': ['isLoggedInJwt'],
  'user/propertycounts/propertycounts': ['isLoggedInJwt'],
  'user/monthlyrevenue/monthlyrevenue': ['isLoggedInJwt'],
  'allow-notification/get-notifications': ['isLoggedInJwt'],
  'allow-notification/is-open': ['isLoggedInJwt'],

  'notification/send': ['isLoggedInJwt'],
  'devicetoken/save': ['isLoggedInJwt'],
  'allow-notification/toggle': ['isLoggedInJwt'],
  'user/report/report':['isLoggedInJwt'],
  'user/report/get':['isLoggedInJwt'],
  'allow-notification/is-open-count': ['isLoggedInJwt'],
  'user/subscriptions/cancel-subscription': ['isLoggedInJwt'],
  'user/subscriptions/apple-pay': ['isLoggedInJwt'],
  'user/subscriptions/google-pay': ['isLoggedInJwt'],

  //'user/subscriptions/get':['isLoggedInJwt'],




  'user/graphapi/graphapi': ['isLoggedInJwt'],
  'user/setting/get-setting': ['isLoggedInJwt'],
  'user/setting/get-faqs': ['isLoggedInJwt'],
  'user/subscriptions/purchase': ['isLoggedInJwt'],
  
  'logout': ['isLoggedInJwt'],


};
