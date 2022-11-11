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
            sails.log("Calling get-listing/getlisting");

            const check = await sails.models.user.find({
                user_id: inputs.user.id,

            });
            //sails.log.debug(check)
            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }


            const propertyList = await sails.models.propertylisting.find({
                user_id: check[0].id,
                deleted_at: null
            }).populate('images').sort('id DESC');


            return { status: true, message: "Successfull", data: propertyList }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
