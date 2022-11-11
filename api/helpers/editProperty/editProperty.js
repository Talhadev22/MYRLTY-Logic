const viableUtils = require("viable-utils");


module.exports = {


    friendlyName: 'Listing Property',


    description: '',


    // inputs: {
    //     user: {
    //         type: 'ref'
    //     },
    //     propertyId: {
    //         type: "string"
    //     },
    //     listUserId: {
    //         type: "string"
    //     },
    //     propertyType: {
    //         type: "string"
    //     },
    //     propertyAddress: {
    //         type: "string"
    //     },
    //     propertyTitle: {
    //         type: "string"
    //     },
    //     propertyDescription: {
    //         type: "string"
    //     },
    //     propertyPrice: {
    //         type: "number"
    //     },
    //     propertyArea: {
    //         type: "number"
    //     },
    //     propertySquarefeet: {
    //         type: "string"
    //     },
    //     propertyYear: {
    //         type: "string"
    //     },
    //     latitude:{
    //       type :"string",
    //       columnType:"date"
    //     },
    //     longitude:{
    //       type :"number",
    //     }
    // },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling listing-property/listingproperty");
            
            var mydate = new Date("May 19, 2022 GMT-0500");
            const m = mydate.toISOString().split('T')[0];
            sails.log(mydate.toISOString().split('T')[0]);

            const propertyList = await sails.models.propertylisting.update({
                property_id: inputs.propertyId,
            }).set({
                user_id: inputs.user.id,
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
                property_year_built: m
            });

            return propertyList 
            //return { status: true, message: "Successfull", data: propertyList }

        } catch (error) {
           
            return error
            //return { status: false, message: error.message, data: {} }
        }
    }


};
