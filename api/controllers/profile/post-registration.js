const User = require("../../models/User");

module.exports = {


  friendlyName: 'Post registration',


  description: '',


  inputs: {
    user:{
      type:'ref'
    },
    userId: {
      type: 'number',
      unique:true,
      required:true
    },
    agencyName:{
      type:"string",
      required:true
    },
    bio :{
      type:"string"
    },
    location: {
      type:"string"
    },
    latitude: {
      type: "number"
    },
    longitude: {
      type:"number"
    },
    availabilityFrom : {
      type: "string"
    },
    availabilityTo : {
      type: "string"
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    try {
      sails.log("Calling profile/post-registration");
      const check = await sails.models.user.find({
        user_id : inputs.userId
      });

      if(check.length > 0)
      {
        return {
          status:false,
          message:"User already exists.",
          data:{}
        }
      }


      const postregistration = await sails.models.user.create({
        user_id : inputs.userId,
        agency_name : inputs.agencyName,
        bio : inputs.bio , 
        location : inputs.location,
        latitude : inputs.latitude ,
        longitude : inputs.longitude , 
        availability_from : inputs.availabilityFrom , 
        availability_to : inputs.availabilityTo
      }).fetch();

       return {status:true,message:"Successfull" ,data:postregistration}
    } catch (error) {
      return {status:false,message:error.message ,data:{}}
    }

  }


};
