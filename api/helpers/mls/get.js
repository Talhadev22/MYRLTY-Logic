const axios = require("axios");
const moment = require('moment');
module.exports = {


    friendlyName: 'MLS Property Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        limit: {
            type: "number",
            defaultsTo: 10
        },
        offset: {
            type: "number",
            defaultsTo: 0
        }
    },


    exits: {

    },


    fn: async function (inputs) {
        try {
            sails.log('Calling mls/get2');
            const propTypes = await PropertyTypes.find();
            const config = {
                method: "GET",
                // url : "https://api.idxbroker.com/clients/featured/combinedActiveMLS?limit",
                // url: `https://api.idxbroker.com/clients/featured?limit=${inputs.limit}&offset=${inputs.offset}`,
                headers: {
                    accesskey: sails.config.MLS.ACCESS_KEY,
                    ancillarykey: sails.config.MLS.ANCILLARY_KEY,
                    outputtype: sails.config.MLS.OUTPUT_TYPE,
                    apiversion: sails.config.MLS.API_VERSION,
                }
            }
            let arr = [];
            let arrIMG = []
            let arrIMG2 = []
            let limit = 500;
            let offset = 0;
            const NO_CONTENT_CODE = 204;

            while (true) {
                config.url = `https://api.idxbroker.com/clients/featured?limit=${limit}&offset=${offset}`
                const data = await axios(config)
                if (data.status == NO_CONTENT_CODE) {
                    break;
                }

                const list = data.data;


                Object.keys(list).forEach(function (key, index) {
                    const propertyTypeId = propTypes.filter(e => [e.mls_category].includes(list[key].idxPropType))[0];

                    const obj = {
                        // seller : [],
                        // buyer : [],
                        images: list[key].image,
                        // notes : [],
                        // id: list[key].listingID,
                        user_id: '0',
                        property_type_id: propertyTypeId?.id || '1',
                        property_address: list[key].address,
                        property_title: "",
                        property_description: list[key].remarksConcat,
                        property_price: list[key].rntLsePrice,
                        property_area: list[key].streetName,
                        property_square_feet: list[key].sqFt,
                        property_year_built: moment().format('YYYY-MM-DD hh:mm:ss'),
                        latitude: list[key].latitude,
                        longitude: list[key].longitude,
                        is_favourite: "0",
                        is_sold: 0,
                        property_id: parseInt(list[key].listingID),

                    }

                    const keyImages = list[key].image;
                    Object.keys(keyImages).forEach(function (key2, index2) {
                        if (index2 < 4 && typeof keyImages[key2].url != 'undefined') {
                            const imgObj = {
                                img_property_id: list[key].listingID,
                                img_url: keyImages[key2].url
                            }

                            arrIMG.push(imgObj);
                        }
                    })

                    // console.log(list[key].listingID);
                    obj.images = { ...arrIMG };
                    arr.push(obj)
                });

                offset = offset + limit

            }
            return { arr, arrIMG };

        } catch (error) {
            sails.log.debug('error', error);
            throw new Error(error);
        }
    }


};
