import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  github?: string;
  linkedin?: string;
}

interface OurTeamSectionProps {
  teamMembers: TeamMember[];
}

export const OurTeamSection: React.FC<OurTeamSectionProps> = ({
  teamMembers,
}) => {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      {teamMembers.map((member, index) => (
        <Card
          key={index}
          className={cn(
            'border border-slate-200 bg-white shadow-md hover:shadow-xl dark:border-slate-700 dark:bg-slate-800',
            'text-center transition-all duration-300 hover:-translate-y-2',
            'animate-fade-in-up animate-delay-[calc(200ms*var(--index))]',
          )}
          style={{ '--index': index } as React.CSSProperties}
        >
          <CardContent className='pt-6'>
            <Avatar className='mx-auto mb-4 h-24 w-24 ring-4 ring-blue-100 dark:ring-blue-900/30'>
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback className='bg-blue-100 text-xl font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className='mb-1 text-lg font-semibold'>{member.name}</h3>
            <p className='text-sm font-medium text-blue-600 dark:text-blue-400'>
              {member.role}
            </p>
            <p className='mt-2 mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
              {member.bio}
            </p>
            <div className='flex justify-center space-x-3'>
              {member.github && (
                <Link
                  href={member.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
                >
                  <Github className='h-5 w-5' />
                </Link>
              )}
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
                >
                  <Linkedin className='h-5 w-5' />
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
