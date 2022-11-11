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
            type:"string"
        },
        type:{
            type:'string',
            isIn: ['xls','csv']
           }
        


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
            //const startOfMonth = moment().startOf('month').utc().toISOString("YYYY-MM-DD");
            //const endOfMonth   = moment().endOf('month').utc().toISOString("YYYY-MM-DD");
            
            // const startOfLastMonth = moment().subtract(1,'months').startOf('month').utc().toISOString("YYYY-MM-DD");
            // const endOfLastMonth = moment().subtract(1,'months').endOf('month').utc().toISOString("YYYY-MM-DD");
            
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
            }).populate('buyer').populate('seller').sort('id desc');
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
                        agent_name:inputs.user.name,
                        seller_name:seller_name,
                        buyer_name:buyer_name,
                        property_title:e.property_title,
                        total_cost:purchase_amount,
                        registered_agents:getAllAgents,
                    }
                }
                
            });
            const result = modifiedArr.filter(element => {
                return element !== undefined;
              });
                
                const _csv = Papa.unparse(result);
               if(inputs.type == 'csv'){
                res.setHeader('Content-disposition', 'attachment; filename=data.csv');
                //res.setHeader('Content-Type', `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`);
                res.set('Content-Type', 'text/csv');
                res.status(200).send(_csv);

               }else{
                res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
                res.setHeader('Content-Type', `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`);
                //res.set('Content-Type', 'text/csv');
                res.status(200).send(_csv);

               }
                
              //  this.res.attachment('ddata.xlsx');
               // var downloading = await sails.startDownload(_csv);
        
            
          
           // return { status: true, message: "successfull", data: modifiedArr }

             


        } catch (error) {
            sails.log('Error showing/addshowing.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
