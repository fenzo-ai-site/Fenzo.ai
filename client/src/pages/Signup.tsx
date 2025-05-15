import { useState } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  company: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const defaultValues: Partial<SignupFormValues> = {
  name: "",
  email: "",
  phone: "",
  password: "",
  company: "",
};

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const signupMutation = useMutation({
    mutationFn: async (values: SignupFormValues) => {
      return apiRequest("POST", "/api/auth/register", values);
    },
    onSuccess: (data: any) => {
      // Store the token in localStorage
      localStorage.setItem("bizai_token", data.token);
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to dashboard or home page
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  function onSubmit(values: SignupFormValues) {
    setIsSubmitting(true);
    signupMutation.mutate(values);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center space-x-2 mb-6">
            <Bot className="h-8 w-8 text-primary" />
            <span className="font-poppins font-bold text-xl">
              Fenzo AI <span className="text-accent">Boosters</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-gray-600 mt-2 text-center">
            Join hundreds of Indian businesses growing with AI
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Create a password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}