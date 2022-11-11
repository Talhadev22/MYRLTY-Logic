module.exports = {


    friendlyName: 'add showing',


    description: 'add showing for properties',


    inputs: {
        user: {
            type: 'ref'
        },
        name: {
            type: 'string',
            required: true
        },
        address: {
            type: 'string',
            required: true
        },
        date: {
            type: 'string',
            required: true
        },
        start_time: {
            type: 'string'
        },
        end_time: {
            type: 'string'
        },
        description: {
            type: 'string',
            required: true
        },
        // property_id:{
        //     type:"number",
        //     required:true
        // }


    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log('Calling addshowing/addshowing.js');
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });

            if (check.length < 1) {
                throw new Error('Profile is not updated.');
            }
            const formattedTimeSlotPayload = await sails.helpers.showings.validate.with({ user: check[0], ...inputs });
            const matchedColumns = {
                user_id: check[0].id,
                name: inputs.name,
                address: inputs.address,
                start_time: formattedTimeSlotPayload.start_time.format('HH:mm'),
                end_time: formattedTimeSlotPayload.end_time.format('HH:mm'),
                date: formattedTimeSlotPayload.date,
                description: inputs.description,

            };
            const propertyList = await sails.models.propertyshowing.create(matchedColumns).fetch();
            return { status: true, message: 'Successfull', data: propertyList };



        } catch (error) {
            sails.log('Error showing/addshowing.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
