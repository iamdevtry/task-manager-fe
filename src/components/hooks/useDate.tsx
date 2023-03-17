const useDate = (date: string): string => {
    const fullDate: Date = new Date(date.replaceAll('-', '/'));
    const year: number = fullDate.getFullYear();
    const month: number = fullDate.getMonth() + 1;
    const day: number = fullDate.getDate();

    const dateFormated: string =
        month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0') + '/' + year;

    return dateFormated;
};

export const useCustomDate = (dateString: string): string => {
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
};

export default useDate;
