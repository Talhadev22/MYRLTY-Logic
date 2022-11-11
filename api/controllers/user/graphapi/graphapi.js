const moment = require('moment');

module.exports = {


    friendlyName: 'Graph Api',


    description: '',


    inputs: {
      user: {
        type:"ref"
      }
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling graphapi/graphpi");
        let propertiesPromise = [];
        let soldPropertiesPromise = [];
        let propertySellerPromise = [];

        var check = await sails.models.user.findOne({
            user_id: inputs.user.id,
            //property_id: inputs.property_id,
          })


        if(!check){



            return { status: false, message: "User not found", data: {}}
        }
        let properties = 0
           for (var i = 0; i <= 11; i++) {
            const monthIndex = i+1;
                const dateRange = { '>':  moment().month(monthIndex).startOf('month').utc().toISOString("YYYY-MM-DD"), '<':  moment().month(monthIndex).endOf('month').utc().toISOString("YYYY-MM-DD")};
              //  sails.log.debug('dateRange',dateRange)
              
                properties =  sails.models.propertylisting.find({
                user_id:check.id,
                created_at: dateRange,
                deleted_at: null
            }).populate('buyer').populate('seller');
         
            propertiesPromise.push(properties)
           }
          const a = await Promise.all(propertiesPromise)




const repArray = []
           for (var i = 0; i <= 11; i++) {
            const _properties = a[i];
                const totalProperties = _properties.length;
                let soldProperties = 0;
                let buyer = 0;
                let seller = 0;
                if(totalProperties > 0){
                    buyer = _properties.filter(e => e.buyer.length > 0).length
                    soldProperties = _properties.filter(e => e.is_sold == 1).length
                    seller = _properties.filter(e => e.seller.length > 0).length
                }
            repArray.push({
                totalProperties,
                soldProperties,
                buyer,
                seller,
            })
           }

         
            return { status: true, message: "Successfull", data: repArray}

        } catch (error) {
            return { status: false, message: error.message, data: {} }

        }
    }


};
