module.exports = {


  friendlyName: 'Faqs',


  description: 'List faqs.',


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
    sails.log.debug('calling admin/faqs/list.js');
    // const res = this.res;
    // res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    // const users = await User.find();
    // res.setHeader(
    //   'X-Total-Count', users.length
    // );
    // return res.json(users);



    try {
      const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['question'], ...inputs });
      const data = await sails.models.propertyfaqs.find(findOptions).sort('created_at DESC');
      const count = await sails.models.propertyfaqs.count(findOptions.where);
      return exits.adminResponse({ data: { data: data }, options: { routeName: 'faqs', range: JSON.parse(inputs.range), count: count } });
    } catch (e) {
      sails.log.error('error: admin/faqs/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error faqs list ' });
    }
  }


};
