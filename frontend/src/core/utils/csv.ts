/* eslint-disable no-unused-vars */
type ColumnType<Entry> = {
    label: string;
    selector: (row: Entry, index: number) => void;
};

export const exportToCSV = <Entry>(
    columns: ColumnType<Entry>[],
    data: Entry[]
): string => {
    let result = '';

    const columnDelimiter = ',';

    const lineDelimiter = '\n';

    const labels: string[] = [];

    columns.forEach(column => labels.push(column.label));

    result += labels.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((element: Entry, index: number) => {
        let ctr = 0;

        columns.forEach(column => {
            if (ctr > 0) result += columnDelimiter;

            result += column.selector(element, index);

            ctr++;
        });

        result += lineDelimiter;
    });

    return result;
};
