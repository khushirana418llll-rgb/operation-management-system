// RegistrationForm.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// ---- Zod schema ----
const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 letters").regex(/^[A-Za-z]+$/, "Only alphabets allowed"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Enter 10 digit phone number"),
  age: z.string().regex(/^[0-9]{1,3}$/, "Enter valid age"),
  gender: z.string().min(1, "Please select gender"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      age: "",
      gender: "",
      city: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, setValue, watch, reset } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // Simulate API call (replace with real API)
      console.log("Submitted data:", data);
      // show a simple success (replace with toast if you want)
      alert("Registration Successful!");
      reset();
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // watch gender to keep Select controlled
  const genderValue = watch("gender");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-xl overflow-visible">
        <CardHeader className="bg-transparent">
          <CardTitle className="text-center text-2xl font-semibold">Registration Form</CardTitle>
        </CardHeader>

        <CardContent className="pt-2 px-6 pb-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Username */}
            <div>
              <Label className="mb-1">Username</Label>
              <Input
                {...register("username")}
                placeholder="Enter username"
                className="ring-0 focus:ring-2 focus:ring-indigo-300"
                aria-invalid={!!errors.username}
              />
              {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label className="mb-1">Email</Label>
              <Input
                type="email"
                {...register("email")}
                placeholder="Enter email"
                className="ring-0 focus:ring-2 focus:ring-indigo-300"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>


             {/* Email */}
            <div>
              <Label className="mb-1">Email</Label>
              <Input
                type="email"
                {...register("email")}
                placeholder="Enter email"
                className="ring-0 focus:ring-2 focus:ring-indigo-300"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <Label className="mb-1">Password</Label>
              <div className="flex gap-3 items-center">
                <Input
                  type={showPass ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter password"
                  className="flex-1 ring-0 focus:ring-2 focus:ring-indigo-300"
                  aria-invalid={!!errors.password}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPass((s) => !s)}
                  className="min-w-[74px] px-3 py-2 rounded-md border"
                >
                  {showPass ? "Hide" : "Show"}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <Label className="mb-1">Phone Number</Label>
              <Input
                {...register("phone")}
                placeholder="10 digit phone number"
                maxLength={10}
                className="ring-0 focus:ring-2 focus:ring-indigo-300"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
            </div>

            {/* Age */}
            <div>
              <Label className="mb-1">Age</Label>
              <Input
                {...register("age")}
                placeholder="Enter age"
                inputMode="numeric"
                className="ring-0 focus:ring-2 focus:ring-indigo-300"
                aria-invalid={!!errors.age}
              />
              {errors.age && <p className="text-sm text-red-600 mt-1">{errors.age.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <Label className="mb-1">Gender</Label>
              <Select
                value={genderValue}
                onValueChange={(val) => setValue("gender", val, { shouldValidate: true })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender.message}</p>}
            </div>

            {/* City */}
            <div>
              <Label className="mb-1">City</Label>
              <Input
                {...register("city")}
                placeholder="Enter city"
                className="ring-0 focus:ring-2 focus:ring-indigo-300"
                aria-invalid={!!errors.city}
              />
              {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
            </div>

            <CardFooter className="px-0">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-neutral-900 to-neutral-700 text-white py-3 rounded-xl shadow-md"
                disabled={submitting}
              >
                {submitting ? "Registering..." : "Register"}
              </Button>
            </CardFooter>

          </form>
        </CardContent>
      </Card>

      {/* small decorative image placeholder (optional) */}
      {/* If you want to display the screenshot used for reference somewhere in the UI (development only), use the path below */}
      {/* Screenshot path: /mnt/data/7fe36fc2-70fd-42bb-a309-bcdd5bf12abb.png */}
    </div>
  );
}
