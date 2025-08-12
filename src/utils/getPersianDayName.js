import moment from 'moment-jalaali';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

const pesrianDayName = (date) => {
    return date.format('dddd');
} 


export {pesrianDayName}