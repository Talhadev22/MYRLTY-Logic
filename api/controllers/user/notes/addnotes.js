const viableUtils = require("viable-utils");
const moment = require("moment");


module.exports = {


    friendlyName: 'add notes',


    description: 'add notes for properties',


    inputs: {
        user: {
            type: 'ref'
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
            sails.log("Calling addnotes/addnotes.js");
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
            const propertyListCount = await sails.models.propertynotes.find({property_id:propertycheck[0].id});
            if(propertyListCount.length >= 10){
                return {
                    status: false,
                    message: "Your can not add more than 10 notes",
                    data: {}
                }
            }
            const matchedColumns = {
                property_id: propertycheck[0].id,
                description: inputs.description,
                
            }
            const propertyList = await sails.models.propertynotes.create(matchedColumns).fetch();


            return { status: true, message: "Successfull", data: propertyList }

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
