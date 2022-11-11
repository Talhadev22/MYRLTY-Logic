
const aws =require('aws-sdk');
const crypto =require('crypto');
const  util =require('util');
const randomBytes = util.promisify(crypto.randomBytes);



const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


module.exports = {
  friendlyName: 'Upload file to aws bucket',

  description: '',

  inputs: {
    folder: {
      type: 'string',
      defaultsTo: ''
    },
    ext:{
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function ({folder,ext}, exits) {
    sails.log.debug('calling helpers/aws/sign');
    require('dotenv').config(); // Configure dotenv to load in the .env file
    const s3 = new aws.S3({
      region,
      accessKeyId,
      secretAccessKey,
      signatureVersion: 'v4'
    });

    const uploadURLs = [];

    ext = ext.split(',');

    for(let e=0; e<ext.length; e++){
      const rawBytes = await randomBytes(16);
      const imageName = rawBytes.toString('hex');
      const fileName = folder === '' ? imageName+'.'+ext[e]  : folder+'/'+imageName+'.'+ext[e];
      const params = ({
        Bucket: bucketName,
        Key: fileName,
        Expires: 120
      });
      const uploadURL = await s3.getSignedUrlPromise('putObject', params);
      uploadURLs.push(uploadURL);
    }

    return exits.success(uploadURLs);

  },
};
