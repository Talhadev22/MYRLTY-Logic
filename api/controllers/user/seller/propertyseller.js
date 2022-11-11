const sailsHookOrm = require("sails-hook-orm");
const moment = require("moment");
module.exports = {


  friendlyName: 'property seller',


  description: '',


  inputs: {
    user: {
      type: 'ref',
      //  required: true
    },

    property_id: {
      type: "string"
    },

    user_id: {
      type: "string"
    },

    seller_name: {
      type: "string"
    },

    address: {
      type: "string"
    },

    title_company_closer: {
      type: "string",

    },

    amount_of_contract: {
      type: "string",

    },

    is_earnest_money_received: {
      type: "string",

    },

    earnest_money_received_date: {
      type: "string",

    },

    home_inspection_date: {
      type: "string",

    },

    home_inspection_info: {
      type: "string",

    },

    termite_inspection_date: {
      type: "string",

    },

    termite_inspection_info: {
      type: "string",

    },

    is_survey_received: {
      type: "string",
      required: true
    },

    is_new_survey: {
      type: "string",

    },

    survey_due_date: {
      type: "string",

    },

    new_survey_info: {
      type: "string",

    },

    appraisal_date: {
      type: "string",

    },

    appraisal_due_date: {
      type: "string",

    },

    appraisal_additional_info: {
      type: "string",

    },

    closing_date: {
      type: "string",

    },

    title_commitment_received_by: {
      type: "string",

    },

    is_cda_sent: {
      type: "string",
      defaultsTo: '0'

    },

    is_switch_over_utilities: {
      type: "string",

    },
    is_contract_to_lender: {
      type: "string",

    },
    is_home_warranty: {
      type: "string",

    },
    contract_to_lender_date: {
      type: "string",

    },
    option_period_end_date: {
      type: "string",

    },
    title_commit_to_be_rec_date: {
      type: "string",
    },
    additional_info_entire: {
      type: "string",
    },
    home_warranty_date: {
      type: "string",
    }

  },


  exits: {

  },


  fn: async function (inputs) {


    try {
      var check = await sails.models.user.find({
        user_id: inputs.user.id,
        //property_id: inputs.property_id,
      })
      if (check.length < 1) {
        return { status: false, message: 'invalid user', data: {} }

      }
      var checkProperty = await sails.models.propertylisting.find({
        user_id: check[0].id,
        property_id: inputs.property_id,
      })

      if (checkProperty.length < 1) {
        return { status: false, message: 'invalid property id', data: {} }

      }
      //    if(inputs.is_earnest_money_received == 1){
      //      if(inputs.earnest_money_received_date !== ''){
      //     inputs.earnest_money_received_date = moment(inputs.earnest_money_received_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   else{
      //     return {status:false,message:'Please earnest money received date' ,data:{}}
      //   }
      // }
      //   if(inputs.home_inspection_date !== ''){
      //     inputs.home_inspection_date = moment(inputs.home_inspection_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.termite_inspection_date !== ''){
      //     inputs.termite_inspection_date = moment(inputs.termite_inspection_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.survey_due_date !== ''){
      //     inputs.survey_due_date = moment(inputs.survey_due_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.appraisal_date !== ''){
      //     inputs.appraisal_date = moment(inputs.appraisal_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.appraisal_due_date !== ''){
      //     inputs.appraisal_due_date = moment(inputs.appraisal_due_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.closing_date !== ''){
      //     inputs.closing_date = moment(inputs.closing_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.is_contract_to_lender == 1){

      //   if(inputs.contract_to_lender_date !== ''){
      //     inputs.contract_to_lender_date = moment(inputs.contract_to_lender_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }else{
      //     return {status:false,message:'Please enter contract to lender date' ,data:{}}
      //   }
      // }
      //   if(inputs.option_period_end_date !== ''){
      //     inputs.option_period_end_date = moment(inputs.option_period_end_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.title_commit_to_be_rec_date !== ''){
      //     inputs.title_commit_to_be_rec_date = moment(inputs.title_commit_to_be_rec_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }
      //   if(inputs.is_home_warranty == 1){

      //   if(inputs.home_warranty_date !== ''){
      //     inputs.home_warranty_date = moment(inputs.home_warranty_date)
      //     .utc()
      //     .toISOString("YYYY-MM-DD");
      //        // sails.log.debug(earnest_money_received_date)   
      //   }else{
      //     return {status:false,message:'Please enter home warranty date' ,data:{}}
      //   }
      // }
      const propertyDetail = await sails.models.propertylisting.findOne({
        property_id: inputs.property_id
      })
      if(!propertyDetail){
        throw new Error('Invalid Property ID');
      }
      const sellerRegis = await sails.models.propertyseller.create({
        property_id: checkProperty[0].id,
        user_id: check[0].id,
        seller_name: inputs.seller_name,
        address: inputs.address,
        title_company_closer: inputs.title_company_closer,
        amount_of_contract: inputs.amount_of_contract,
        is_earnest_money_received: inputs.is_earnest_money_received,
        earnest_money_received_date: inputs.earnest_money_received_date,
        home_inspection_date: inputs.home_inspection_date,
        home_inspection_info: inputs.home_inspection_info,
        termite_inspection_date: inputs.termite_inspection_date,
        termite_inspection_info: inputs.termite_inspection_info,
        is_survey_received: inputs.is_survey_received,
        is_new_survey: inputs.is_new_survey,
        survey_due_date: inputs.survey_due_date,
        new_survey_info: inputs.new_survey_info,
        appraisal_date: inputs.appraisal_date,
        appraisal_due_date: inputs.appraisal_due_date,
        appraisal_additional_info: inputs.appraisal_additional_info,
        closing_date: inputs.closing_date,
        //  closing_additional_info:inputs.closing_additional_info,
        title_commitment_received_by: inputs.title_commitment_received_by,
        is_cda_sent: inputs.is_cda_sent,
        is_switch_over_utilities: inputs.is_switch_over_utilities,
        is_home_warranty: inputs.is_home_warranty,
        home_warranty_date: inputs.home_warranty_date,
        contract_to_lender_date: inputs.contract_to_lender_date,
        option_period_end_date: inputs.option_period_end_date,
        title_commit_to_be_rec_date: inputs.title_commit_to_be_rec_date,
        additional_info_entire: inputs.additional_info_entire,
        is_contract_to_lender: inputs.is_contract_to_lender,


      }).fetch();

      await sails.models.propertylisting.update({
        user_id: check[0].id,
        property_id: inputs.property_id,
      }).set({
        seller_id: sellerRegis.id,
      })
      sellerRegis['property_id'] = propertyDetail.property_id;

      return { status: true, message: "successfull", data: sellerRegis }

    } catch (error) {
      return { status: false, message: error.message, data: {} }
    }

  }


};
