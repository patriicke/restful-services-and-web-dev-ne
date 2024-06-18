import { BaseType } from '../base';

export type BookType = BaseType & {
    name: string;
    author: string;
    publisher: string;
    publicationYear: number;
    subject: string;
};

export type CreateBookRequestPayload = {
    name: string;
    author: string;
    publisher: string;
    publicationYear: number;
    subject: string;
};

export type UpdateBookRequestPayload = {
    name: string;
    author: string;
    publisher: string;
    publicationYear: number;
    subject: string;
};

export type CreateBookResponsePayload = {
    book: BookType;
};

export type UpdateBookResponsePayload = {
    book: BookType;
};
