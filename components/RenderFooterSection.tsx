import Link from 'next/link';
import { useLocale } from 'next-intl';

interface RenderFooterSectionProps {
  title: string;
  links: { name: string; href: string }[];
  type: string;
  hoveredSection: string | null;
  hoveredIndex: number | null;
  handleMouseEnter: (section: string, index: number) => void;
  handleMouseLeave: () => void;
}

export default function RenderFooterSection({
  title,
  links,
  type,
  hoveredSection,
  hoveredIndex,
  handleMouseEnter,
  handleMouseLeave,
}: RenderFooterSectionProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className='space-y-4'>
      <h3
        className={`text-foreground mb-6 text-lg font-semibold ${
          isRTL ? 'text-right' : 'text-left'
        }`}
      >
        {title}
      </h3>
      <ul className='space-y-3'>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={`text-muted-foreground hover:text-foreground relative block transition-colors duration-200 ${
                hoveredSection === type && hoveredIndex === index
                  ? 'text-foreground'
                  : ''
              } ${isRTL ? 'text-right' : 'text-left'}`}
              onMouseEnter={() => handleMouseEnter(type, index)}
              onMouseLeave={handleMouseLeave}
            >
              {link.name}
              {hoveredSection === type && hoveredIndex === index && (
                <span
                  className={`text-primary absolute top-1/2 -translate-y-1/2 ${
                    isRTL ? '-right-2' : '-left-2'
                  }`}
                >
                  {isRTL ? '←' : '→'}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
