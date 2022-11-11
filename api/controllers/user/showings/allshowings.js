module.exports = {


    friendlyName: 'Get Showings',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling showings/allshowings");

            const check = await sails.models.user.find({
                user_id: inputs.user.id,

            });

            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }


            const propertyShowings = await sails.models.propertyshowing.findByUser(check[0].id);


            return { status: true, message: "Successfull", data: propertyShowings }

        } catch (error) {
            sails.log('Error showing/allshowing.js', error);

            return { status: false, message: error.message, data: {} }
        }
    }


};
