module.exports = {


  friendlyName: 'List',


  description: 'List users.',


  inputs: {
    sort: {
      type: 'string'
    },
    range: {
      type: 'string',
    },
    filter: {
      type: 'string'
    }
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
    sails.log.debug('calling admin/users/list.js');
    // const res = this.res;
    // res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    // const users = await User.find();
    // res.setHeader(
    //   'X-Total-Count', users.length
    // );
    // return res.json(users);



    try {
      const findOptions = await sails.helpers.getOptions.with({ searchFrom: ['agency_name'], ...inputs });
      const userLogic = await User.find(findOptions).populate('subscription_id');
      const userAuth = await UserAuth.find({ id: { in: userLogic.map(e => e.user_id) } });
      const data = [];
      for (let i = 0; i < userLogic.length; i++) {
        const u = userLogic[i];
        const authU = userAuth.find(e => e.id == u.user_id);

        const default123 = {
          id: 0,
          username: "",
          email: "",
          name: "",
          image: "",
          phone: "",
          otp: "",
          forgetPasswordToken: "",
          subscription_id: "",
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


        data.push({ ...default123, ...authU, ...u });

      }
      // findOptions.where = { admin: 0, ...findOptions.where };
      const count = await User.count({deleted_at:null});
      return exits.adminResponse({ data: { data: data }, options: { routeName: 'users', range: JSON.parse(inputs.range), count: count } });
    } catch (e) {
      sails.log.error('error: admin/users/list.js', e);
      return exits.invalid({ status: false, data: [], message: 'Error user list ' });
    }
  }


};
