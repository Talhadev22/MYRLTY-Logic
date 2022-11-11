
const moment= require("moment");

module.exports = {


  friendlyName: 'List',


  description: 'List users.',


  inputs: {
    id: {
      type: "string",
      required: true,
    },
    full_name:{
    required:true,
    type:'string'
    },
    agency_name:{
      required:true,
      type:'string'
    },
    phone:{
      required:true,
      type:'string'
    },
    location:{
      required:true,
      type:'string'
    },
    availability_from:{
      required:true,
      type:'string'
    },
    availability_to:{
      required:true,
      type:'string'
    },
    bio:{
      required:true,
      type:'string'
    },
    profile_image:{
      //required:true,
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
   //  const FromUtc = moment.local(`2022-10-25 ${inputs.availability_from}`).utc();
   //  const TOUtc = moment.local(`2022-10-25 ${inputs.availability_to}`).utc();
   
   var newDateObj = new Date();

   var dateOnly = moment(newDateObj).format("YYYY-MM-DD");
  
   const start = inputs.availability_from;
   const end = inputs.availability_to;
   const from = moment(`${dateOnly} ${start}`).utc().format('hh:mm:ss');
   const to = moment(`${dateOnly} ${end}`).utc().format('hh:mm:ss');
  
     const obj = {
        full_name:inputs.full_name,
        agency_name:inputs.agency_name,
        location:inputs.location,
        availability_from:from,
        availability_to:to,
        bio:inputs.bio,
        profile_image:inputs.profile_image
      };

      const authObj = {
        name:inputs.full_name,
        phone:inputs.phone
      };
      const logicUser = await User.updateOne({id: inputs.id}).set(obj).fetch();
      const authUser = await UserAuth.updateOne({id: logicUser.user_id}).set(authObj).fetch();

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
      sails.log.error('error: admin/users/update.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error user update ' });
    }
  }


};
