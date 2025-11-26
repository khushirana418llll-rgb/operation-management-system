"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    setLoading(true);
    setTimeout(() => {
      if (data.username !== "admin" || data.password !== "123456") {
        toast.error("Invalid Credentials",
          {
            style: {
              background: "#dc2626",
              color: "white",
            }
          });
        setLoading(false);
        return;
      }

      toast.success("Login Successful", {
        style: {
          background: "#16a34a",
          color: "white",
        }
      });

      setLoading(false);

      setTimeout(() => {
        redirect("/dashboard");
      }, 500);

    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[380px] max-w-full bg-white shadow-xl border border-[#e5e5e5] rounded-2xl">

          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-black">
              Welcome
            </CardTitle>

            <div className="text-gray-600 text-sm">
              Do not have an account yet? <Link href={"/registration"} className="text-blue-600 font-bold"> Sign up </Link>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent >

              <div>
                <Label className="text-black py-2">Username</Label>
                <Input
                  placeholder="Enter username"
                  className="bg-[#f8f8f8] border-[#d4d4d4] text-black rounded-xl focus:ring-2 focus:ring-black/20"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <Label className="text-black py-2">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="bg-[#f8f8f8] border-[#d4d4d4] text-black rounded-xl focus:ring-2 focus:ring-black/20"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full text-lg py-3 mt-2 bg-black hover:bg-gray-800 text-white font-semibold transition rounded-xl flex justify-center"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Loading..." : "Submit"}
              </Button>

            </CardContent>

            <CardFooter>
              <div className="w-full mt-6">
                {/* OR Divider */}
                <div className="flex items-center w-full my-4">
                  <div className="flex-1 h-px bg-gray-600"></div>
                  <span className="px-3 text-gray-400 text-sm">OR</span>
                  <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-3">

                  {/* Apple */}
                  <Button
                    className="flex-1 bg-[#d4d4d4] hover:bg-gray-700 p-3 rounded-m flex items-center justify-center"
                  >
                    <Image
                      src="/apple-logo.png"
                      alt="apple"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </Button>

                  {/* Google */}
                  <Button
                    className="flex-1 bg-[#d4d4d4] hover:bg-gray-700 p-3 rounded-m flex items-center justify-center"
                  >
                    <Image
                      src="/google.png"
                      alt="google"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </Button>

                  {/* X / Twitter */}
                  <Button
                    className="flex-1 bg-[#d4d4d4] hover:bg-gray-700 p-3 rounded-m flex items-center justify-center"
                  >
                    <Image
                      src="/twitter.png"
                      alt="twitter"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </Button>

                </div>
              </div>

            </CardFooter>
          </form>

        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
