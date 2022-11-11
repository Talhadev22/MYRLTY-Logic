const moment= require("moment");
module.exports = {


    friendlyName: 'Deleting property seller',


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
            const getuser = await sails.models.propertyseller.find({
                id: inputs.id,
                //deleted_at: null,
            
                
            });
            if (getuser.length < 1) {
                return {
                    status: false,
                    message: "Property not found",
                    data: {}
                }
            }

            const userDelete = await sails.models.propertyseller.update({
                id: inputs.id,
            
            }).set({deleted_at: deletedAt});


            return exits.success({
                status: true,
                message: "Property Buyer deleted successfully",
              });

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
