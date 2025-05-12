import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

import {
  Layout,
  Bot,
  Grid3x3,
  MessageSquare,
  Users,
  Calendar,
  BarChart3,
  User,
  LogOut,
  PlusCircle,
  Settings,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tools");

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("bizai_token");
    if (!token) {
      setLocation("/login");
      toast({
        title: "Authentication required",
        description: "Please login to access the dashboard",
        variant: "destructive",
      });
    }
  }, [setLocation, toast]);

  interface UserProfile {
    success: boolean;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      company?: string;
      role: string;
    };
  }

  interface AiTool {
    id: number;
    name: string;
    type: string;
    description: string;
    configuration: any;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }

  interface AiToolsResponse {
    success: boolean;
    tools: AiTool[];
  }

  // Fetch user profile data
  const { data: userData, isLoading: userLoading } = useQuery<UserProfile>({
    queryKey: ["/api/user/profile"],
    enabled: !!localStorage.getItem("bizai_token"),
  });

  // Fetch user's AI tools
  const { data: toolsData, isLoading: toolsLoading } = useQuery<AiToolsResponse>({
    queryKey: ["/api/tools"],
    enabled: !!localStorage.getItem("bizai_token"),
  });

  const handleLogout = () => {
    localStorage.removeItem("bizai_token");
    setLocation("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Dashboard sidebar items
  const sidebarItems = [
    { name: "AI Tools", icon: <Grid3x3 size={20} />, tab: "tools" },
    { name: "Chat Logs", icon: <MessageSquare size={20} />, tab: "chats" },
    { name: "Leads", icon: <Users size={20} />, tab: "leads" },
    { name: "Appointments", icon: <Calendar size={20} />, tab: "appointments" },
    { name: "Analytics", icon: <BarChart3 size={20} />, tab: "analytics" },
    { name: "Profile", icon: <User size={20} />, tab: "profile" },
    { name: "Settings", icon: <Settings size={20} />, tab: "settings" },
  ];

  if (userLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">
              BizAI <span className="text-accent">Boosters</span>
            </span>
          </Link>
        </div>

        <div className="px-3 py-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.tab}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === item.tab
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(item.tab)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            ))}

            <Separator className="my-4" />
            
            <button
              className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <span className="mr-3"><LogOut size={20} /></span>
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
          <h1 className="text-xl font-semibold">
            {sidebarItems.find(item => item.tab === activeTab)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              {userData && userData.user ? userData.user.name : "User"}
            </span>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              {userData && userData.user && userData.user.name 
                ? userData.user.name.charAt(0).toUpperCase() 
                : "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* AI Tools tab */}
            <TabsContent value="tools" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Your AI Tools</h2>
                <Button className="flex items-center space-x-2">
                  <PlusCircle size={16} />
                  <span>Create New Tool</span>
                </Button>
              </div>

              {toolsLoading ? (
                <div>Loading your tools...</div>
              ) : toolsData && toolsData.tools && toolsData.tools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toolsData.tools.map((tool) => (
                    <Card key={tool.id}>
                      <CardHeader>
                        <CardTitle>{tool.name}</CardTitle>
                        <CardDescription>{tool.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">{tool.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button size="sm">Open Tool</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No AI Tools Yet</CardTitle>
                    <CardDescription>
                      Create your first AI tool to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Choose from 10 different AI tools to help grow your business
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create Your First AI Tool</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            {/* Other tabs - will implement later */}
            <TabsContent value="chats">
              <h2 className="text-lg font-medium mb-6">Chat Logs</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Chat History</CardTitle>
                  <CardDescription>
                    View conversations with your AI tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    This section will show your chat history with all your AI tools
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leads">
              <h2 className="text-lg font-medium mb-6">Leads Management</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Your Leads</CardTitle>
                  <CardDescription>
                    Manage leads collected by your AI tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    This section will display leads collected by your AI tools
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <h2 className="text-lg font-medium mb-6">Appointments</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Your Appointments</CardTitle>
                  <CardDescription>
                    Manage appointments booked through your AI tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    This section will display appointments booked through your AI tools
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <h2 className="text-lg font-medium mb-6">Analytics Dashboard</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Business Analytics</CardTitle>
                  <CardDescription>
                    View insights about your AI tools performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    This section will display analytics and insights for your AI tools
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <h2 className="text-lg font-medium mb-6">User Profile</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Name</h3>
                      <p>{userData && userData.user ? userData.user.name : "Not available"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Email</h3>
                      <p>{userData && userData.user ? userData.user.email : "Not available"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Company</h3>
                      <p>{userData && userData.user && userData.user.company ? userData.user.company : "Not available"}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Edit Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <h2 className="text-lg font-medium mb-6">Account Settings</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    This section will allow you to manage your account settings
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}