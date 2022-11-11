const viableUtils = require("viable-utils");
const moment = require("moment");

module.exports = {


    friendlyName: 'Create',
  
  
    description: 'Create Property Seller.',
  
  
    inputs: {
      property_id :{
        type :"string",
        required:true

      },
      user_id :{
        type :"string",

      },
      seller_name :{
        type :"string",
        required:true

      },
      address :{
        type :"string",
        required:true

      },
      title_company_closer: {
        type: "string",
        required:true        
      },

      amount_of_contract: {
      type: "string",
      required:true
      },
  
      is_earnest_money_received: {
      type: "string",
      defaultTo:0
      },
      earnest_money_received_date: {
        type: "string",
        allowNull: true,
      },
      home_inspection_date: {
        type: "string",
        required:true
      },
      home_inspection_info: {
      type: "string",
      allowNull:true        
      },
      termite_inspection_date: {
          type: "string",
          required:true
 
      },

      termite_inspection_info: {
        type: "string",
        allowNull:true        
      },

      is_survey_received: {
        type: "string",
        defaultTo:0 
      },

      
      // survey_due_date: {
      //   type: "string",
      //   defaultTo:0
      // },

      new_survey_info: {
        type: "string",
        allowNull: true
      },

      appraisal_date: {
        type: "string",
        required:true
      },

      // appraisal_due_date: {
      //   type: "string",
      //   required:true        
      // },

      appraisal_additional_info: {
        type: "string",
        required:true
      },
  
  
      // is_cda_sent: {
      //   type: "string",
      //   defaultTo:0
      // },
      
      is_switch_over_utilities: {
        type: "string",
        defaultTo:0
      },

      is_contract_to_lender: {
        type: "string",
        defaultTo:0
      },

      is_home_warranty: {
        type: "string",
        defaultTo:0
      },

      contract_to_lender_date: {
        type: "string",
        allowNull:true
      },

      option_period_end_date: {
        type: "string",
        required:true  
      },

      title_commit_to_be_rec_date: {
        type: "string",
        required:true
      },

      additional_info_entire: {
        type: "string",
        required:true
      },

      home_warranty_date: {
        type: "string",
        allowNull:true
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
              message: "No such property found",
              data: {}
          }
      }
      
       const checkSeller = await sails.models.propertyseller.find({
         property_id: inputs.property_id,
         user_id: check[0].user_id,
         deleted_at: null
     });

     if (checkSeller.length > 0) {
        
       return exits.invalid({ status: false, data: [], message: `seller already exist with property id:${inputs.property_id}` });
     }

     const is_contract_to_lender =  inputs.is_contract_to_lender == 'true' ? 1 : 0;
     const is_earnest_money_received =  inputs.is_earnest_money_received == 'true' ? 1 : 0;
     const is_survey_received =  inputs.is_survey_received == 'true' ? 1 : 0;
    // const is_new_survey =  inputs.is_new_survey == 'true' ? 1 : 0;
    // const is_cda_sent =  inputs.is_cda_sent == 'true' ? 1 : 0;
     const is_home_warranty =  inputs.is_home_warranty == 'true' ? 1 : 0;
     const is_switch_over_utilities =  inputs.is_switch_over_utilities == 'true' ? 1 : 0;
   
    const obj = {
      property_id:inputs.property_id,
      user_id:check[0].user_id,
      seller_name:inputs.seller_name,
      address:inputs.address,
      title_company_closer:inputs.title_company_closer,
      amount_of_contract:inputs.amount_of_contract,
      contract_to_lender_date:inputs.contract_to_lender_date,
      is_contract_to_lender:is_contract_to_lender,
      is_earnest_money_received:is_earnest_money_received,
      home_inspection_date:inputs.home_inspection_date,
      termite_inspection_date:inputs.termite_inspection_date,
      is_survey_received:is_survey_received,
   //   is_new_survey:inputs.is_new_survey,
      new_survey_info:inputs.new_survey_info,
      appraisal_date:inputs.appraisal_date,
      appraisal_additional_info:inputs.appraisal_additional_info,
      closing_additional_info:inputs.closing_additional_info,
      title_commitment:inputs.title_commitment,
    //  is_cda_sent:is_cda_sent,
      is_home_warranty:is_home_warranty,
      home_warranty_date:inputs.home_warranty_date,
      is_switch_over_utilities:is_switch_over_utilities,
      option_period_end_date:inputs.option_period_end_date,
      title_commit_to_be_rec_date:inputs.option_period_end_date,
      termite_inspection_info:inputs.termite_inspection_info,
      additional_info_entire:inputs.additional_info_entire,
      home_inspection_info:inputs.home_inspection_info
     
    }
      
        const data = await sails.models.propertyseller.create(obj).fetch();
       
        await sails.models.propertylisting.update({
          id: inputs.property_id,
          user_id: check[0].user_id,
          deleted_at: null
      }).set({
          is_sold: 1
      }).fetch();
      const data_1 = 2;
      return exits.success({ data: data });

      } catch (e) {
        sails.log.error('error: admin/users/create.js', e);
        return exits.invalid({ status: false, data: [], message: e.message });
      }
    }
  
  
  };
  