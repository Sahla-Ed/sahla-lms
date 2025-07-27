import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

export const OurTeamSection: React.FC<OurTeamSectionProps> = ({ teamMembers }) => {
  return (
    <section className='py-20 px-4 bg-muted/30'>
      <div className='container mx-auto max-w-7xl'>
        <h2 className='text-4xl font-bold text-center mb-12'>Meet Our Team</h2>
        <p className='text-muted-foreground mx-auto max-w-2xl text-xl text-center mb-16'>
          The passionate individuals behind Sahla&apos;s success
        </p>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className='from-card to-muted/5 border-0 bg-gradient-to-br text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'
            >
              <CardContent className='pt-6'>
                <Avatar className='ring-primary/10 mx-auto mb-4 h-24 w-24 ring-4'>
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className='bg-primary/10 text-primary text-xl font-bold'>
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className='mb-1 font-semibold'>{member.name}</h3>
                <p className='text-muted-foreground text-sm'>{member.role}</p>
                <p className='text-muted-foreground mb-4 text-xs mt-2 leading-relaxed'>
                  {member.bio}
                </p>
                <div className='flex justify-center space-x-3'>
                  {member.github && (
                    <Link
                      href={member.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-muted-foreground hover:text-primary transition-colors'
                    >
                      <Github className='h-5 w-5' />
                    </Link>
                  )}
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-muted-foreground hover:text-primary transition-colors'
                    >
                      <Linkedin className='h-5 w-5' />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div >
    </section >
  );
};
