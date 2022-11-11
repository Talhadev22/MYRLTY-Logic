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
            sails.log.debug(inputs)
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
                const getallsellerby = await sails.models.propertylisting.find({
                    user_id: check[0].id,  
                    deleted_at: null,
                    is_sold: 1
                }).populate('seller', {where:{seller_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const sellers = []
                for(let i = 0 ; i< getallsellerby.length; i++){
                    sellers.push(getallsellerby[i]['seller'][0]);
                }

                return { status: true, message: 'successfull', data: sellers }

            }else if( inputs.filter == 'unsold')
            {
                const getallsellerbyland = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    //property_type_id: 2,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 0
                }).populate('seller', {where:{seller_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const sellers = []
                for(let i = 0 ; i< getallsellerbyland.length; i++){
                    sellers.push(getallsellerbyland[i]['seller'][0]);
                }

                return { status: true, message: 'successfull', data: sellers }
            }else if( inputs.filter == 1)
            {
                const getallsellerbyland = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    property_type_id: 1,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('seller', {where:{seller_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const sellers = []
                for(let i = 0 ; i< getallsellerbyland.length; i++){
                    sellers.push(getallsellerbyland[i]['seller'][0]);
                }

                return { status: true, message: 'successfull', data: sellers }
            }else if( inputs.filter == 2)
            {
                const getallsellerbyland = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    property_type_id: 2,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('seller', {where:{seller_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const sellers = []
                for(let i = 0 ; i< getallsellerbyland.length; i++){
                    sellers.push(getallsellerbyland[i]['seller'][0]);
                }

                return { status: true, message: 'successfull', data: sellers }
            }else if( inputs.filter == 3)
            {
                const getallsellerbyloc = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    property_type_id: 3,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('seller', {where:{seller_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const sellers = []
                for(let i = 0 ; i< getallsellerbyloc.length; i++){
                    sellers.push(getallsellerbyloc[i]['seller'][0]);
                }

                return { status: true, message: 'successfull', data: sellers }
            }else if( inputs.filter == 'location')
            {
                const getallsellerbyloc = await sails.models.propertylisting.find({
                    user_id: check[0].id,
                    //address: {contains:inputs.keyword},  
                    deleted_at: null,
                    is_sold: 1
                }).populate('seller', {where:{address: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const sellers = []
                for(let i = 0 ; i< getallsellerbyloc.length; i++){
                    sellers.push(getallsellerbyloc[i]['seller'][0]);
                }

                return { status: true, message: 'successfull', data: sellers }
        
            }else{
                const getallsellerby = await sails.models.propertylisting.find({
                    user_id: check[0].id,  
                    deleted_at: null,
                    is_sold: 1
                }).populate('seller', {where:{seller_name: {contains:inputs.keyword},deleted_at: null}}).limit(inputs.limit).skip(inputs.offset).sort('id desc');

                const sellers = []
                for(let i = 0 ; i< getallsellerby.length; i++){
                    sellers.push(getallsellerby[i]['seller'][0]);
                }

                return { status: true, message: 'successfull', data: sellers }
        
            
            }
        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
