"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, BarChart } from "recharts"
import { MapPin, Key, Activity, Clock, TrendingUp, Globe, Mail, Settings } from "lucide-react"

// Mock data for API usage
const usageData = [
    { month: "Jan", requests: 12000, errors: 45 },
    { month: "Feb", requests: 15000, errors: 32 },
    { month: "Mar", requests: 18000, errors: 28 },
    { month: "Apr", requests: 22000, errors: 15 },
    { month: "May", requests: 25000, errors: 12 },
    { month: "Jun", requests: 28000, errors: 8 },
]

const responseTimeData = [
    { day: "Mon", avgTime: 120 },
    { day: "Tue", avgTime: 98 },
    { day: "Wed", avgTime: 145 },
    { day: "Thu", avgTime: 110 },
    { day: "Fri", avgTime: 95 },
    { day: "Sat", avgTime: 88 },
    { day: "Sun", avgTime: 102 },
]

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-card">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback className="text-xl font-semibold">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-foreground">John Developer</h1>
                            <p className="text-muted-foreground text-lg">Location API Developer</p>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    john.dev@example.com
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    San Francisco, United States
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="gap-2 bg-transparent">
                            <Settings className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - User Info & APIs */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* User Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Account Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                    <p className="text-foreground">John Developer</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p className="text-foreground">john.dev@example.com</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">City</label>
                                    <p className="text-foreground">San Francisco</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Country</label>
                                    <p className="text-foreground">United States</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Plan</label>
                                    <Badge variant="secondary" className="mt-1">
                                        Pro Developer
                                    </Badge>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                                    <p className="text-foreground">January 2024</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Current APIs Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="h-5 w-5" />
                                    Active APIs
                                </CardTitle>
                                <CardDescription>Your current API subscriptions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">Geocoding API</h4>
                                            <p className="text-sm text-muted-foreground">Convert addresses to coordinates</p>
                                        </div>
                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                            Active
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">Reverse Geocoding API</h4>
                                            <p className="text-sm text-muted-foreground">Convert coordinates to addresses</p>
                                        </div>
                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                            Active
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">Places API</h4>
                                            <p className="text-sm text-muted-foreground">Search for places and POIs</p>
                                        </div>
                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                            Active
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">Distance Matrix API</h4>
                                            <p className="text-sm text-muted-foreground">Calculate travel distances</p>
                                        </div>
                                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                                            Limited
                                        </Badge>
                                    </div>
                                </div>
                                <Separator />
                                <Button className="w-full bg-transparent" variant="outline">
                                    Manage API Keys
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Usage Charts */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Usage Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Requests</p>
                                            <p className="text-2xl font-bold">128,450</p>
                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                <TrendingUp className="h-3 w-3" />
                                                +12% from last month
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-secondary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Avg Response Time</p>
                                            <p className="text-2xl font-bold">108ms</p>
                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                <TrendingUp className="h-3 w-3" />
                                                -5ms improvement
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-5 w-5 text-accent" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Success Rate</p>
                                            <p className="text-2xl font-bold">99.7%</p>
                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                <TrendingUp className="h-3 w-3" />
                                                +0.2% this month
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* API Usage Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>API Usage Over Time</CardTitle>
                                <CardDescription>Monthly requests and error rates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        requests: {
                                            label: "Requests",
                                            color: "hsl(var(--chart-1))",
                                        },
                                        errors: {
                                            label: "Errors",
                                            color: "hsl(var(--chart-2))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={usageData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line
                                                type="monotone"
                                                dataKey="requests"
                                                stroke="var(--color-requests)"
                                                strokeWidth={2}
                                                name="Requests"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="errors"
                                                stroke="var(--color-errors)"
                                                strokeWidth={2}
                                                name="Errors"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Response Time Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Response Time</CardTitle>
                                <CardDescription>Daily average response times (ms)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        avgTime: {
                                            label: "Response Time (ms)",
                                            color: "hsl(var(--chart-3))",
                                        },
                                    }}
                                    className="h-[250px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={responseTimeData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar
                                                dataKey="avgTime"
                                                fill="var(--color-avgTime)"
                                                name="Response Time (ms)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
