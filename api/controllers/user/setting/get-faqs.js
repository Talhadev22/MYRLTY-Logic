const moment = require('moment');
module.exports = {


    friendlyName: 'FAQS',


    description: 'get FAQS',


    inputs: {
        user: {
            type: 'ref'
        },
        


    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log('Calling setting/get-faqs.js');
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });

            if (check.length < 1) {
                throw new Error('User not found');
            }
         
            const data = await sails.models.propertyfaqs.find({
                deleted_at: null
            }).sort('created_at DESC')

                return { status: true, message: "successfull", data: data }

             


        } catch (error) {
            sails.log('Error setting/get-faqs.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
