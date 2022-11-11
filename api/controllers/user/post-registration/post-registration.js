
module.exports = {


  friendlyName: 'Post registration',


  description: '',


  inputs: {
    user: {
      type: 'ref',
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
    preferences: {
      type: "string"
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    try {
      sails.log("Calling user/post-registration/post-registration");
      // const check = await sails.models.user.find({
      //   user_id : inputs.user.id
      // });
      // sails.log(inputs , "user")

      // if(check.length > 0)
      // {
      //   return {
      //     status:false,
      //     message:"User already exists.",
      //     data:{}
      //   }
      // }


      const authUser = await sails.models.userauth.findOne({id: inputs.user.id});

      const postregistration = await sails.models.user.create({
        user_id: inputs.user.id,
        agency_name: inputs.agencyName,
        bio: inputs.bio,
        location: inputs.location,
        latitude: inputs.latitude,
        longitude: inputs.longitude,
        availability_from: inputs.availabilityFrom,
        availability_to: inputs.availabilityTo,
        preferences: inputs.preferences,
        full_name: inputs.user.name
      }).fetch();
      const create_customer = await sails.helpers.stripe.customers.create(inputs.user.id,authUser.email,postregistration.phone,postregistration.agency_name)
      await sails.models.user.updateOne({
      user_id: inputs.user.id
      }).set({
        stripe_customer_id:create_customer.customer.id
      })
      return { status: true, message: "Successfull", data: postregistration }
    } catch (error) {
      return { status: false, message: error.message, data: {} }
    }

  }


};
