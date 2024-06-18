import { BaseType } from '../base';

export type BookType = BaseType & {
    name: string;
    author: string;
    publisher: string;
    publicationYear: number;
    subject: string;
};
