/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 const { generateEncryptedPassword } = require('../util');

 module.exports = {
     datastore: 'mongo',
     tableName: 'sendemails',
     attributes: {
         id: { type: 'string', columnName: '_id' },
         type: {
             type: 'string',
         },
         email: {
             type: 'string',
             required: true,
            // isEmail: true,
         },
         is_send: {
            type: 'number',
            
        },

         
     },
 
     // customToJSON: function () {
     //     return _.omit(this, ['otp', 'deletedAt', 'forgetPasswordToken']);
     // },
 
     // createWith: async function (opt) {
     //     opt.createdAt = (new Date()).getTime();
 
     //     const user = await User.create(opt).fetch();
 
     //     return user;
     // },
 
     // beforeCreate: async function (user, cb) {
     //     sails.log.debug('calling beforeCreate user');
     //     let userData = await User.getOne({ email: user.email });
     //     if (userData) {
     //         sails.log.error('error user already exists');
     //         return cb('email already exists');
     //     }
     //     if (user.password) {
     //         try {
     //             user.password = user.parentId ? user.password : await generateEncryptedPassword(user.password);
     //             return cb();
     //         } catch (e) {
     //             sails.log.error('error hashing password', e);
     //             throw new Error('Error: Cannot hash password.');
     //         }
     //     } else {
     //         return cb();
 
     //     }
     // },
     // getOne: async function (opt) {
     //     sails.log.debug('opt', opt);
     //     const _user = await User.findOne({ ...opt, deletedAt: null });
     //     if (_user) {
     //         _user.hasPassword = false;
     //         if (_user.password) {
     //             _user.hasPassword = true;
 
     //         }
     //         if (_user.parentId) {
     //             const _parentuser = await User.findOne({ id: _user.parentId, deletedAt: null });
     //             _user['parent_name'] = _parentuser.name;
     //         }
     //     }
 
 
     //     return _user;
 //    }
 };
 