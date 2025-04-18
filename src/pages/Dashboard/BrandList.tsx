import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useGetAllBrandsQuery } from "@/redux/features/brands/brandsApi";
import { TBrand } from "@/types";
import { Edit, Loader, Trash2 } from "lucide-react";
import { useState } from "react";

const BrandList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading } = useGetAllBrandsQuery({
    search,
    page,
    limit,
  });

  const brands: TBrand[] = data?.data || [];
  const total = data?.meta?.totalItems || 0;
  const totalPages = Math.ceil(total / limit);

  //* Delete Brand
  const handleDeleteBrand = async (id: string) => {};

  //* Edit Brand
  const handleEditBrand = (id: string) => {};

  return (
    <div className="p-4 space-y-6 w-full overflow-hidden">
      <h2 className="text-2xl font-semibold">All Products</h2>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <Input
          placeholder="Search by brand"
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
                <TableHead>Brand</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Founded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>
                    <img
                      src={brand?.image}
                      alt={brand?.brand}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{brand.brand}</TableCell>
                  <TableCell>{brand?.country}</TableCell>
                  <TableCell>{brand?.founded}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => handleEditBrand(brand._id!)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteBrand(brand._id!)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default BrandList;
