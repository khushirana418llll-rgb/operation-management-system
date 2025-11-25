"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOff } from "lucide-react";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --------------------- ZOD SCHEMA ----------------------

const registrationSchema = z.object({
  fullName: z.string().min(5, "Minimum 5 characters required"),
  emailId: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters required"),
});

type RegistrationFormType = z.infer<typeof registrationSchema>;

// --------------------------------------------------------

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const RegistrationForm = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema),
  });

  function onSubmit(data: RegistrationFormType) {
    alert("Registered Successfully!");
    console.log(data);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className=" flex justify-center font-bold text-3xl">
            Registration Form
          </CardTitle>
        </CardHeader>

        <form onSubmit={RegistrationForm.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">

            {/* Full Name */}
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Full name"
                {...RegistrationForm.register("fullName")}
              />
              <p className="text-red-500 text-sm">
                {RegistrationForm.formState.errors.fullName?.message}
              </p>  
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email address"
                {...RegistrationForm.register("emailId")}
              />
              <p className="text-red-500 text-sm">
                {RegistrationForm.formState.errors.emailId?.message}
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="pr-10"
                  {...RegistrationForm.register("password")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                </Button>
              </div>

              <p className="text-red-500 text-sm">
                {RegistrationForm.formState.errors.password?.message}
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="py-4 w-full">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Page;
