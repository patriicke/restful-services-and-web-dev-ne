import { ResponseType } from '~/core/types/response';
import PRIVATE_API from '../axios';
import { AxiosErrorHandler, CustomError } from '~/core/libs';
import { StatsResponsePayload } from '~/core/types/stat';

export const get_stats = async (): Promise<
    ResponseType<StatsResponsePayload>
> => {
    try {
        const request = await PRIVATE_API.get('/stats');
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
