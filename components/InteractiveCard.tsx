'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle } from 'lucide-react';
import Image from 'next/image';


interface InteractiveCardProps {
  onColorChange: (color: string) => void;
  brandColor: string;
}

export function InteractiveCard({ onColorChange, brandColor }: InteractiveCardProps) {
  const t = useTranslations('SahlaPlatform.HomePage.whySahla.feature1_interactive');
  const [logo, setLogo] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        setShowSuccess(true);
      };
      reader.readAsDataURL(file);
    }
  };


  const text = t('success_message');
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative mt-8 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg min-h-[284px]">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-4"
          >

            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('colors_label')}</span>
              <div className="mt-2 flex gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => onColorChange(color)} 
                    className={cn(
                      "w-8 h-8 rounded-full transition-transform hover:scale-110 border-2",
                      brandColor === color ? 'border-foreground' : 'border-transparent'
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            

            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('logo_label')}</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center flex flex-col items-center justify-center transition-colors hover:border-primary hover:bg-muted/30"
              >
                <div className="w-16 h-16 rounded-lg mx-auto mb-3 flex items-center justify-center transition-colors" style={{ backgroundColor: brandColor, color: 'white' }}>
                  {logo ? <Image src={logo} alt="logo" width={48} height={48} className="rounded-md" /> : <UploadCloud size={24} />}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('logo_button')}</p>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full min-h-[220px]"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />

            <motion.h3
              className="text-xl font-semibold text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span key={index} variants={wordVariants} className="inline-block mr-2">
                  {word}
                </motion.span>
              ))}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}