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
        month: {
            type: 'string'
        },
        year: {
            type: 'string'
        },
        keyword:{
            type:'string'
        },
        limit: {
            type: 'number',
            defaultsTo: 3
          },
        offset: {
            type: 'number',
            defaultsTo: 0
        },
        


    },


    exits: {

    },


    fn: async function (inputs) {
        const res = this.res;
        try {
            sails.log('Calling propertycounts/propertycounts.js');
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });
            const getAllAgents = await sails.models.user.count();
            if (check.length < 1) {
                throw new Error('User not found');
            }
            
           // const getcurrentMonthReport = await sails.helpers.report.get.with({ year: inputs.year, month:inputs.month,check:check[0].id,keyword: inputs.keyword });
            
            sails.log('Calling report/get.js');
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
                    user_id:check[0].id,
                    deleted_at: null
                }),
                 sails.models.propertyseller.find({
                    //sold_at: { '>': start_time, '<': end_date },
                    //is_sold:1,
                    seller_name: {contains:inputs.keyword},
                    user_id:check[0].id,
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
                user_id:check[0].id,
                deleted_at: null,
                id: {in :unique },
            }).populate('buyer').populate('seller').limit(inputs.limit).skip(inputs.offset).sort('id desc');
            let seller_name;
            let buyer_name;
            let purchase_amount;
            let modifiedArr = property_list.map((e)=>{
                if((e.seller.length == 0)){
                    seller_name = 'seller not found'
                    purchase_amount = 'No Purchase amount'
                }else{
                    seller_name = e.seller[0].seller_name
                    purchase_amount = e.seller[0].amount_of_contract
                }
                if(e.buyer.length == 0){
                    buyer_name = 'buyer not found'
                }else{
                    buyer_name = e.buyer[0].buyer_name
                }

                if(e.seller.length != 0 && e.buyer.length != 0){
                    return {
                        id:e.id,
                        agent_name:inputs.user.name,
                        seller_name:seller_name,
                        buyer_name:buyer_name,
                        property_title:e.property_title,
                        total_cost:purchase_amount,
                        registered_agents:getAllAgents,
                        sold_at:e.sold_at 
                    }
                }
                
            });
            const result = modifiedArr.filter(element => {
                return element !== undefined;
              });
            
          
            return { status: true, message: "successfull", data: result }

             


        } catch (error) {
            sails.log('Error showing/addshowing.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
