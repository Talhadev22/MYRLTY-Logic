
module.exports = {


    friendlyName: 'MLS Property Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        limit: {
            type: 'number',
            defaultsTo: 10
        },
        offset: {
            type: 'number',
            defaultsTo: 0
        },
        filter: {
            type: 'string',
            isIn: ['location', '1', '2', '3']
        },
        search: {
            type: 'string',
        },
    },

    exits: {
        invalid: {
            responseType: 'badRequest',
        },
        unauthorized: {
            responseType: 'unauthorized'
        },
        forbidden: {
            responseType: 'forbidden',
        },
        serverError: {
            responseType: 'serverError',
        },
        notFound: {
            responseType: 'notFound',
        }
    },


    fn: async function (inputs, exits) {
        try {

            // const mls = await sails.helpers.mls.get(inputs);
            // return exits.success({ status: true, message: 'Successfull', data: mls });
            const filterCondition = {};

            if (inputs.filter) {
                filterCondition['where'] = {};
                if (inputs.search) {
                    filterCondition['where']['property_address'] = { contains: inputs.search };
                }
                if (['1', '2', '3'].includes(inputs.filter)) {
                    filterCondition['where']['property_type_id'] = inputs.filter;
                }
            }
            const mls = await MLSProperties.find(filterCondition).limit(inputs.limit).skip(inputs.offset);
            const images = await MLSPropertiesImages.find({ img_property_id: { in: mls.map(e => e.property_id) } });
            for (let i = 0; i < mls.length; i++) {
                mls[i].images = images.filter(e => e.img_property_id == mls[i].property_id);
            }
            let arr = [];
            mls.map((d) => {
                d.seller = [];
                d.buyer = [];
                d.notes = [];
            });


            return exits.success({
                status: true,
                message: 'MLS properties found',
                data: mls
            });

        } catch (error) {
            return exits.invalid({ status: false, message: error.message, data: {} });
        }
    }


};
