const moment= require("moment");
module.exports = {


    friendlyName: 'Deleting user',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        id: {
            type: 'number'
        },
        
    },


    exits: {

        adminResponse: {
            responseType: 'adminResponse'
          },
          invalid: {
            responseType: 'badRequest',
          },

    },


    fn: async function (inputs) {
        try {
            const deletedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            sails.log("Calling delete-property/deleteproperty");
            const getuser = await sails.models.user.find({
                id: inputs.id,
                //deleted_at: null,
            
                
            });
            if (getuser.length < 1) {
                return {
                    status: false,
                    message: "User not found",
                    data: {}
                }
            }

            const userDelete = await sails.models.user.updateOne({
                id: inputs.id,
            
            }).set({deleted_at: deletedAt}).fetch();

            const authUser = await sails.models.userauth.updateOne({
                id: userDelete.user_id,
            
            }).set({deletedAt: deletedAt});

            return exits.success({
                status: true,
                message: "user deleted successfully",
              });

        } catch (error) {
            return { status: false, message: error.message, data: {} }
        }
    }


};
