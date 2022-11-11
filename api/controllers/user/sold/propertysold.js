const viableUtils = require("viable-utils");
const moment = require('moment');

module.exports = {


    friendlyName: 'Listing Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        property_id: {
            type: 'string'
        },
        
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling user/sold/propertysold");

            const check = await sails.models.user.find({
                user_id: inputs.user.id,
                //property_id: inputs.property_id,
            });

            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }
            
            const getproperty = await sails.models.propertylisting.find({
                user_id: check[0].id,
                property_id: inputs.property_id,
                deleted_at: null
            });
            if (getproperty.length < 1) {
                return {
                    status: false,
                    message: "No such property found",
                    data: {}
                }
            }
            const currentDateTime = moment().utc().toISOString("YYYY-MM-DD");
          
            const propertySold = await sails.models.propertylisting.update({
                user_id: getproperty[0].user_id,
                property_id: inputs.property_id,
                deleted_at: null
            }).set({
                is_sold: 1,
                sold_at: currentDateTime
            }).fetch();
            return { status: true, message: "Successfull", data: propertySold }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
