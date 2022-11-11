const moment= require("moment");
module.exports = {


    friendlyName: 'Deleting user',


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
            const getuser = await sails.models.propertybuyer.find({
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

            const userDelete = await sails.models.propertybuyer.update({
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
