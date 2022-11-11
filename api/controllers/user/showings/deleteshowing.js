const moment = require('moment');
module.exports = {


    friendlyName: 'delete showing',


    description: 'delete showing ',


    inputs: {
        showing_id: {
            type: 'number',
            required: true
        },
        user: {
            type: 'ref',
            //required: true
        }


    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log('Calling showing/deleteshowing.js');
            const check = await sails.models.user.find({
                user_id: inputs.user.id
            });

            if (check.length < 1) {
                throw new Error('Profile is not updated.');
            }
            // const showing = await PropertyShowing.findByUser(check[0].id, { id: inputs.showing_id });
            var deleteShowing = await PropertyShowing.updateOne({ id: inputs.showing_id })
                .set({
                    deleted_at: moment().format('YYYY-MM-DD hh:mm:ss')
                }).fetch();
            const deleteNotifications = await Notifications.update({ showing_id: inputs.showing_id })
            .set({
                deleted_at: moment().format('YYYY-MM-DD hh:mm:ss')
            });
            if (deleteShowing) {
                sails.log('Showing deleted.');
            }
            else {
                sails.log('Showing not deleted.');
            }
            return { status: true, message: 'Successfull', data: deleteShowing };



        } catch (error) {
            sails.log('Error showing/deleteshowing.js', error);

            return { status: false, message: error.message, data: {} };
        }
    }


};
