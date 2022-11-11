const { isTimeSlotOccupied, formatTimeSlotPayload } = require('../../../config/util').util_helpers;

module.exports = {


  friendlyName: 'Validate',


  description: 'Validate showings.',


  inputs: {
    user: {
      type: 'ref'
    },

    date: {
      type: 'string',
      required: true
    },
    start_time: {
      type: 'string'
    },
    end_time: {
      type: 'string'
    },

    showing_id: {
      type: 'number',
      defaultsTo: 0
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log.debug('calling helpers/showings/validate');





    const formattedTimeSlotPayload = formatTimeSlotPayload(inputs);
    formattedTimeSlotPayload.user = inputs.user.id;
    const check = await sails.models.user.find({user_id: inputs.user.id})
    

    const get_sohwings = await sails.models.propertyshowing.find({user_id: check[0].id, date:inputs.date,deleted_at:null  })
    if(get_sohwings.length >= 10){
      throw new Error('Cannot create more than 10 showings per day');

    }
    if (formattedTimeSlotPayload.end_time.diff(formattedTimeSlotPayload.start_time, 'minutes') < 0) {
      throw new Error('End time should not be greater then start time.');
    }

    const showingCondition = {
      date: formattedTimeSlotPayload.date
    }
    if (inputs.showing_id > 0) {
      showingCondition.id = { '!=': inputs.showing_id };
    }
    const showings = await PropertyShowing.findByUser(check[0].id, showingCondition);
    let isSlotAvailable = true;
    if (showings.length > 0) {

      isSlotAvailable = !isTimeSlotOccupied(
        formattedTimeSlotPayload,
        showings
      );
    }

    if (!isSlotAvailable) {
      throw new Error('The slot is already booked, please select a different time.');
    }
    return formattedTimeSlotPayload;
  }


};

