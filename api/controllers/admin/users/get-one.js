module.exports = {


  friendlyName: 'List',


  description: 'List users.',


  inputs: {
    id:{
    required:true,
    type:'string'
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


  fn: async function (inputs, exits) {
    sails.log.debug('calling admin/users/get-one.js');
   


    try {
     // const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['name', 'email'], ...inputs });
      const logicUser = await User.findOne({id: inputs.id});
      const authUser = await sails.models.userauth.findOne({id: logicUser.user_id});
      const default123 = {
        id: 0,
        username: "",
        email: "",
        name: "",
        image: "",
        phone: "",
        otp: "",
        forgetPasswordToken: "",
        parentId: null,
        privacy: "public",
        isAdmin: 0,
        isBlocked: 0,
        deletedAt: null,
        updatedAt: null,
        createdAt: null,
        created_at: "",
        updated_at: "",
        user_id: "",
        agency_name: "",
        bio: "",
        location: "",
        latitude: 0,
        longitude: 0,
        availability_from: "",
        availability_to: "",
        device_token: null,
        preferences: "",
        full_name: "",
        profile_image: "",
        deleted_at: null,
        isNotificationAllowed: true
      };


      const data ={ ...default123, ...authUser, ...logicUser };
      return exits.success({ data: data });
    } catch (e) {
      sails.log.error('error: admin/users/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error user list ' });
    }
  }


};
