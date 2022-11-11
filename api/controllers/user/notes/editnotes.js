const viableUtils = require("viable-utils");
const moment = require("moment");


module.exports = {


    friendlyName: 'edit notes',


    description: 'edit notes for properties',


    inputs: {
        user: {
            type: 'ref'
        },
        id:{
            type:"number",
            required:true
        },
        property_id:{
            type:"number",
            required:true
        },
        description:{
            type:"string",
            required:true
        }
       
        
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling addnotes/editnotes.js");
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });

            const propertycheck = await sails.models.propertylisting.find({
                user_id: check[0].id,
                property_id:inputs.property_id
            });
            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }

            if (propertycheck.length < 1) {
                return {
                    status: false,
                    message: "No such property found",
                    data: {}
                }
            }
            const matchedColumns = {
               // property_id: propertycheck[0].id,
                description: inputs.description,
                
            }
            const propertyList = await sails.models.propertynotes.updateOne({id: inputs.id}).set(matchedColumns).fetch();


            return { status: true, message: "Successfull", data: propertyList }

        } catch (error) {
            return { status: false, message: error.message, data: error.message }
        }
    }


};
