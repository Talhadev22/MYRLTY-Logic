module.exports = {


  friendlyName: 'List',


  description: 'List notes.',


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
    sails.log.debug('calling admin/users/list.js');
    // const res = this.res;
    // res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    // const users = await User.find();
    // res.setHeader(
    //   'X-Total-Count', users.length
    // );
    // return res.json(users);



    try {
      const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['description'], ...inputs });
      const data = await sails.models.propertynotes.find(findOptions).sort('created_at DESC');
      const count = await sails.models.propertynotes.count(findOptions.where);
      return exits.adminResponse({ data: { data: data }, options: { routeName: 'users', range: JSON.parse(inputs.range), count: count } });
    } catch (e) {
      sails.log.error('error: admin/notes/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error notes list ' });
    }
  }


};
