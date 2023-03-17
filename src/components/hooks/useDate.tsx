const useDate = (date: string): string => {
    const fullDate: Date = new Date(date.replaceAll('-', '/'));
    const year: number = fullDate.getFullYear();
    const month: number = fullDate.getMonth() + 1;
    const day: number = fullDate.getDate();

    const dateFormated: string =
        month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0') + '/' + year;

    return dateFormated;
};

export const useCustomDate = (format: string, dateString: string): string => {
    switch (format) {
        case 'dd/mm/yyyy hh:mm:ss':
            const date = new Date(dateString);
            const formattedDate = date.toLocaleString('en-US', {
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            return formattedDate;
        case 'yyyy-mm-dd':
            const date2 = new Date(dateString);
            const formattedDate2 = date2.toLocaleString('en-US', {
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            //convert to yyyy-mm-dd
            let dateParts = formattedDate2.split('/');
            let newDate = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];
            return newDate;
        default:
            return dateString;
    }
};

export const useCustomTime = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    //convert from 12 hours format to 24
    let dateParts = formattedDate.split(' ');
    let timeParts = dateParts[0].split(':');
    let newTime = '';
    if (dateParts[1] === 'PM') {
        newTime = (parseInt(timeParts[0]) + 12).toString() + ':' + timeParts[1];
    } else {
        newTime = timeParts[0] + ':' + timeParts[1];
    }
    return newTime;
};

export default useDate;
