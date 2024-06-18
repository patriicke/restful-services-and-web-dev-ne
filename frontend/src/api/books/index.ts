import { AxiosErrorHandler, CustomError } from '~/core/libs';
import { PaginationType } from '~/core/types/pagination';
import { queryString } from '~/core/utils';
import PRIVATE_API from '../axios';
import { ResponseType } from '~/core/types/response';
import {
    BookType,
    CreateBookRequestPayload,
    CreateBookResponsePayload,
    UpdateBookRequestPayload,
    UpdateBookResponsePayload,
} from '~/core/types/book';

export const get_books = async (
    query?: string
): Promise<ResponseType<PaginationType<BookType>>> => {
    try {
        const request = await PRIVATE_API.get(`/books${queryString(query)}`);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const create_book = async (
    payload: CreateBookRequestPayload
): Promise<ResponseType<CreateBookResponsePayload>> => {
    try {
        const request = await PRIVATE_API.post('/books', payload);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const update_book = async (
    bookId: string,
    payload: UpdateBookRequestPayload
): Promise<ResponseType<UpdateBookResponsePayload>> => {
    try {
        const request = await PRIVATE_API.put(`/books/${bookId}`, payload);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const delete_book = async (
    bookId: string
): Promise<ResponseType<null>> => {
    try {
        const request = await PRIVATE_API.delete(`/books/${bookId}`);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
