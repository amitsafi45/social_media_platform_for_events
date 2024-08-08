export function paginate(query, page: number, limit: number) {
    const offset = (page - 1) * limit;
    return query.take(limit).skip(offset);
  }
  
  export function calculatePagination(total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);
    return {
      currentPage: page,
      totalPages,
      limit,
      total,
    };
  }
  