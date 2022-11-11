const moment = require("moment");
module.exports = {


    friendlyName: 'Deleting showings',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        id: {
            type: 'number'
        },

    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            const deletedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            sails.log("Calling delete-showings/deleteshowings");
            const getshowings = await sails.models.propertyshowing.find({
                id: inputs.id,
                //deleted_at: null,


            });
            if (getshowings.length < 1) {
                return {
                    status: false,
                    message: "Showings not found",
                    data: {}
                }
            }

            const showingDelete = await sails.models.propertyshowing.updateOne({
                id: inputs.id,

            }).set({ deleted_at: deletedAt });


            return exits.success({
                status: true,
                message: "showing deleted successfully",
            });

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
