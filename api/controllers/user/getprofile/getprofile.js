module.exports = {


    friendlyName: 'Get Listing Property',


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
            sails.log("Calling categories/getuserprofile");

            
            const propertyType = await sails.models.user.find({
                user_id: inputs.user.id
            });


            return { status: true, message: "Successfull", data: propertyType }

        } catch (error) {
            return { status: false, message: 'User not found', data: {} }
        }
    }


};
