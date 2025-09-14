'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';

export default function TrustedBySection() {
  const t = useTranslations('SahlaPlatform.HomePage.trustedBy');
  const locale = useLocale();

  const logos = [
    { src: '/logosss/coursera.png', name: 'Coursera' },
    { src: '/logosss/udemy.webp', name: 'Udemy' },
    { src: '/logosss/Teachable.png', name: 'Teachable' },
    { src: '/logosss/mesq.png', name: 'Mesq' },
    { src: '/logosss/Kajabi.png', name: 'Kajabi' },
    { src: '/logosss/thinkific.png', name: 'Thinkific' },
  ];

  const displayedLogos = locale === 'ar' ? [...logos].reverse() : logos;

  return (
    <section className='bg-accent py-16'>
      <div className='container mx-auto text-center'>
        <ScrollAnimate>
          <h3 className='text-foreground mb-4 text-xl font-bold tracking-tight'>
            {t('title')}
          </h3>
        </ScrollAnimate>
        <div className='mt-8'>
          <div dir='ltr'>
            <Marquee
              gradient={true}
              gradientColor='hsl(var(--background))'
              speed={40}
              className='flex w-full justify-evenly'
              direction={locale === 'ar' ? 'right' : 'left'}
            >
              {displayedLogos.map((logo, index) => (
                <div
                  key={index}
                  className='mx-12 flex items-center justify-center'
                  title={logo.name}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={100}
                    height={40}
                    className='h-16 w-fit object-contain opacity-100 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
