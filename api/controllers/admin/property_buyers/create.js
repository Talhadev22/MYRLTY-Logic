const viableUtils = require("viable-utils");
const moment = require("moment");

module.exports = {


  friendlyName: 'Create',


  description: 'Create Property Buyer.',


  inputs: {
    user_id: {
      type: "string"
    },
    property_id: {
      type: "string"
    },
    buyer_name: {
      type: "string",
      required: true
    },
    address: {
      type: "string",
      required: true
    },
    title_company_closer: {
      type: "string",
      required: true

    },
    option_period_end: {
      type: "string",
      required: true,

    },
    amount_of_contract: {
      type: "string",
      required: true

    },

    contract_to_lender_date: {
      type: "string",
      // required: true

    },
    is_contract_to_lender: {
      type: "string",
      // required: true

    },
    is_earnest_money_received: {
      type: "string",
      // required: true

    },
    earnest_money_received_date: {
      type: "string",
      // required: true

    },
    home_inspection_date: {
      type: "string",
      required: true

    },
    home_inspection_info: {
      type: "string",
      allowNull: true

    },
    termite_inspection_date: {
      type: "string",
      required: true

    },

    is_survey_received: {
      type: "string",
      allowNull: true
    },
    is_new_survey: {
      type: "string",
      // required: true

    },
    new_survey_info: {
      type: "string",
      // required: true

    },
    appraisal_date: {
      type: "string",
      required: true

    },
    appraisal_due_date: {
      type: "string",
      required: true

    },
    appraisal_additional_info: {
      type: "string",
      required: true

    },
    closing_date: {
      type: "string",
      required: true

    },
    // closing_additional_info: {
    //   type: "string",
    //   required: true

    // },

    title_commitment: {
      type: "string",
      required: true

    },
    // is_cda_sent: {
    //   type: "string",
    //   // required: true

    // },
    is_home_warranty: {
      type: "string",
      // required: true

    },
    home_warranty_date: {
      type: "string",
      // required: true

    },
    is_switch_over_utilities: {
      type: "string",
      // required: true

    },
    termite_inspection_info: {
      type: "string",
      allowNull: true

    },
    additional_info_entire: {
      type: "string",
      required: true


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
      const check = await sails.models.propertylisting.find({
        id: inputs.property_id
      });

      if (check.length < 1) {
        return {
          status: false,
          message: "No such user found",
          data: {}
        }
      }

      const checkBuyer = await sails.models.propertybuyer.find({
        property_id: inputs.property_id,
        user_id: check[0].user_id,
        deleted_at: null
      });

      if (checkBuyer.length > 0) {

        return exits.invalid({ status: false, data: [], message: `buyer already exist with property id:${inputs.property_id}` });
      }

      const is_contract_to_lender =  inputs.is_contract_to_lender == 'true' ? 1 : 0;
      const is_earnest_money_received =  inputs.is_earnest_money_received == 'true' ? 1 : 0;
      const is_survey_received =  inputs.is_survey_received == 'true' ? 1 : 0;
      const is_new_survey =  inputs.is_new_survey == 'true' ? 1 : 0;
    //  const is_cda_sent =  inputs.is_cda_sent == 'true' ? 1 : 0;
      const is_home_warranty =  inputs.is_home_warranty == 'true' ? 1 : 0;
      const is_switch_over_utilities =  inputs.is_switch_over_utilities == 'true' ? 1 : 0;
     
      obj = {
        property_id: inputs.property_id,
        user_id: check[0].user_id,
        buyer_name: inputs.buyer_name,
        address: inputs.address,
        title_company_closer: inputs.title_company_closer,
        amount_of_contract: inputs.amount_of_contract,
        contract_to_lender_date: inputs.contract_to_lender_date,
        is_contract_to_lender: is_contract_to_lender,
        is_earnest_money_received: is_earnest_money_received,
        home_inspection_date: inputs.home_inspection_date,
        termite_inspection_date: inputs.termite_inspection_date,
        is_survey_received: is_survey_received,
        is_new_survey: is_new_survey,
        new_survey_info: inputs.new_survey_info,
        appraisal_date: inputs.appraisal_date,
        appraisal_additional_info: inputs.appraisal_additional_info,
      //  closing_additional_info: inputs.closing_additional_info,
        title_commitment: inputs.title_commitment,
      //  is_cda_sent: is_cda_sent,
        is_home_warranty: is_home_warranty,
        home_warranty_date: inputs.home_warranty_date,
        is_switch_over_utilities: is_switch_over_utilities,
        option_period_end: inputs.option_period_end,
        termite_inspection_info: inputs.termite_inspection_info,
        additional_info_entire: inputs.additional_info_entire,
        closing_date: inputs.closing_date,
        appraisal_due_date: inputs.appraisal_due_date,
        earnest_money_received_date: inputs.earnest_money_received_date,
        home_inspection_info: inputs.home_inspection_info



      }

      const data = await sails.models.propertybuyer.create(obj).fetch();
      const ty = data
      return exits.success({ data: data });
    } catch (e) {
      sails.log.error('error: admin/users/create.js', e);
      return exits.invalid({ status: false, data: [], message: e.message });
    }
  }


};
