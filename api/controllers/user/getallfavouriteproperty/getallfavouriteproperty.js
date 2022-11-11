module.exports = {


    friendlyName: 'Get Favourite Property',


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
            sails.log("Calling get-listing/getlisting");

            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });

            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }


            const propertyList = await sails.models.propertylisting.find({
                user_id: inputs.user.id,
                is_favourite: 1,
                deleted_at: 0
            }).populate('images');

            return { status: true, message: "Successfull", data: propertyList }



        } catch (error) {
            sails.log.debug(error.message)
            return { status: false, message: error.message, data: {} }
        }
    }


};
