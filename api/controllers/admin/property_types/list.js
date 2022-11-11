module.exports = {


  friendlyName: 'List',


  description: 'List properties.',


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
    sails.log.debug('calling admin/property_types/list.js');
    // const res = this.res;
    // res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    // const users = await User.find();
    // res.setHeader(
    //   'X-Total-Count', users.length
    // );
    // return res.json(users);



    try {
      const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['category_name'], ...inputs });
      const data = await sails.models.categories.find(findOptions);
      const count = await sails.models.categories.count(findOptions.where);
      sails.log.debug(data)
      return exits.adminResponse({ data: { data: data }, options: { routeName: 'property_types', range: JSON.parse(inputs.range), count: count } });
      //return exits.adminResponse({ data: { data: data }, options: { routeName: 'properties', count: count } });
    
    } catch (e) {
      sails.log.error('error: admin/properties/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error property list ' });
    }
  }


};
