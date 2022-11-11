module.exports = {


    friendlyName: 'edit showing',


    description: 'edit showing',


    inputs: {
        user: {
            type: 'ref'
        },
        name: {
            type: 'string',
        },
        address: {
            type: 'string',
        },
        date: {
            type: 'string',
        },
        start_time: {
            type: 'string'
        },
        end_time: {
            type: 'string'
        },
        description: {
            type: 'string',
        },
        showing_id: {
            type: 'number',
            required: true
        }


    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log('Calling showing/editshowing.js');
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });


            if (check.length < 1) {
                throw new Error('Profile is not updated.');
            }
            const showingData = await PropertyShowing.findByUser(check[0].id, { id: inputs.showing_id });
            if (showingData.length < 1) {
                throw new Error('You can not edit this showing.');
            }

            const prepareData = { user: check[0], ...showingData[0], ...inputs };
            const formattedTimeSlotPayload = await sails.helpers.showings.validate.with({ ...prepareData });
            const matchedColumns = {
                name: inputs.name || showingData[0].name,
                address: inputs.address || showingData[0].address,
                start_time: formattedTimeSlotPayload.start_time.format('HH:mm'),
                end_time: formattedTimeSlotPayload.end_time.format('HH:mm'),
                date: formattedTimeSlotPayload.date,
                description: inputs.description || showingData[0].description,

            };
            const propertyList = await sails.models.propertyshowing.updateOne({ user_id: check[0].id, id: inputs.showing_id }).set(matchedColumns).fetch();
            return { status: true, message: 'Successfull', data: propertyList };



        } catch (error) {
            sails.log('Error showing/editshowing.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
