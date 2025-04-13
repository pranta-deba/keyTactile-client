import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("login in....");
    try {
      const res = await loginUser(data).unwrap();

      if (res.success) {
        const { _id, email, image, name, userName, phone, role } = res.data;
        dispatch(
          setUser({
            user: { _id, email, image, name, userName, phone, role },
            token: res.token,
          })
        );
        toast.success("Login success", { id: toastId });
        navigate("/");
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
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Submit */}
            <div>
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
              <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
