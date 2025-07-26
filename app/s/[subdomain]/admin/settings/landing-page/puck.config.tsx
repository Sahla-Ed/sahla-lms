import type { Config, Slot } from '@measured/puck';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  BookOpen,
  Gamepad2,
  BarChart3,
  Rocket,
  Zap,
  Users,
  Star,
} from 'lucide-react';

const icons = {
  BookOpen: <BookOpen className='text-primary h-8 w-8' />,
  Gamepad2: <Gamepad2 className='text-primary h-8 w-8' />,
  BarChart3: <BarChart3 className='text-primary h-8 w-8' />,
  Rocket: <Rocket className='text-primary h-8 w-8' />,
  Zap: <Zap className='text-primary h-8 w-8' />,
  Users: <Users className='text-primary h-8 w-8' />,
  Star: <Star className='text-primary h-8 w-8' />,
};

type PuckComponentProps = {
  Button: { label: string; href: string; variant: 'default' | 'outline' };
  CTA: { title: string; content: Slot };
  Columns: { columns: { content: Slot }[] };
  FeatureCard: { icon: keyof typeof icons; title: string; content: Slot };
  Heading: {
    text: string;
    level: 1 | 2 | 3;
    textAlign: 'left' | 'center' | 'right';
  };
  Hero: { title: string; description: string; imageUrl: string; actions: Slot };
  LogoGrid: { title: string; images: { url: string }[] };
  Stat: { value: string; label: string };
  Text: { text: string; textAlign: 'left' | 'center' | 'right' };
  VerticalSpace: { size: '2rem' | '4rem' | '6rem' };
  Video: { url: string };
};

type RootProps = { title: string };

const getVideoEmbedUrl = (url: string) => {
  if (!url) return null;
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

export const puckConfig: Config<
  PuckComponentProps,
  RootProps,
  'layout' | 'content' | 'app'
> = {
  root: {
    fields: { title: { type: 'text' } },
    defaultProps: { title: 'Landing Page' },
    render: ({ children }) => <>{children}</>,
  },
  categories: {
    layout: {
      title: 'Layout',
      components: ['VerticalSpace', 'Columns'],
    },
    content: {
      title: 'Content',
      components: ['Heading', 'Text', 'Button', 'Stat', 'LogoGrid', 'Video'],
    },
    app: {
      title: 'App Components',
      components: ['Hero', 'FeatureCard', 'CTA'],
    },
  },
  components: {
    VerticalSpace: {
      fields: {
        size: {
          type: 'select',
          options: [
            { label: 'Small', value: '2rem' },
            { label: 'Medium', value: '4rem' },
            { label: 'Large', value: '6rem' },
          ],
        },
      },
      defaultProps: { size: '4rem' },
      render: ({ size }) => <div style={{ height: size }} />,
    },
    Columns: {
      fields: {
        columns: {
          type: 'array',
          arrayFields: { content: { type: 'slot' } },
          defaultItemProps: { content: [] },
        },
      },
      defaultProps: { columns: [{ content: [] }, { content: [] }] },
      render: ({ columns }) => (
        <div
          className='grid items-start gap-8'
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map(({ content: Content }, i) => (
            <div key={i}>
              <Content />
            </div>
          ))}
        </div>
      ),
    },

    Hero: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        imageUrl: { type: 'text', label: 'Background Image URL' },
        actions: { type: 'slot' },
      },
      defaultProps: {
        title: 'Elevate Your Learning',
        description: 'Discover a new way to learn with our modern LMS.',
        imageUrl:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
        actions: [],
      },
      render: ({ title, description, imageUrl, actions: Actions }) => (
        <section
          className='relative flex h-[60vh] min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-lg bg-cover bg-center text-white'
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className='absolute inset-0 z-0 bg-black/50' />
          <div className='relative z-10 mx-auto max-w-4xl px-4 text-center'>
            <h1 className='mb-4 text-4xl font-bold md:text-6xl'>{title}</h1>
            <p className='mb-8 text-lg opacity-90 md:text-xl'>{description}</p>
            <div className='flex justify-center gap-4'>
              <Actions />
            </div>
          </div>
        </section>
      ),
    },
    Heading: {
      fields: {
        text: { type: 'text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1', value: 1 },
            { label: 'H2', value: 2 },
            { label: 'H3', value: 3 },
          ],
        },
        textAlign: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: { text: 'Heading Text', level: 2, textAlign: 'center' },
      render: ({ text, level, textAlign }) => {
        const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
        return (
          <Tag
            className={cn('font-bold tracking-tight', {
              'text-5xl': level === 1,
              'text-3xl': level === 2,
              'text-2xl': level === 3,
              'text-left': textAlign === 'left',
              'text-center': textAlign === 'center',
              'text-right': textAlign === 'right',
            })}
          >
            {text}
          </Tag>
        );
      },
    },
    Text: {
      fields: {
        text: { type: 'textarea' },
        textAlign: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        text: 'This is a paragraph of text. You can edit it to add your own content.',
        textAlign: 'center',
      },
      render: ({ text, textAlign }) => (
        <p
          className={cn('text-lg', {
            'text-left': textAlign === 'left',
            'text-center': textAlign === 'center',
            'text-right': textAlign === 'right',
          })}
        >
          {text}
        </p>
      ),
    },
    Button: {
      fields: {
        label: { type: 'text' },
        href: { type: 'text' },
        variant: {
          type: 'radio',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      },
      defaultProps: { label: 'Click Me', href: '#', variant: 'default' },
      render: ({ label, href, variant }) => (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size: 'lg' }))}
        >
          {label}
        </Link>
      ),
    },
    Stat: {
      fields: { value: { type: 'text' }, label: { type: 'text' } },
      defaultProps: { value: '10k+', label: 'Active Students' },
      render: ({ value, label }) => (
        <div className='p-4 text-center'>
          <p className='text-4xl font-bold'>{value}</p>
          <p className='text-muted-foreground'>{label}</p>
        </div>
      ),
    },
    FeatureCard: {
      fields: {
        icon: {
          type: 'select',
          options: Object.keys(icons).map((name) => ({
            label: name,
            value: name,
          })),
        },
        title: { type: 'text' },
        content: { type: 'slot' },
      },
      defaultProps: {
        icon: 'BookOpen',
        title: 'Empower Your Teaching',
        content: [],
      },
      render: ({ icon, title, content: Content }) => (
        <Card className='flex h-full flex-col'>
          <CardHeader className='text-center'>
            <div className='bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
              {icons[icon]}
            </div>
            <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
          </CardHeader>
          <CardContent className='flex-grow text-center'>
            <Content />
          </CardContent>
        </Card>
      ),
    },
    LogoGrid: {
      fields: {
        title: { type: 'text' },
        images: {
          type: 'array',
          arrayFields: { url: { type: 'text', label: 'Logo URL' } },
        },
      },
      defaultProps: {
        title: 'Trusted by the world’s best companies',
        images: [
          {
            url: 'https://tailwindui.com/img/logos/158x48/transistor-logo-gray-400.svg',
          },
          {
            url: 'https://tailwindui.com/img/logos/158x48/reform-logo-gray-400.svg',
          },
          {
            url: 'https://tailwindui.com/img/logos/158x48/tuple-logo-gray-400.svg',
          },
          {
            url: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-400.svg',
          },
          {
            url: 'https://tailwindui.com/img/logos/158x48/statamic-logo-gray-400.svg',
          },
        ],
      },
      render: ({ title, images }) => (
        <div className='rounded-lg py-12'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <h2 className='text-center text-lg leading-8 font-semibold'>
              {title}
            </h2>
            <div className='mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
              {images.map((image, i) => (
                // @next/next/no-img-element
                <img
                  key={i}
                  src={image.url}
                  alt='Client Logo'
                  className='mx-auto h-12 w-auto object-contain'
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    Video: {
      fields: { url: { type: 'text', label: 'YouTube or Vimeo URL' } },
      defaultProps: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      render: ({ url }) => {
        const embedUrl = getVideoEmbedUrl(url);
        if (!embedUrl)
          return (
            <div className='bg-muted rounded-lg p-4 text-center'>
              Invalid video URL
            </div>
          );
        return (
          <div className='aspect-video'>
            <iframe
              className='h-full w-full rounded-lg'
              src={embedUrl}
              title='Embedded video'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        );
      },
    },
    CTA: {
      fields: {
        title: { type: 'text' },
        content: { type: 'slot', label: 'Actions' },
      },
      defaultProps: {
        title: 'Ready to get started?',
        content: [],
      },
      render: ({ title, content: Content }) => (
        <div className='bg-primary/5 rounded-lg p-8 text-center'>
          <h2 className='mb-4 text-3xl font-bold'>{title}</h2>
          <div className='flex justify-center gap-4'>
            <Content />
          </div>
        </div>
      ),
    },
  },
};
