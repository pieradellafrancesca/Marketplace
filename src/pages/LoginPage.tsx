import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { LoginFormInputs, loginSchema } from "@/schemas/authSchemas";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bird, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const mockUsers = [
    {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
      token: "fake-jwt-token",
    },
  ];

  const onSubmit = async (data: LoginFormInputs) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email === data.email && u.password === data.password
        );

        if (user) {
          login({ id: "1", name: user.name }, user.token);
          resolve("Logged in successfully!");
        } else {
          reject(new Error("Invalid credential"));
        }
      }, 1000); // Ritardo di 1 secondo
    })
      .then((message) => {
        toast({
          variant: "success",
          title: typeof message === "string" ? message : "Success",
        });
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Logo */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
        <div className="flex flex-col items-center gap-2 ">
          <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-primary text-primary-foreground">
            <Bird size={64} />
          </div>
          <div className="ml-4">
            <p className="truncate font-semibold text-[36px]">BS-Goods</p>
            <p className="text-gray-600">Your trusted marketplace</p>
          </div>
        </div>

        <Card className="flex flex-col border-none md:w-1/2 w-full">
          <CardHeader>
            <CardTitle className="text-lg">Log in</CardTitle>
            <CardDescription>Enter your credentials to access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 mt-1">
                <div className="mt-5 flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div className="text-red-500 flex gap-1 items-center text-[14px]">
                      <TriangleAlert />
                      <p>{errors.email.message}</p>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <div className="text-red-500 flex gap-1 items-center text-[14px]">
                      <TriangleAlert />
                      <p>{errors.password.message}</p>
                    </div>
                  )}
                </div>
                <Button type="submit" className="mt-5">
                  Log in
                </Button>
                <Button variant="link">Forgotten password?</Button>
                <Separator />
                <Button className="bg-red-500 mt-5">Create new account</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
