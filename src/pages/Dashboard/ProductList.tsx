import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/products.types";
import { Edit, Loader, Trash2 } from "lucide-react";
import { useState } from "react";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  const { data, isLoading } = useGetAllProductsQuery({
    search,
    page,
    limit,
  });

  const products: TProduct[] = data?.data || [];
  const total = data?.meta?.totalItems || 0;
  const totalPages = Math.ceil(total / limit);

  //* Delete Product
  const handleDeleteProduct = (id: string) => {
    console.log(id);
  };
  //* Edit Product
  const handleEditProduct = (id: string) => {
    console.log(id);
  };

  return (
    <div className="p-4 space-y-6 w-full overflow-hidden">
      <h2 className="text-2xl font-semibold">All Products</h2>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <Input
          placeholder="Search by title, brand, ....."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64"
        />
        <div className="text-sm">
          Page {page} of {totalPages}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {product.title}
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.availableQuantity}</TableCell>
                  <TableCell>{product.rating} ⭐</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => handleEditProduct(product._id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <span className="text-sm font-medium px-2 pt-1">Page {page}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
