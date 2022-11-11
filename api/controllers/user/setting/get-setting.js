const moment = require('moment');
module.exports = {


    friendlyName: 'property counts',


    description: 'properties counts',


    inputs: {
        user: {
            type: 'ref'
        },
        


    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log('Calling setting/get-setting.js');
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });

            if (check.length < 1) {
                throw new Error('User not found');
            }
         
            const data = await sails.models.propertysetting.find()

                return { status: true, message: "successfull", data: data }

             


        } catch (error) {
            sails.log('Error setting/get-setting.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
