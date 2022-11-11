const moment= require("moment");
module.exports = {


    friendlyName: 'Delete Property Notes',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        id: {
            type: "string",
        },
        property_id: {
            type: "string",
        },
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            const deletedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            sails.log.debug(deletedAt)
            sails.log("Calling notes/deletenotes");
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
                    message: "No user found",
                    data: {}
                }
            }
            if (getproperty.length < 1) {
                return {
                    status: false,
                    message: "No property found",
                    data: {}
                }
            }

            
            const notesDelete = await sails.models.propertynotes.updateOne({
                // user_id: inputs.user.id,
                // property_id: inputs.property_id,
                // deleted_at: 0,
                id: inputs.id
                
                
            }).set({deleted_at: deletedAt});


            return { status: true, message: "Successfull", data: notesDelete }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
