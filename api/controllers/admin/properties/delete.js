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
            const getuser = await sails.models.propertylisting.find({
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

            const PropertyDelete = await sails.models.propertylisting.update({
                id: inputs.id,
            
            }).set({deleted_at: deletedAt});
            const buyerDelete = await sails.models.propertybuyer.update({
                property_id: inputs.id,
            
            }).set({deleted_at: deletedAt});

            const sellerDelete = await sails.models.propertyseller.update({
                property_id: inputs.id,
            
            }).set({deleted_at: deletedAt});

            return exits.success({
                status: true,
                message: "property and its details deleted successfully",
              });

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
