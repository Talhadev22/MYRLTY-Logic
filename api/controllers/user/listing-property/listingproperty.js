const viableUtils = require('viable-utils');
const moment = require('moment');


module.exports = {


    friendlyName: 'Listing Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        listUserId: {
            type: 'string'
        },
        propertyType: {
            type: 'string'
        },
        propertyAddress: {
            type: 'string'
        },
        propertyTitle: {
            type: 'string'
        },
        propertyDescription: {
            type: 'string'
        },
        propertyPrice: {
            type: 'number'
        },
        propertyArea: {
            type: 'string'
        },
        propertySquarefeet: {
            type: 'string'
        },
        propertyYear: {
            type: 'string'
        },
        latitude: {
            type: 'string',
            columnType: 'date'
        },
        longitude: {
            type: 'number',
        },
        property_images: {
            type: 'ref'
        },

    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log('Calling listing-property/listingproperty');

            const check = await sails.models.user.find({
                user_id: inputs.user.id,

            });

            if (check.length < 1) {
                return {
                    status: false,
                    message: 'No such user found',
                    data: {}
                };
            }

            // inputs.propertyYear = moment(inputs.propertyYear)
            // .utc()
            // .toISOString("YYYY-MM-DD");
            let property_images = inputs.property_images; //['1', '2', '3']
            // const images = JSON.stringify(property_images);
            //TODO user database uuid here
            const property_id = Date.now() + viableUtils.generateOTP();
            //sails.log.debug(property_id)
            const matchedColumns = {
                user_id: check[0].id,
                property_type_id: inputs.propertyType,
                property_address: inputs.propertyAddress,
                property_title: inputs.propertyTitle,
                property_description: inputs.propertyDescription,
                latitude: inputs.latitude,
                longitude: inputs.longitude,
                property_price: inputs.propertyPrice,
                property_area: inputs.propertyArea,
                property_square_feet: inputs.propertySquarefeet,
                property_id: property_id,
                property_year_built: inputs.propertyYear,
                // property_images: images,
                //deleted_at: null,
            };

            const propertyList = await sails.models.propertylisting.create(matchedColumns).fetch();
            if (!propertyList) {
                throw new Error('There is no property with that id');
            }

            if (property_images && property_images.length > 0) {
                const propertyImages = await sails.models.propertyimages.createEach(property_images.map(e => { return { path: e, property_id: propertyList.id, is_thumbnail: 0 }; }));

            }


            return { status: true, message: 'Successfull', data: propertyList };




        } catch (error) {
            return { status: false, message: error.message, data: {} };
        }
    }


};
