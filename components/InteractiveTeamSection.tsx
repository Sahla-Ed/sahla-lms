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
  const [selected, setSelected] = useState(0);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const member = teamMembers[selected];

  const variants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <section className="bg-muted/30 px-4 py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg lg:text-xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-3xl p-8 shadow-lg flex flex-col md:flex-row gap-8 items-center" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full h-40 w-40 md:h-48 md:w-48 object-cover border-4 border-primary/20"
                  />
                </div>
                <div className={cn("flex-grow", isRTL ? "text-right" : "text-left")}>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-semibold text-lg">{member.role}</p>
                  <p className="text-muted-foreground mt-4 leading-relaxed">{member.bio}</p>
                  <div className={cn("mt-6 flex gap-4", isRTL ? "justify-end" : "justify-start")}>
                    {member.github && (
                      <Link href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-6 w-6" />
                      </Link>
                    )}
                    {member.linkedin && (
                      <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-6 w-6" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-2 gap-4 lg:gap-5 justify-center">
            {teamMembers.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={cn(
                  'rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-primary/50',
                  selected === index
                    ? 'scale-110 ring-4 ring-primary shadow-lg'
                    : 'scale-90 opacity-60 hover:opacity-100 hover:scale-100'
                )}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-full h-auto aspect-square"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};