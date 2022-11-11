const viableUtils = require("viable-utils");
const moment = require("moment");

module.exports = {


    friendlyName: 'Edit Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        listUserId: {
            type: "string"
        },
        propertyType: {
            type: "string"
        },
        propertyAddress: {
            type: "string"
        },
        propertyTitle: {
            type: "string"
        },
        propertyDescription: {
            type: "string"
        },
        propertyPrice: {
            type: "number"
        },
        propertyArea: {
            type: "string"
        },
        propertySquarefeet: {
            type: "string"
        },
        propertyYear: {
            type: "string"
        },
        latitude: {
            type: "string",
            columnType: "date"
        },
        longitude: {
            type: "number",
        },
        propertyId: {
            type: "number",
        },
        property_images: {
            type: 'ref'
        },
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling listing-property/listingproperty");
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });
            const check_property = await sails.models.propertylisting.find({
                user_id: check[0].id,
                property_id: inputs.propertyId
            }).populate('images');
            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }

            if (check_property.length < 1) {
                return {
                    status: false,
                    message: "No property found against this user",
                    data: {}
                }
            }

            // var mydate = new Date("May 19, 2022 GMT-0500");
            // const m = mydate.toISOString().split('T')[0];
            // sails.log(mydate.toISOString().split('T')[0]);
            // inputs.propertyYear = moment(inputs.propertyYear)
            // .utc()
            // .toISOString("YYYY-MM-DD");
            let property_images = inputs.property_images; //['1', '2', '3']

            const [propertyList] = await sails.models.propertylisting.update({
                id: check_property[0].id
            }).set({
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
                property_id: inputs.propertyId,
                property_year_built: inputs.propertyYear
            }).fetch();
            if (property_images && property_images.length > 0) {
                await sails.models.propertyimages.destroy({ property_id: propertyList.id });
                await sails.models.propertyimages.createEach(property_images.map(e => { return { path: e, property_id: propertyList.id, is_thumbnail: 0 }; }));

            }

            return { status: true, message: "Successfull", data: propertyList }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
