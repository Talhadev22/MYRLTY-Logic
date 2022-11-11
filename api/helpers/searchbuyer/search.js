const axios = require('axios')
module.exports = {


  friendlyName: 'buyer search',


  description: '',


  inputs: {
    getallproperty: {
      type: 'ref',
      
    },
    keyword: {
      type: 'string',
      
    },
    
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try{
      var sold_id = [];  
    for (let i = 0; i < inputs.getallproperty.length; i++) {
      const getallbuyer = await sails.models.propertybuyer.find({
          property_id: inputs.getallproperty[i]['id'],
          buyer_name: {contains:inputs.keyword},
          
      }).sort('id DESC')
      getallbuyer.forEach(myFunction);
      function myFunction(item, index) {
          if(item != ''){ 
              sold_id.push(item);
          }
           
        }
      
    }
    return sold_id;
  }catch(e){
    sails.log.debug()
    return ;
  }
  }


};

