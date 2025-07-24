import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Users, UserPlus, ShieldCheck, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team Management | Sahla Admin',
};

export default function TeamsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Team Management</h1>
          <p className='text-muted-foreground'>
            Manage users, roles, and permissions
          </p>
        </div>
      </div>

      <Card className='border-primary/20 from-primary/5 to-secondary/5 border-2 border-dashed bg-gradient-to-br via-transparent'>
        <CardHeader className='pb-6 text-center'>
          <div className='from-primary to-primary/80 mx-auto mb-6 w-fit rounded-full bg-gradient-to-br p-6 shadow-lg'>
            <Users className='size-12 text-white' />
          </div>
          <CardTitle className='from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent'>
            Coming Soon!
          </CardTitle>
          <CardDescription className='mx-auto max-w-lg text-base leading-relaxed'>
            We are putting the final touches on the comprehensive team
            management dashboard. Soon you will be able to manage all users and
            their roles seamlessly.
          </CardDescription>
        </CardHeader>

        <CardContent className='pt-0'>
          <div className='mx-auto max-w-2xl space-y-4'>
            <div className='group border-primary/10 flex items-start rounded-xl border bg-white/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 hover:shadow-md'>
              <div className='bg-primary/10 group-hover:bg-primary/20 mr-4 rounded-lg p-3 transition-colors'>
                <UserPlus className='text-primary size-6' />
              </div>
              <div className='flex-1'>
                <h3 className='mb-1 text-lg font-semibold'>
                  Invite & Manage Users
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  Easily invite new members to your team and view all registered
                  users in one centralized dashboard.
                </p>
              </div>
            </div>

            <div className='group border-primary/10 flex items-start rounded-xl border bg-white/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 hover:shadow-md'>
              <div className='bg-primary/10 group-hover:bg-primary/20 mr-4 rounded-lg p-3 transition-colors'>
                <ShieldCheck className='text-primary size-6' />
              </div>
              <div className='flex-1'>
                <h3 className='mb-1 text-lg font-semibold'>
                  Assign Roles & Permissions
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  Control access levels by assigning specific roles like
                  &apos;Admin&apos;, &apos;Instructor&apos;, or
                  &apos;Student&apos; with granular permissions.
                </p>
              </div>
            </div>

            <div className='group border-primary/10 flex items-start rounded-xl border bg-white/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 hover:shadow-md'>
              <div className='bg-primary/10 group-hover:bg-primary/20 mr-4 rounded-lg p-3 transition-colors'>
                <Clock className='text-primary size-6' />
              </div>
              <div className='flex-1'>
                <h3 className='mb-1 text-lg font-semibold'>
                  Activity Monitoring
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  Track user activity, login sessions, and engagement metrics to
                  keep your team productive and secure.
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
