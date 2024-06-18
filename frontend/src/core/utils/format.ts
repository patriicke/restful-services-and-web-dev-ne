import { default as dayjs } from 'dayjs';

export const format = {
    timeOnly: (value: string) => dayjs(value).format('HH:mm'),
    todayDate: () => dayjs().format('YYYY-MM-DD'),
    humanDate: (value: string) => dayjs(value).format('MMMM D, YYYY'),
    humanDateTime: (value: string) => dayjs(value).format('MMMM D, YYYY HH:mm'),
    dateMonthYear: (value: string) => dayjs(value).format('MM / YYYY'),
    getMonthAndDate: (date: string) => dayjs(date).format('MMMM D'),
    capitalizeName: (value: string) => {
        const result: string[] = [];
        value
            .split(' ')
            .forEach(element =>
                result.push(element.charAt(0).toUpperCase() + element.slice(1))
            );
        return result.join(' ');
    },
    currenyWithAmount: (value: number) =>
        value.toLocaleString('RWF', {
            style: 'currency',
            currency: 'RWF',
        }),
    exportHumanDateTime: (value: string) =>
        dayjs(value).format('YYYY-MM-DD HH:mm'),
    exportDateMonthYear: (value: string) => dayjs(value).format('MM/YYYY'),
};
