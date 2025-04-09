
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { saveUserProfile, getUserProfile, getUserCourses, getCourse } from "@/services/chat-service";
import type { Course, UserCourse, UserProfile } from "@/services/chat-service";
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [editMode, setEditMode] = useState(false);
  const [userCourses, setUserCourses] = useState<Array<UserCourse & {course: Course}>>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    loadUserCourses();
  }, []);
  
  const loadUserCourses = () => {
    const courses = getUserCourses(profile.id);
    const enrichedCourses = courses
      .map(uc => {
        const course = getCourse(uc.courseId);
        return course ? { ...uc, course } : null;
      })
      .filter(Boolean) as Array<UserCourse & {course: Course}>;
      
    setUserCourses(enrichedCourses);
  };
  
  const handleSaveProfile = () => {
    saveUserProfile(profile);
    setEditMode(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const updateProfileField = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-10 ${isMobile ? 'pt-16' : ''}`}>
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Profile & Dashboard</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle>Your Profile</CardTitle>
                    {!editMode ? (
                      <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                      </div>
                    )}
                  </div>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                        <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {editMode && (
                        <div className="mt-2">
                          <Label htmlFor="avatar-url">Avatar URL</Label>
                          <Input
                            id="avatar-url"
                            value={profile.avatarUrl}
                            onChange={(e) => updateProfileField('avatarUrl', e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                            className="mt-1 w-full"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => updateProfileField('name', e.target.value)}
                            disabled={!editMode}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => updateProfileField('email', e.target.value)}
                            disabled={!editMode}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => updateProfileField('bio', e.target.value)}
                          disabled={!editMode}
                          className="mt-1 min-h-[100px]"
                          placeholder="Tell us about yourself"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="interests">Interests</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {profile.interests.map((interest, index) => (
                            <Badge key={index} variant={editMode ? "outline" : "secondary"}>
                              {interest}
                              {editMode && (
                                <button 
                                  className="ml-1 text-xs" 
                                  onClick={() => updateProfileField('interests', 
                                    profile.interests.filter((_, i) => i !== index)
                                  )}
                                >
                                  ✕
                                </button>
                              )}
                            </Badge>
                          ))}
                          {editMode && (
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const form = e.target as HTMLFormElement;
                              const input = form.elements.namedItem('new-interest') as HTMLInputElement;
                              if (input.value.trim()) {
                                updateProfileField('interests', [...profile.interests, input.value.trim()]);
                                input.value = '';
                              }
                            }}>
                              <Input
                                name="new-interest"
                                placeholder="Add interest"
                                className="w-32 h-8"
                              />
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dashboard" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Learning Progress</CardTitle>
                  <CardDescription>Track your course completions and learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  {userCourses.length > 0 ? (
                    <div className="space-y-4">
                      {userCourses.map((userCourse) => (
                        <div key={userCourse.courseId} className="p-4 border rounded-lg">
                          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                            <div>
                              <h3 className="font-medium">{userCourse.course.title}</h3>
                              <p className="text-sm text-muted-foreground">{userCourse.course.domain}</p>
                            </div>
                            <Link to={`/courses/${userCourse.courseId}`}>
                              <Button size="sm">Continue Learning</Button>
                            </Link>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{userCourse.progress}%</span>
                            </div>
                            <Progress value={userCourse.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                      <Link to="/courses">
                        <Button>Browse Courses</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Journals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link to="/journals" className="block p-2 hover:bg-accent rounded-md">
                        <Button variant="outline" className="w-full justify-start">View All Journals</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Chats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link to="/" className="block p-2 hover:bg-accent rounded-md">
                        <Button variant="outline" className="w-full justify-start">View All Chats</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
