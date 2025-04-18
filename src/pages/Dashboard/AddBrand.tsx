import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBrandMutation } from "@/redux/features/brands/brandsApi";
import { TBrand } from "@/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddBrand = () => {
  const [createBrand] = useCreateBrandMutation();
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TBrand>();

  const onSubmit = async (data: TBrand) => {
    const toastId = toast.loading("Created in....");

    try {
      const res = await createBrand(data).unwrap();

      if (res.success) {
        toast.success("Brand Created.", { id: toastId });
        reset();
        navigation("/dashboard/brand-list");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Brand Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="brand">Brand Name</Label>
          <Input
            id="brand"
            {...register("brand", { required: "Brand name is required" })}
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* Founded */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="founded">Founded Year</Label>
          <Input
            id="founded"
            type="number"
            {...register("founded", {
              required: "Founded year is required",
              valueAsNumber: true,
              min: { value: 1800, message: "Year must be after 1800" },
            })}
          />
          {errors.founded && (
            <p className="text-red-500 text-sm">{errors.founded.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            {...register("image", {
              required: "Image URL is required",
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="cursor-pointer">
          Add Brand
        </Button>
      </form>
    </div>
  );
};

export default AddBrand;
