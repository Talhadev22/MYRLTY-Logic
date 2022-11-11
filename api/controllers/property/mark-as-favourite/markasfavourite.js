module.exports = {


    friendlyName: 'Mark as favourite',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        id: {
            type: "number",
           // required: true
        },
        property_id: {
            type: "string",
            required: true
        }
    },


    exits: {

    },


    fn: async function (inputs, exists) {
        try {
            sails.log("Calling property/mark-as-favourite/markasfavourite");
            const getUserDetails = await sails.models.user.find({
                user_id: inputs.user.id,
                //property_id: inputs.property_id
            });
            const check = await sails.models.propertylisting.find({
                user_id: getUserDetails[0].id,
                property_id: inputs.property_id
            });

            sails.log(check , "check")

            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such property found",
                    data: {}
                }
            }
            const cond = ( check[0].is_favourite == null || check[0].is_favourite == 0  ) ;
            const markFav = await sails.models.propertylisting.updateOne({
                user_id: getUserDetails[0].id,
                property_id: inputs.property_id
            }).set({
                is_favourite: cond  ? 1 : 0
            }).fetch();

            const msg = cond ? "Mark Favourite" : "Mark Unfavourite"
            return { status: true, message: msg, data: markFav }


        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
