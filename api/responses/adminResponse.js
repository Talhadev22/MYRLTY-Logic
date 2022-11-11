/**
 * adminResponse.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.adminResponse();
 *     // -or-
 *     return res.adminResponse(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'adminResponse'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function adminResponse(data) {
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  sails.log.debug('data', data);
  sails.log.debug('data_options', data.options);
  // Set status code
  res.status(200);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Range', `${data.options.routeName} ${data.options.range[0]}-${data.options.range[1]}/${data.options.count}`);


  return res.json(data.data);
};
