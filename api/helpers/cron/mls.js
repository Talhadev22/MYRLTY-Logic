module.exports = {


    friendlyName: 'Mls',
  
  
    description: 'Mls something.',
  
  
    fn: async function () {
  
      sails.log('Running custom shell script... (`sails run mls`)');
  
      const inputs = {
        limit: 1000,
        offset: 0
      }
      try {
  
        const { arr: mls, arrIMG: getimg } = await sails.helpers.mls.get(inputs);
        const pro = await MLSProperties.find();
        if (pro.length > 0) {
          await MLSProperties.destroy({});
          await MLSPropertiesImages.destroy({});
        }
        // let getimg = []
        mls.map((d) => {
  
  
          delete d.images
        });
        // console.log(arrIMG);
        // return;
        await MLSProperties.createEach(mls)
        const ajb = [];
        for (let i = 0; i < getimg.length; i++) {
  
          ajb.push(MLSPropertiesImages.create(getimg[i]));
        }
        await Promise.all(ajb);
        sails.log("MLS PROPERTY DONE")
  
      } catch (error) {
        sails.log("Error", error.message)
      }
    }
  
  
  };
  
  