module.exports = {


  friendlyName: 'Delete file from aws bucket',


  description: '',


  inputs: {
    file_name: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function(inputs, exits) {
    //console.log("folder:",inputs.folder);

    const AWS = require('aws-sdk');
    const s3Bucket = new AWS.S3( { params: {Bucket: sails.config.AWS.BUCKET} } );

    // var key = inputs.file_name;
    // if(inputs.folder)
    // {
    //   key = inputs.folder+'/'+key;
    // }
    const params = {
      Key: inputs.file_name
    };

    s3Bucket.deleteObject(params, (err, data) => {
      if (err) {return exits.success(err);}  // error
      else     {return exits.success(true);}                 // deleted
    });

  }

};

