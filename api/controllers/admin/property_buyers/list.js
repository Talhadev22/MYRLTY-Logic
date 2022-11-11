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
      let fl = JSON.parse(inputs.filter);
      let sort = JSON.parse(inputs.sort);
      let range = [0,9];
      sails.log.debug('filters:',fl);
      let where = ` p.deleted_at is null`;
      if(fl.title){
        where += ` AND p.property_title like '%${fl.title}%'`;
      }
      if(fl.address){
        where += ` AND pb.address like '%${fl.address}%'`;
      }
      if(fl.buyer){
        where += ` AND pb.buyer_name like '%${fl.buyer}%'`;
      }
      if(fl.tcc){
        where += ` AND pb.title_company_closer  like '%${fl.tcc}%'`;
      }
      let query = `SELECT
      
      pb.address,
      pb.title_company_closer,
      pb.user_id ,
      pb.amount_of_contract,
      pb.is_contract_to_lender,
      pb.contract_to_lender_date,
      pb.is_earnest_money_received,
      pb.earnest_money_received_date,
      pb.is_home_warranty,
      pb.home_warranty_date,
      pb.is_contract_to_lender,
      pb.is_cda_sent ,
      pb.is_new_survey,
      pb.is_survey_received,
      pb.is_switch_over_utilities,
      pb.property_id as property_id,
      p.id,
      p.user_id,
      up.full_name,
      p.property_title,
      p.sold_at,
      pb.buyer_name,
      pb.new_survey_info,
      pb.home_inspection_date,
      pb.home_inspection_info,
      pb.termite_inspection_date,
      pb.termite_inspection_info,
      pb.appraisal_date,
      pb.appraisal_due_date,
      pb.appraisal_additional_info,
      pb.closing_date,
      pb.title_commitment,
      pb.option_period_end,
      pb.termite_inspection_info,
      pb.additional_info_entire,
      count(*) OVER() AS full_count
      
      
    from
      properties p
    JOIN property_buyer pb on
      p.id = pb.property_id
    JOIN property_types pt on
      p.property_type_id = pt.id
      JOIN  user_profile up on  
       p.user_id = up.id
    where
      ${where}
      ORDER BY p.id ${sort[1]} LIMIT ${range[1]+1} OFFSET ${range[0]}
      `;
      const getAllPurchasedAct = await sails.models.propertylisting.getDatastore().sendNativeQuery(query);
      sails.log(query)
      const data = getAllPurchasedAct.rows;
      for(obj of data){
          obj.is_contract_to_lender = Boolean(obj.is_contract_to_lender)
          obj.is_cda_sent = Boolean(obj.is_cda_sent)
          obj.is_earnest_money_received = Boolean(obj.is_earnest_money_received)
          obj.is_home_warranty = Boolean(obj.is_home_warranty)
          obj.is_new_survey = Boolean(obj.is_new_survey)
          obj.is_survey_received = Boolean(obj.is_survey_received)
          obj.is_switch_over_utilities = Boolean(obj.is_switch_over_utilities)
         }
      if(data.length > 0){
        return exits.adminResponse({ data: { data: data }, options: { routeName: 'properties', range: JSON.parse(inputs.range), count: data.length } });
      }else{
        return exits.adminResponse({ data: { data: [] }, options: { routeName: 'properties', range: JSON.parse(inputs.range), count: data.length } });
      }
      // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['buyer_name','address','title_company_closer'], ...inputs });
      // const data = await sails.models.propertybuyer.find(findOptions).sort('id DESC');
      // for(obj of data){
      //   obj.is_contract_to_lender = Boolean(obj.is_contract_to_lender)
      //   obj.is_cda_sent = Boolean(obj.is_cda_sent)
      //   obj.is_earnest_money_received = Boolean(obj.is_earnest_money_received)
      //   obj.is_home_warranty = Boolean(obj.is_home_warranty)
      //   obj.is_new_survey = Boolean(obj.is_new_survey)
      //   obj.is_survey_received = Boolean(obj.is_survey_received)
      //   obj.is_switch_over_utilities = Boolean(obj.is_switch_over_utilities)
      //  }
      // const count = await sails.models.propertybuyer.count(findOptions.where);
      // return exits.adminResponse({ data: { data: data }, options: { routeName: 'property_buyers', range: JSON.parse(inputs.range), count: count } });
      //return exits.adminResponse({ data: { data: data }, options: { routeName: 'properties', count: count } });
    
    } catch (e) {
      sails.log.error('error: admin/properties/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error property list ' });
    }
  }


};
