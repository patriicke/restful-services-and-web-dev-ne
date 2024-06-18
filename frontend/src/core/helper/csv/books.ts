import { BookType } from '~/core/types/book';
import { exportToCSV } from '~/core/utils';

export const exportBooks = (userData: BookType[]): string =>
    exportToCSV<BookType>(
        [
            {
                label: 'Name',
                selector: row => row.name,
            },
            {
                label: 'Author',
                selector: row => row.author,
            },
            {
                label: 'Publisher',
                selector: row => row.publisher,
            },
            {
                label: 'Publication Year',
                selector: row => row.publicationYear,
            },
            {
                label: 'Subject',
                selector: row => row.subject,
            },
        ],
        userData
    );
