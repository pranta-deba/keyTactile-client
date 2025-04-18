export type TBrand = {
  _id?: string;
  brand: string;
  country: string;
  founded: number;
  description: string;
};

export type TBrandApiResponse = {
  success: boolean;
  message: string;
  data: TBrand[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
};

export type TBrandQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};
