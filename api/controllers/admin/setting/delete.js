const moment= require("moment");
module.exports = {


    friendlyName: 'Deleting property notes',


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
            sails.log("Calling delete-property/deleteproperty");
            const getuser = await sails.models.propertynotes.find({
                id: inputs.id,
                //deleted_at: null,
            
                
            });
            if (getuser.length < 1) {
                return {
                    status: false,
                    message: "User not found",
                    data: {}
                }
            }

            const userDelete = await sails.models.propertynotes.updateOne({
                id: inputs.id,
            
            }).set({deleted_at: deletedAt});


            return exits.success({
                status: true,
                message: "property note deleted successfully",
              });

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
