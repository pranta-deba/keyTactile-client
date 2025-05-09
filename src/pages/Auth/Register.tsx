import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { uploadImageToImgbb } from "@/utils/uploadImageToImgbb";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("registered in....");
    const file = data?.image[0];
    if (!file) {
      toast.error("Profile image required!", { id: toastId });
      return;
    }

    try {
      const imageUrl = await uploadImageToImgbb(file);
      const userData = { ...data, image: imageUrl };
      const res = await registerUser(userData).unwrap();

      if (res.success) {
        const { _id, email, image, name, userName, phone, role } = res.data;
        dispatch(
          setUser({
            user: { _id, email, image, name, userName, phone, role },
            token: res.token,
          })
        );
        toast.success("Registered success", { id: toastId });
        navigate("/", { replace: true });
      } else {
        toast.error(res.message || "something went wrong", { id: toastId });
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                autoComplete="name"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                autoComplete="username"
                {...register("userName", { required: true })}
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", { required: true })}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Profile Image */}
            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                {...register("image", { required: true })}
                type="file"
              />
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2 md:flex md:flex-col md:justify-center md:items-center">
              <Button type="submit" className="w-full md:w-auto mt-2">
                Register
              </Button>
              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
