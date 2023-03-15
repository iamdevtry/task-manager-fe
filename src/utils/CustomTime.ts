const convertMonth = (month: string): string => {
    switch (month) {
        case '01':
            return 'Jan';
        case '02':
            return 'Feb';
        case '03':
            return 'Mar';
        case '04':
            return 'Apr';
        case '05':
            return 'May';
        case '06':
            return 'Jun';
        case '07':
            return 'Jul';
        case '08':
            return 'Aug';
        case '09':
            return 'Sep';
        case '10':
            return 'Oct';
        case '11':
            return 'Nov';
        case '12':
            return 'Dec';
        default:
            return 'Jan';
    }
};

//convert time to 12 hour format
const convertTime = (time: string): string => {
    const timeArr: string[] = time.split(':');
    const hour: string = timeArr[0];
    const minute: string = timeArr[1];
    const ampm: string = hour >= '12' ? 'PM' : 'AM';
    const hour12: string = hour > '12' ? (parseInt(hour) - 12).toString() : hour;
    return `${hour12}:${minute}:00${ampm}`;
};

export const getCustomTime = (date: string, time: string): string => {
    const dateArr: string[] = date.split('-');
    const year: string = dateArr[0];
    const month: string = convertMonth(dateArr[1]);
    const day: string = dateArr[2];
    const timeConverted: string = convertTime(time);
    return `${day}-${month}-${year} ${timeConverted}`;
};
