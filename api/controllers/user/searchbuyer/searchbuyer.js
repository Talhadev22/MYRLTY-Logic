module.exports = {


    friendlyName: 'Get Listing Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        limit: {
            type: 'number',
            defaultsTo: 3
          },
          offset: {
            type: 'number',
            defaultsTo: 0
          },
          keyword:{
            type:'string'
          },
          filter:{
            type:'string'
          }

    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling propertysearch/propertysearch");

            const check = await sails.models.user.find({
                user_id: inputs.user.id,
                
            });
            if (check.length < 1) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }
            if( inputs.filter == 'sold')
            {
            const getallproperty = await sails.models.propertylisting.find({
                user_id: check[0].id,
                is_sold: 1,
                deleted_at: null
            }).sort('id DESC')
            const buyer_data_sold = await sails.helpers.searchbuyer.search.with({'getallproperty':getallproperty,'keyword':inputs.keyword})
            if(buyer_data_sold.length > 0){
                return { status: true, message: 'successfull', data: buyer_data_sold }
    

            }else{
                return { status: true, data: {} }
            }
            }else if( inputs.filter == 'unsold')
            {
            const getallproperty = await sails.models.propertylisting.find({
                user_id: check[0].id,
                is_sold: 0,
                deleted_at: null
            }).sort('id DESC')
            const buyer_data_unsold = await sails.helpers.searchbuyer.search.with({'getallproperty':getallproperty,'keyword':inputs.keyword})
            if(buyer_data_unsold.length > 0){
                return { status: true, message: 'successfull', data: buyer_data_unsold }
    

            }else{
                return { status: true, data: {} }
            }
            }else if( inputs.filter == 1)
            {
                const getallsellerbyland = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    property_type_id: 1,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('buyer', {where:{buyer_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const buyers = []
                for(let i = 0 ; i< getallsellerbyland.length; i++){
                    buyers.push(getallsellerbyland[i]['buyer'][0]);
                }

                return { status: true, message: 'successfull', data: buyers }
            }else if( inputs.filter == 2)
            {
                const getallsellerbyland = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    property_type_id: 2,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('buyer', {where:{buyer_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const buyers = []
                for(let i = 0 ; i< getallsellerbyland.length; i++){
                    buyers.push(getallsellerbyland[i]['buyer'][0]);
                }

                return { status: true, message: 'successfull', data: buyers }
            }else if( inputs.filter == 3)
            {
                const getallsellerbyland = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    property_type_id: 3,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('buyer', {where:{buyer_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const buyers = []
                for(let i = 0 ; i< getallsellerbyland.length; i++){
                    buyers.push(getallsellerbyland[i]['buyer'][0]);
                }

                return { status: true, message: 'successfull', data: buyers }
            }
            else if( inputs.filter == 'location')
            {
                const getallsellerbyland = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('buyer', {where:{address: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const buyers = []
                for(let i = 0 ; i< getallsellerbyland.length; i++){
                    buyers.push(getallsellerbyland[i]['buyer'][0]);
                }

                return { status: true, message: 'successfull', data: buyers }
            }
            //getting all properties without filter, (default properties to show on first time)
            else
            {
                const getallpropertyby = await sails.models.propertylisting.find({
                    user_id: check[0].id,  
                    deleted_at: null,
                    is_sold: 1
                }).populate('buyer', {where:{buyer_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const buyers = []
                for(let i = 0 ; i< getallpropertyby.length; i++){
                    buyers.push(getallpropertyby[i]['buyer'][0]);
                }

                return { status: true, message: 'successfull', data: buyers }
        
            
            }
        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
