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
            sails.log("Calling categories/getcategories");

            
            const propertyType = await sails.models.categories.find();


            return { status: true, message: "Successfull", data: propertyType }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
