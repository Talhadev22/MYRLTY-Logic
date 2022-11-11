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
            sails.log('Calling propertycounts/propertycounts.js');
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });

            if (check.length < 1) {
                throw new Error('User not found');
            }

            const properties = await sails.models.propertylisting.count({
                user_id: check[0].id,
                deleted_at: null
            })
            const sold_prop = await sails.models.propertylisting.count({
                user_id: check[0].id,
                is_sold: 1,
                deleted_at: null
            })
            const buyers = await sails.models.propertybuyer.count({
                user_id: check[0].id,
                deleted_at: null
            })
            const sellers = await sails.models.propertyseller.count({
                user_id: check[0].id,
                deleted_at: null
            })
            const mls = await sails.models.mlsproperties.count({
                // user_id: check[0].id,    
                deleted_at: null
            })
            const res = {
                'properties': properties,
                'buyers': buyers,
                'sellers': sellers,
                'sold': sold_prop,
                'mls': mls,
            }

            return { status: true, message: "successfull", data: res }




        } catch (error) {
            sails.log('Error showing/addshowing.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
