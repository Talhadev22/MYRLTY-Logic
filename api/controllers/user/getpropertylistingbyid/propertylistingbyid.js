module.exports = {


    friendlyName: 'Get Listing Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        id: {
            type: 'ref',
            required: true
        }
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling getpropertylistingbyid/propertylistingbyid" + JSON.stringify(inputs));

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


            const propertyList = await sails.models.propertylisting.find({
                user_id: check[0].id,
                id: inputs.id,
                deleted_at: null
            }).populate('images');
            sails.log.debug(propertyList)
            if (propertyList.length < 1) {
                return {
                    status: false,
                    message: "No property found",
                    data: {}
                }
            }

            return { status: true, message: "Successfull", data: propertyList }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
