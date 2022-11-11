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
    sails.log.debug('calling admin/users/list.js');
    // const res = this.res;
    // res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    // const users = await User.find();
    // res.setHeader(
    //   'X-Total-Count', users.length
    // );
    // return res.json(users);



    try {
      let fl = JSON.parse(inputs.filter);
      let sort = JSON.parse(inputs.sort);
      let range = [0,9];
      sails.log.debug('filters:',fl);
      let where = ` p.deleted_at is null`;
      if(fl.title){
        where += ` AND p.property_title like '%${fl.title}%'`;
      }
      if(fl.type){
        where += ` AND pt.category_name like '%${fl.type}%'`;
      }
      if(fl.address){
        where += ` AND p.property_address like '%${fl.address}%'`;
      }
      if(fl.name){
        where += ` AND up.full_name  like '%${fl.name}%'`;
      }

      let query = `SELECT p.* ,pt.id as property_type_id, up.full_name, count(*) OVER() AS full_count from   properties p JOIN  user_profile up on   p.user_id = up.id JOIN property_types pt on   p.property_type_id = pt.id where ${where} ORDER BY p.id ${sort[1]} LIMIT ${range[1]+1} OFFSET ${range[0]}`;
      const getAllPurchasedAct = await sails.models.propertylisting.getDatastore().sendNativeQuery(query);
      sails.log(query)
      const data = getAllPurchasedAct.rows;
      if(data.length > 0){
        return exits.adminResponse({ data: { data: data }, options: { routeName: 'properties', range: JSON.parse(inputs.range), count: data.length } });
      }else{
        return exits.adminResponse({ data: { data: [] }, options: { routeName: 'properties', range: JSON.parse(inputs.range), count: data.length } });
      }
      // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['property_title'], ...inputs });
      // const data = await sails.models.propertylisting.find(findOptions);
      // const count = await sails.models.propertylisting.count(findOptions.where);
      // sails.log.debug(data)
      // return exits.adminResponse({ data: { data: data }, options: { routeName: 'properties', range: JSON.parse(inputs.range), count: count } });
      //return exits.adminResponse({ data: { data: data }, options: { routeName: 'properties', count: count } });
    
    } catch (e) {
      sails.log.error('error: admin/properties/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error property list ' });
    }
  }


};
