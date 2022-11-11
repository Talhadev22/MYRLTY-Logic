/**
 * PropertyListing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "property_seller",
  attributes: {
   // updated_at: false,
   // created_at: false,

    // property_id :{
    //   type:"string"
    // },
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
      allowNull: true,

    },
    termite_inspection_date: {
      type: "string",

    },
    termite_inspection_info: {
      type: "string",
      allowNull:true

    },
    is_survey_received: {
      type: "string",
      allowNull:true
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
    closing_additional_info: {
      type: "string",

    },

    title_commitment_received_by: {
      type: "string",

    },
    is_cda_sent: {
      type: "string",

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
    },
    property_id: {
      model: 'PropertyListing',
      unique: true
    },
    deleted_at: {
      type: "ref",
      columnType: "datetime"
    }




  },

};

