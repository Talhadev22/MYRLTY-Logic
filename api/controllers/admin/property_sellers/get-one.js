module.exports = {


  friendlyName: 'List',


  description: 'property sellers.',


  inputs: {
    id:{
    required:true,
    type:'number'
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
    sails.log.debug('calling admin/users/get-one.js');
   


    try {
     // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['name', 'email'], ...inputs });
      const data = await PropertySeller.findOne({id: inputs.id});
        data.is_cda_sent = Boolean(data.is_cda_sent)
        data.is_contract_to_lender = Boolean(data.is_contract_to_lender)
        data.is_earnest_money_received = Boolean(data.is_earnest_money_received)
        data.is_home_warranty = Boolean(data.is_home_warranty)
        data.is_new_survey = Boolean(data.is_new_survey)
        data.is_survey_received = Boolean(data.is_survey_received)
        data.is_switch_over_utilities = Boolean(data.is_switch_over_utilities)
       
      return exits.success({ data: data });
    } catch (e) {
      sails.log.error('error: admin/users/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error property buyer list ' });
    }
  }


};
