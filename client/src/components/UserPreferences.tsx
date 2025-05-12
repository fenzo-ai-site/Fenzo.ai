import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideSave } from "react-icons/lu";

const preferencesSchema = z.object({
  industry: z.string().optional(),
  businessSize: z.string().optional(),
  interests: z.array(z.string()).default([]),
  preferredLanguages: z.array(z.string()).default([]),
});

type PreferencesFormValues = z.infer<typeof preferencesSchema>;

interface UserPreference {
  id: number;
  userId: number;
  industry: string | null;
  businessSize: string | null;
  interests: string[];
  preferredLanguages: string[];
  preferredTools: string[];
  createdAt: string;
  updatedAt: string;
}

const industries = [
  "Retail",
  "Healthcare",
  "Education",
  "Technology",
  "Manufacturing",
  "Food & Beverage",
  "Real Estate",
  "Financial Services",
  "Hospitality",
  "Construction",
  "Agriculture",
  "Transportation",
  "Professional Services",
  "Media & Entertainment",
];

const businessSizes = [
  "Solo Entrepreneur",
  "2-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501+ employees",
];

const interestOptions = [
  { id: "customer_support", label: "Customer Support" },
  { id: "marketing", label: "Marketing & Promotion" },
  { id: "sales", label: "Sales & Lead Generation" },
  { id: "social_media", label: "Social Media" },
  { id: "automation", label: "Business Automation" },
  { id: "chatbots", label: "AI Chatbots" },
  { id: "analytics", label: "Data Analytics" },
  { id: "content_creation", label: "Content Creation" },
  { id: "appointment_scheduling", label: "Appointment Scheduling" },
  { id: "localization", label: "Local Language Support" },
];

const languageOptions = [
  { id: "english", label: "English" },
  { id: "hindi", label: "Hindi" },
  { id: "marathi", label: "Marathi" },
  { id: "tamil", label: "Tamil" },
  { id: "telugu", label: "Telugu" },
  { id: "kannada", label: "Kannada" },
  { id: "malayalam", label: "Malayalam" },
  { id: "bengali", label: "Bengali" },
  { id: "gujarati", label: "Gujarati" },
  { id: "punjabi", label: "Punjabi" },
];

export default function UserPreferences() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch user preferences
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/user/preferences'],
    enabled: true
  });
  
  const preferences: UserPreference | null = data?.preferences || null;
  
  // Set up form with existing preferences
  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      industry: preferences?.industry || undefined,
      businessSize: preferences?.businessSize || undefined,
      interests: preferences?.interests || [],
      preferredLanguages: preferences?.preferredLanguages || [],
    },
    values: {
      industry: preferences?.industry || undefined,
      businessSize: preferences?.businessSize || undefined,
      interests: preferences?.interests || [],
      preferredLanguages: preferences?.preferredLanguages || [],
    }
  });
  
  // Save preferences
  const saveMutation = useMutation({
    mutationFn: async (values: PreferencesFormValues) => {
      return await apiRequest('/api/user/preferences', {
        method: 'POST',
        body: JSON.stringify(values)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/preferences'] });
      toast({
        title: "Preferences Saved",
        description: "Your preferences have been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error Saving Preferences",
        description: "Could not save your preferences. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (values: PreferencesFormValues) => {
    saveMutation.mutate(values);
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Profile & Preferences</CardTitle>
        <CardDescription>
          Help us understand your business better to provide personalized AI tool recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the industry that best describes your business.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessSizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This helps us recommend tools that fit your scale of operations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Business Interests</FormLabel>
                    <FormDescription>
                      Select areas of interest for your business.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== option.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preferredLanguages"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Preferred Languages</FormLabel>
                    <FormDescription>
                      Select languages for customer interactions.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {languageOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="preferredLanguages"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== option.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? (
                  "Saving..."
                ) : (
                  <>
                    <LucideSave className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}