import type { PaginationOptions } from '~/core';

export const infinityPagination = <T>(
  data: Array<T>,
  options: PaginationOptions,
) => ({
  data,
  hasNextPage: data.length === options.limit,
});
