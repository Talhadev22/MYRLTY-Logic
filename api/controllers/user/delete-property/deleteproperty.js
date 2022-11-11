const moment = require("moment");
module.exports = {


    friendlyName: 'Delete Property Listing',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        property_id: {
            type: "string",
            required: true,
        },
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            const deletedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            sails.log.debug(deletedAt)
            sails.log("Calling delete-property/deleteproperty");
            const check = await sails.models.user.find({
                user_id: inputs.user.id,

            });
            const getproperty = await sails.models.propertylisting.find({
                user_id: check[0].id,
                property_id: inputs.property_id,
                deleted_at: null,


            });
            if (check.length < 1) {
                return {
                    status: false,
                    message: "No property listing found",
                    data: {}
                }
            }


            const propertyDelete = await sails.models.propertylisting.updateOne({
                // user_id: inputs.user.id,
                // property_id: inputs.property_id,
                // deleted_at: 0,
                id: getproperty[0].id


            }).set({ deleted_at: deletedAt });


            return { status: true, message: "Successfull", data: propertyDelete }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
