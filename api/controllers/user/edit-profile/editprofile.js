module.exports = {


    friendlyName: 'Post registration',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        agencyName: {
            type: "string",
            required: true
        },
        bio: {
            type: "string"
        },
        location: {
            type: "string"
        },
        latitude: {
            type: "number"
        },
        longitude: {
            type: "number"
        },
        availabilityFrom: {
            type: "string"
        },
        availabilityTo: {
            type: "string"
        },
        name: {
            type: "string"
        },
        profile_image: {
            type: 'ref'
        },
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log("Calling edit-profile/editprofile");
            const check = await sails.models.user.findOne({
                user_id: inputs.user.id
            });
            // sails.log.debug('token data')
            // sails.log.debug(check)

            if (!check) {
                return {
                    status: false,
                    message: "No such user found",
                    data: {}
                }
            }

            // const { status, data, headers } = await sails.helpers.request.with({
            //     req: this.req,  
            //     type: 'PUT',
            //     server: 'AUTH',
            //     endpoint: 'users/'+inputs.user.id,
            //     params: inputs
            // });
            // this.res.set(headers);
            // [exitsName, responseData] = await sails.helpers.response.with({
            //     status: status,
            //     data: data,
            // });

            // sails.log(responseData , "responsedata");

            // Auth Server Name Change
            const matchedColumns = {
                user_id: inputs.user.id,
                agency_name: inputs.agencyName,
                bio: inputs.bio,
                location: inputs.location,
                latitude: inputs.latitude,
                longitude: inputs.longitude,
                availability_from: inputs.availabilityFrom,
                availability_to: inputs.availabilityTo,
                full_name: inputs.name,
                profile_image: inputs.profile_image,
            }
            const postregistration = await sails.models.user.updateOne({
                user_id: inputs.user.id,
                // deleted_at: null
            }).set(matchedColumns);
            if (!postregistration) {
                sails.log.debug('postregistration', postregistration);
                throw new Error('Invalid user');
            }

            // if (property_images && property_images.length > 0) {
            //     const profileImages = await sails.models.user.createEach(profile_image.map(e => { return { path: e, property_id: propertyList.id, is_thumbnail: 0 }; }));

            // }


            return { status: true, message: 'Successfull', data: postregistration };

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
