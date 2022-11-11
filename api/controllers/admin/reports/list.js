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
        type: 'string',
      },
      month: {
        type: 'string'
      },
    year: {
        type: 'string'
    },
    keyword:{
        type:"string"
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
      let fl = JSON.parse(inputs.filter)
      let sort = JSON.parse(inputs.sort)
      let range = [0,9]
      
      if(inputs.range){
        range = JSON.parse(inputs.range)
      }
      sails.log.debug('calling admin/property_types/list.js');
      // const res = this.res;
      // res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  
      // const users = await User.find();
      // res.setHeader(
      //   'X-Total-Count', users.length
      // );
      // return res.json(users);
  
  
  
      try {
       // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['category_name'], ...inputs });
        // var month = inputs.month; // January
        // var year = inputs.year;
        // var start = new Date(year, month-1, 1);
        // let start_time = start.toISOString();           
        //  var end = new Date(year, month, 0);
        // let end_date = end.toISOString();
        //const getAllAgents = await sails.models.user.count();
        //const data = await sails.models.propertylisting.find({
        //    sold_at: { '>': start_time, '<': end_date },
        //    property_title: {contains:inputs.keyword},
        //     is_sold:1,
        //     deleted_at: null
        // }).populate('buyer').populate('seller').sort('sold_at DESC')
        let where = `
        p.is_sold AND p.deleted_at is null`
        if(fl.agent_name){
          where += ` AND (up.full_name LIKE '%${fl.agent_name}%' OR p.property_title LIKE '%${fl.agent_name}%')`
        }
        if(fl.month_name &&  fl.month_name != 'all'){
          where += ` AND MONTH(p.sold_at)=${fl.month_name}`
        }
        let query = `SELECT
        p.id,
        p.user_id,
        up.full_name,
      p.property_title,
      p.sold_at,
      pb.buyer_name,
      pb.amount_of_contract,
      ps.seller_name,
      count(*) OVER() AS full_count
      
    from
      properties p
    JOIN property_buyer pb on
      p.id = pb.property_id
    JOIN property_seller ps on
      p.id = ps.property_id
    JOIN user_profile up on
      p.user_id = up.id 
      WHERE ${where} ORDER BY p.id ${sort[1]} LIMIT ${range[1]+1} OFFSET ${range[0]}
      `
      
        const getAllPurchasedAct = await sails.models.propertylisting.getDatastore().sendNativeQuery(query);
  
      sails.log(query)
      const qw = getAllPurchasedAct.rows
      if(qw.length <= 0){
        return exits.adminResponse({ data: { data: [] }, options: { routeName: 'reports', range: JSON.parse(inputs.range), count: 0 } });
        
      }
        // let modifiedArr = 
        // data.map((e)=>{
        //   if(e.seller.length != 0 && e.buyer.length != 0){
        //     return {
        //        // agent_name:inputs.user.name,
        //         id:e.id,
        //         seller_name:e.seller[0].seller_name,
        //         buyer_name:e.buyer[0].buyer_name,
        //         property_title:e.property_title,
        //         total_cost:e.seller[0].amount_of_contract,
        //         registered_agents:getAllAgents,
        //     }
        //   }
        // })
        //sails.log.debug(modifiedArr)
        const result = qw.filter(element => {
          return element !== undefined;
        });
        const count = qw[0].full_count;
        
        return exits.
        adminResponse({ data: { data: result }, options: { routeName: 'reports', range: JSON.parse(inputs.range), count: count } });
        //return exits.adminResponse({ data: { data: data }, options: { routeName: 'properties', count: count } });
      
      } catch (e) {
        sails.log.error('error: admin/properties/list.js', e);
        return exits.invalid({ status: false, data: [], message: 'Error property list ' });
      }
    }
  
  
  };
  