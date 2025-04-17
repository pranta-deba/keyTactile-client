import AppProductCard from "@/components/productComponents/AppProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/products.types";
import { useState } from "react";

const Products = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading } = useGetAllProductsQuery({
    search,
    sort,
    page,
    limit,
  });

  const products: TProduct[] = data?.data || [];
  const total = data?.meta?.totalItems || 0;

  const totalPages = Math.ceil(total / limit);

  const filteredProducts = products.filter((product) => {
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });

  const handleClearFilters = () => {
    setSearch("");
    setSort("");
    setPriceRange([0, 500]);
    setPage(1);
  };
  return (
    <div className="container mx-auto px-4 py-2 md:py-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <Input
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
        <Select
          value={sort}
          onValueChange={(value) => {
            setSort(value);
            setPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="price-asc">Low to High</SelectItem>
              <SelectItem value="price-desc">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <span className="text-sm">${priceRange[0]}</span>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={500}
            step={20}
            onValueChange={(value: number[]) => {
              setPriceRange(value);
              setPage(1);
            }}
            className="w-48"
          />
          <span className="text-sm">${priceRange[1]}</span>
        </div>

        <Button variant="outline" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Products */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <AppProductCard key={product._id} {...product} />
              ))
            ) : (
              <p className="col-span-full text-center">No products found</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="cursor-pointer"
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <Button
                  key={pg}
                  onClick={() => setPage(pg)}
                  variant={pg === page ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {pg}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
