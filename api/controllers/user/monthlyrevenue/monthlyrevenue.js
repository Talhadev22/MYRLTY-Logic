const moment = require('moment');
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
            const startOfMonth = moment().startOf('month').utc().toISOString("YYYY-MM-DD");
            const endOfMonth   = moment().endOf('month').utc().toISOString("YYYY-MM-DD");
            
            const startOfLastMonth = moment().subtract(1,'months').startOf('month').utc().toISOString("YYYY-MM-DD");
            const endOfLastMonth = moment().subtract(1,'months').endOf('month').utc().toISOString("YYYY-MM-DD");
            
            const currentMonthSales = await sails.models.propertylisting.find({
                sold_at: { '>': startOfMonth, '<': endOfMonth },
                user_id:check[0].id,
                deleted_at: null
            }).populate('buyer').sort('sold_at DESC')
            const lastMonthSales = await sails.models.propertylisting.find({
                sold_at: { '>': startOfLastMonth, '<': endOfLastMonth },
                user_id:check[0].id,
                deleted_at: null
            }).populate('buyer').sort('sold_at DESC')
 
            const current_rev = []
            var current_sells = currentMonthSales.map(function(item){
                return item.buyer
            })
            var lgth = current_sells.length
            for (var i = 0; i <= lgth; i++) {
                if(!!current_sells[i]?.length){
                    current_rev.push(current_sells[i][0].amount_of_contract)
                }
                
                
           }
          
          
           const pre_mon_rev = []
            var preRev = lastMonthSales.map(function(item){
                return item.buyer
            })
            var lgth = preRev.length
            for (var i = 0; i <= lgth; i++) {
                if(!!preRev[i]?.length){
                    pre_mon_rev.push(preRev[i][0].amount_of_contract)
                }
                
                
           } 
           var current_month_rev = current_rev.reduce(function(a, b){
            return a + b;
           }, 0);
           var pre_month_rev = pre_mon_rev.reduce(function(a, b){
            return a + b;
           }, 0); 
           function isWhatPercentOf(numA, numB) {
            var total = numA + numB
            var crt_mnth_in_per = numA/total * 100
            var previous_mnth_in_per = numB/total * 100
            var result = crt_mnth_in_per - previous_mnth_in_per 
            return result
          }
          const diff = isWhatPercentOf(current_month_rev,pre_month_rev)
            data = {
                current_month_rev: current_month_rev,
                pre_month_rev: pre_month_rev,
                diff: diff,
                
                
            }
                return { status: true, message: "successfull", data: data }

             


        } catch (error) {
            sails.log('Error showing/addshowing.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
