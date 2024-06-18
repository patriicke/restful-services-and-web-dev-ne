import { paginate } from 'nestjs-typeorm-paginate';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationResponseDto } from './pagination-response.dto';
import { PaginationRequest } from './interfaces';

export const handlePaginate = async <T>(
  repository: Repository<T>,
  { limit, page }: PaginationRequest,
  obj?: FindManyOptions<T>,
): Promise<PaginationResponseDto<T>> => {
  const data = await paginate<T>(repository, { limit, page }, { ...obj });
  return {
    items: data.items,
    currentPage: data.meta.currentPage,
    itemCount: data.meta.itemCount,
    itemsPerPage: data.meta.itemsPerPage,
    totalPages: data.meta.totalPages,
    totalItems: data.meta.totalItems,
  };
};
