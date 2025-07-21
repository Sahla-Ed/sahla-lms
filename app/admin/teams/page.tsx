import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, UserPlus, ShieldCheck, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Management | Sahla Admin",
};

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
      </div>
      
      <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-full p-6 w-fit mb-6 shadow-lg">
            <Users className="size-12 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Coming Soon!
          </CardTitle>
          <CardDescription className="max-w-lg mx-auto text-base leading-relaxed">
            We are putting the final touches on the comprehensive team management dashboard. 
            Soon you will be able to manage all users and their roles seamlessly.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="group flex items-start p-6 bg-white/50 hover:bg-white/80 border border-primary/10 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-3 mr-4 transition-colors">
                <UserPlus className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Invite & Manage Users</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Easily invite new members to your team and view all registered users in one centralized dashboard.
                </p>
              </div>
            </div>

            <div className="group flex items-start p-6 bg-white/50 hover:bg-white/80 border border-primary/10 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-3 mr-4 transition-colors">
                <ShieldCheck className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Assign Roles & Permissions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Control access levels by assigning specific roles like 'Admin', 'Instructor', or 'Student' with granular permissions.
                </p>
              </div>
            </div>

            <div className="group flex items-start p-6 bg-white/50 hover:bg-white/80 border border-primary/10 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-3 mr-4 transition-colors">
                <Clock className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Activity Monitoring</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track user activity, login sessions, and engagement metrics to keep your team productive and secure.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Clock className="size-4 mr-2" />
              Expected Launch: 2026
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}