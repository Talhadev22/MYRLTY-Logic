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
        keyword: {
            type: 'string'
        },
        filter: {
            type: 'string'
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
            if (inputs.filter == 'location') {
                let location = await sails.models.propertylisting.find({
                    property_address: { contains: inputs.keyword },
                    user_id: check[0].id,
                    deleted_at: null
                    //  is_sold: 0,

                }).populate('seller').populate('buyer').populate('images').populate('notes',{deleted_at: null}).limit(inputs.limit).skip(inputs.offset).sort('id DESC');
                if (location.length > 0) {
                    return { status: true, message: "successfull", data: location }

                } else {
                    return { status: true, data: {} }
                }
            } else if (inputs.filter == 'unsold') {
                sails.log.debug(inputs.filter)
                let unsold = await sails.models.propertylisting.find({
                    property_title: { contains: inputs.keyword },
                    user_id: check[0].id,
                    is_sold: 0,
                    deleted_at: null

                }).populate('seller').populate('buyer').populate('images').populate('notes',{deleted_at: null}).limit(inputs.limit).skip(inputs.offset).sort('id DESC');
                if (unsold.length > 0) {
                    return { status: true, message: "successfull", data: unsold }

                } else {
                    return { status: true, data: {} }
                }
            } else if (inputs.filter == 'sold') {
                sails.log.debug(inputs.filter)
                let sold = await sails.models.propertylisting.find({
                    property_title: { contains: inputs.keyword },
                    user_id: check[0].id,
                    is_sold: 1,
                    deleted_at: null
                }).populate('seller').populate('buyer').populate('images').populate('notes',{deleted_at: null}).limit(inputs.limit).skip(inputs.offset).sort('id DESC');
                sails.log.debug(sold)
                if (sold.length > 0) {
                    return { status: true, message: "successfull", data: sold }

                } else {
                    return { status: true, data: {} }
                }
            } else if (inputs.filter == 1) {
                let commercial = await sails.models.propertylisting.find({
                    property_title: { contains: inputs.keyword },
                    property_type_id: 1,
                    user_id: check[0].id,
                    deleted_at: null
                }).populate('seller').populate('buyer').populate('images').populate('notes',{deleted_at: null}).limit(inputs.limit).skip(inputs.offset).sort('id DESC');
                if (commercial.length > 0) {
                    return { status: true, message: "successfull", data: commercial }

                } else {
                    return { status: true, data: {} }
                }
            } else if (inputs.filter == 2) {
                let residential = await sails.models.propertylisting.find({
                    property_title: { contains: inputs.keyword },
                    property_type_id: 2,
                    user_id: check[0].id,
                    deleted_at: null
                }).populate('seller').populate('buyer').populate('images').populate('notes',{deleted_at: null}).limit(inputs.limit).skip(inputs.offset).sort('id DESC');
                if (residential.length > 0) {
                    return { status: true, message: "successfull", data: residential }

                } else {
                    return { status: true, data: {} }
                }
            } else if (inputs.filter == 3) {
                let land = await sails.models.propertylisting.find({
                    property_title: { contains: inputs.keyword },
                    property_type_id: 3,
                    user_id: check[0].id,
                    deleted_at: null
                }).populate('seller').populate('buyer').populate('images').populate('notes',{deleted_at: null}).limit(inputs.limit).skip(inputs.offset).sort('id DESC');
                if (land.length > 0) {
                    return { status: true, message: "successfull", data: land }

                } else {
                    return { status: true, data: {} }
                }

            }
            else {
                let land = await sails.models.propertylisting.find({
                    property_title: { contains: inputs.keyword },
                    user_id: check[0].id,
                    deleted_at: null
                }).populate('seller').populate('buyer').populate('images').populate('notes',{deleted_at: null}).limit(inputs.limit).skip(inputs.offset).sort('id DESC');
                if (land.length > 0) {
                    return { status: true, message: "successfull", data: land }

                } else {
                    return { status: true, data: {}, message: '' }
                }

            }


        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
