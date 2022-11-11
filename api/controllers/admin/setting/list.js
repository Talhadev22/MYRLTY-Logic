module.exports = {


  friendlyName: 'Property Setting',


  description: 'List Property Setting.',


  inputs: {
    sort: {
      type: 'string'
    },
    range: {
      type: 'string',
    },
    filter: {
      type: 'string'
    }
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
    sails.log.debug('calling admin/Property Setting/list.js');
    // const res = this.res;
    // res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    // const users = await User.find();
    // res.setHeader(
    //   'X-Total-Count', users.length
    // );
    // return res.json(users);



    try {
      const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['about_us'], ...inputs });
      const data = await sails.models.propertysetting.find(findOptions);
      const count = await sails.models.propertysetting.count(findOptions.where);
      return exits.adminResponse({ data: { data: data }, options: { routeName: 'setting', range: JSON.parse(inputs.range), count: count } });
    } catch (e) {
      sails.log.error('error: admin/Property Setting/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error faqs list ' });
    }
  }


};
