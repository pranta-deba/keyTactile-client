import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllBrandsQuery } from "@/redux/features/brands/brandsApi";
import { useCreateProductMutation } from "@/redux/features/products/productsApi";
import { TBrand, TProduct } from "@/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const { data } = useGetAllBrandsQuery({});
  const brands = data?.data || [];

  const [createProduct] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TProduct>();

  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    const toastId = toast.loading("Created in....");
    const formattedData = {
      ...data,
      images: data.images.filter(Boolean),
    };

    try {
      const res = await createProduct(formattedData).unwrap();

      if (res.success) {
        toast.success("Product Created.", { id: toastId });
        reset();
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Brand</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Product Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="brand">Brand</Label>
          <Controller
            name="brand"
            control={control}
            rules={{ required: "Brand is required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Brand</SelectLabel>
                    {brands.map((brand: TBrand) => (
                      <SelectItem key={brand._id} value={brand?.brand}>
                        {brand?.brand}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="availableQuantity">Available Quantity</Label>
          <Input
            id="availableQuantity"
            type="number"
            {...register("availableQuantity", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            max="5"
            min="1"
            {...register("rating", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={4}
            {...register("description", { required: true })}
          />
        </div>

        {[0, 1, 2].map((index) => (
          <div key={index} className="sm:col-span-2 flex flex-col gap-2">
            <Label htmlFor={`image-${index}`}>
              Image URL {index + 1} {index !== 0 && "(optional)"}
            </Label>
            <Input
              id={`image-${index}`}
              {...register(`images.${index}`, { required: index === 0 })}
            />
          </div>
        ))}

        <div className="sm:col-span-2 mt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
