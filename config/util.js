const Moment = require('moment');
const { extendMoment } = require('moment-range');
const moment = extendMoment(Moment);
/**
 * @typedef {import('moment').Moment} moment
 */

/**
 * @typedef {Object} timeSlotPayload
 * @property {moment} date
 * @property {moment} start_time
 * @property {moment} end_time
 */

/**
 *
 * @param {moment} startTime
 * @param {moment} endTime
 * @param {number} step
 * @returns
 */
const getSlotsInBetween = (startTime, endTime, step = 15) => {
    const day = moment.range(startTime, endTime);
    const timeSlots = Array.from(day.by('minutes', { step }));
    const slotsArr = timeSlots.map(a => a.format('HH:mm'));
    return slotsArr;
};

/**
 *
 * @param {timeSlotPayload} payload
 * @param {timeSlotPayload[]} data
 * @returns
 */
const isTimeSlotOccupied = (payload, data) => {
    // const selectedDateData = data.filter(
    //     (obj) => {
    //         obj.date.includes(payload.date)
    //     });
    const getTime = (time) => moment(time).format('HH:mm');
    return data.some(obj => {
        const pst = getTime(payload.start_time);
        const pet = getTime(payload.end_time);
        const slots = getSlotsInBetween(moment(obj.start_time, 'HH:mm:ss'), moment(obj.end_time, 'HH:mm:ss'));
        if (pst === slots[slots.length - 1]) { return true; }
        if (slots.some(a => a === pst || a === pet)) { return true; }
        // return true;
    });
};


/**
 * 
 * @param {timeSlotPayload} payload 
 */
const formatTimeSlotPayload = (payload) => {
    const _payload = { ...payload };
    _payload.date = moment(payload.date).format('YYYY-MM-DD');
    _payload.start_time = moment(payload.start_time, 'HH:mm:ss');
    _payload.end_time = moment(payload.end_time, 'HH:mm:ss');
    return _payload;
}


exports.util_helpers = {
    isTimeSlotOccupied,
    formatTimeSlotPayload
};
