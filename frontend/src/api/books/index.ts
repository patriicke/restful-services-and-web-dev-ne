import { AxiosErrorHandler, CustomError } from '~/core/libs';
import { PaginationType } from '~/core/types/pagination';
import { queryString } from '~/core/utils';
import PRIVATE_API from '../axios';
import { ResponseType } from '~/core/types/response';
import { BookType } from '~/core/types/book';

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
