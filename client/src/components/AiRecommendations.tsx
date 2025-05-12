import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ThumbsUp, CheckCircle, RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recommendation {
  id: number;
  userId: number;
  toolType: string;
  toolName: string;
  score: number;
  reason: string;
  clicked: boolean;
  implemented: boolean;
  createdAt: string;
  metadata?: any;
}

interface AiRecommendationsProps {
  onImplement?: (recommendation: Recommendation) => void;
}

export default function AiRecommendations({ onImplement }: AiRecommendationsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Fetch recommendations
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/recommendations'],
    enabled: true
  });
  
  // Generate new recommendations
  const generateMutation = useMutation({
    mutationFn: async () => {
      setIsGenerating(true);
      try {
        const result = await apiRequest('/api/recommendations/generate', {
          method: 'POST'
        });
        return result;
      } finally {
        setIsGenerating(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations'] });
      toast({
        title: "Recommendations Generated",
        description: "We've created new tool recommendations based on your usage and preferences.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Generating Recommendations",
        description: "Could not generate recommendations. Please try again later.",
        variant: "destructive"
      });
    }
  });
  
  // Mark as clicked/viewed
  const clickMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/recommendations/${id}/click`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations'] });
    }
  });
  
  // Mark as implemented
  const implementMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/recommendations/${id}/implement`, {
        method: 'POST'
      });
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations'] });
      
      const recommendation = data?.recommendations?.find((r: Recommendation) => r.id === id);
      
      if (recommendation && onImplement) {
        onImplement(recommendation);
      }
      
      toast({
        title: "Tool Added to Implementation Queue",
        description: "The recommended tool will be set up for your account soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error Implementing Tool",
        description: "Could not implement this tool. Please try again later.",
        variant: "destructive"
      });
    }
  });
  
  // Format the tool type for display
  const formatToolType = (type: string) => {
    if (!type) return "";
    
    return type
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get the badge color based on score
  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-emerald-400";
    if (score >= 55) return "bg-blue-400";
    return "bg-slate-400";
  };
  
  const handleImplementClick = (recommendation: Recommendation) => {
    implementMutation.mutate(recommendation.id);
  };
  
  const handleViewDetails = (recommendation: Recommendation) => {
    // Mark as clicked/viewed
    if (!recommendation.clicked) {
      clickMutation.mutate(recommendation.id);
    }
    
    // Could show a modal with more details here
    toast({
      title: recommendation.toolName,
      description: recommendation.reason,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">AI Tool Recommendations</h3>
          <Skeleton className="h-9 w-28" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle>Unable to Load Recommendations</CardTitle>
          <CardDescription>
            There was an error loading your personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/recommendations'] })}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const recommendations: Recommendation[] = data?.recommendations || [];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">AI Tool Recommendations</h3>
        <Button 
          onClick={() => generateMutation.mutate()} 
          size="sm"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Suggestions
            </>
          )}
        </Button>
      </div>
      
      {recommendations.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Recommendations Yet</CardTitle>
            <CardDescription>
              We'll analyze your business needs to suggest the right AI tools for you.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => generateMutation.mutate()} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Recommendations"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className={rec.implemented ? "border-green-200" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{rec.toolName}</CardTitle>
                  <Badge className={getScoreBadgeColor(rec.score)}>{rec.score}%</Badge>
                </div>
                <CardDescription>{formatToolType(rec.toolType)}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm line-clamp-3">{rec.reason}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewDetails(rec)}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Details
                </Button>
                
                {rec.implemented ? (
                  <Button variant="outline" size="sm" disabled>
                    <LucideCheckCircle className="mr-2 h-4 w-4" />
                    Implemented
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => handleImplementClick(rec)}
                    disabled={implementMutation.isPending}
                  >
                    <LucideSettings className="mr-2 h-4 w-4" />
                    Implement
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}