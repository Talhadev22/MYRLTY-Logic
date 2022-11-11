const viableUtils = require("viable-utils");
const moment = require("moment");
// TODO create showings is not completed kinldy complete it
module.exports = {


  friendlyName: 'Create',


  description: 'Create users.',


  inputs: {
    property_id: {
      type: "string"
    },
    description: {
      type: "string",
      required: true,
    },




  },


  exits: {
    adminResponse: {
      responseType: 'adminResponse'
    },
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    sails.log.debug('calling admin/notes/create.js');



    try {
      const obj = {
        property_id: inputs.property_id,
        description: inputs.description,

      }

      const data = await sails.models.propertynotes.create(obj).fetch();
      return exits.success({ data: data });
    } catch (e) {
      sails.log.error('error: admin/notes/create.js', e);
      return exits.invalid({ status: false, data: [], message: e.message });
    }
  }


};
