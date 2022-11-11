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
            const checkFaq = await sails.models.propertyfaqs.find({
                id: inputs.id,
                deleted_at: null,
            
                
            });
            if (checkFaq.length < 1) { 
                return {
                    status: false,
                    message: "Faq not found",
                    data: {}
                }
            }

            const userFaqs = await sails.models.propertyfaqs.updateOne({
                id: inputs.id,
            
            }).set({deleted_at: deletedAt});


            return exits.success({
                status: true,
                message: "Faqs deleted successfully",
              });

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
