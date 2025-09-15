'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  github?: string;
  linkedin?: string;
}

interface InteractiveTeamSectionProps {
  teamMembers: TeamMember[];
  title: string;
  description: string;
}

export const InteractiveTeamSection: React.FC<InteractiveTeamSectionProps> = ({
  teamMembers,
  title,
  description,
}) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 3));

  const locale = useLocale();
  const isRTL = locale === 'ar';

  const member = teamMembers[selected];

  const variants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <section className='bg-muted/30 px-4 py-20 lg:py-32'>
      <div className='container mx-auto max-w-7xl'>
        <div className='mb-16 text-center'>
          <h2 className='text-4xl font-bold lg:text-5xl'>{title}</h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg lg:text-xl'>
            {description}
          </p>
        </div>

        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-3'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={selected}
              variants={variants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='lg:col-span-2'
            >
              <div
                className='bg-card flex flex-col items-center gap-8 rounded-3xl p-8 shadow-lg md:flex-row'
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className='flex-shrink-0'>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className='border-primary/20 h-40 w-40 rounded-full border-4 object-cover md:h-48 md:w-48'
                  />
                </div>
                <div
                  className={cn(
                    'flex-grow',
                    isRTL ? 'text-right' : 'text-left',
                  )}
                >
                  <h3 className='text-foreground text-2xl font-bold md:text-3xl'>
                    {member.name}
                  </h3>
                  <p className='text-primary text-lg font-semibold'>
                    {member.role}
                  </p>
                  <p className='text-muted-foreground mt-4 leading-relaxed'>
                    {member.bio}
                  </p>
                  <div
                    className={cn(
                      'mt-6 flex gap-4',
                      isRTL ? 'justify-end' : 'justify-start',
                    )}
                  >
                    {member.github && (
                      <Link
                        href={member.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-primary transition-colors'
                      >
                        <Github className='h-6 w-6' />
                      </Link>
                    )}
                    {member.linkedin && (
                      <Link
                        href={member.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-primary transition-colors'
                      >
                        <Linkedin className='h-6 w-6' />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className='grid grid-cols-3 justify-center gap-4 sm:grid-cols-5 lg:grid-cols-2 lg:gap-5'>
            {teamMembers.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={cn(
                  'focus:ring-primary/50 rounded-full transition-all duration-300 ease-out focus:ring-4 focus:outline-none',
                  selected === index
                    ? 'ring-primary scale-110 shadow-lg ring-4'
                    : 'scale-90 opacity-60 hover:scale-100 hover:opacity-100',
                )}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className='aspect-square h-auto w-full rounded-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
