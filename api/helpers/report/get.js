const moment = require('moment');
const express = require('express');
const Papa = require('papaparse');
const app = express()
const port = 3000

module.exports = {


    friendlyName: 'property counts',


    description: 'properties counts',


    inputs: {
        user: {
            type: 'ref'
        },
        
        year:{
            type:'string'
        },
        month:{
            type:'string'
        },
        check:{
            type:"string"
        },
        keyword:{
            type:"string"
        }

    },


    exits: {

    },


    fn: async function (inputs) {
        
        try {
            sails.log('Calling propertycounts/propertycounts.js');
            var month = inputs.month; // January
            var year = inputs.year;
            var start = new Date(year, month-1, 1);
            let start_time = start.toISOString();           
             var end = new Date(year, month, 0);
            let end_date = end.toISOString();
            let propertiesPromise = []
            
            var [buyer, seller] = await Promise.all([
              sails.models.propertybuyer.find({
                    //sold_at: { '>': start_time, '<': end_date },
                    //is_sold:1,
                    buyer_name: {contains:inputs.keyword},
                    user_id:inputs.check,
                    deleted_at: null
                }),
                 sails.models.propertyseller.find({
                    //sold_at: { '>': start_time, '<': end_date },
                    //is_sold:1,
                    seller_name: {contains:inputs.keyword},
                    user_id:inputs.check,
                    deleted_at: null
                })
               
            ], 
            )
            for(bu of buyer){
              propertiesPromise.push(bu)
            }
            for(se of seller){
              propertiesPromise.push(se)

            }
        
           const unique = [...new Set(propertiesPromise.map(item => item.property_id))];

           const property_list =  await sails.models.propertylisting.find({
                sold_at: { '>': start_time, '<': end_date },
                is_sold:1,
                user_id:inputs.check,
                deleted_at: null,
                id: {in :unique },
            }).populate('buyer').populate('seller')
         
            return property_list
        
        } catch (error) {
            sails.log('Error showing/addshowing.js', error);

            
        }
    }


};
