import { getLeaderboard } from '../../data/user/get-leaderboard';
import { Award, Trophy, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default async function LeaderboardPage() {
  const [leaderboard, t, locale] = await Promise.all([
    getLeaderboard(),
    getTranslations('LeaderboardPage'),
    getLocale(),
  ]);
  const isRTL = locale === 'ar';

  return (
    <div
      className='container mx-auto max-w-4xl py-12'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className='mb-12 text-center'>
        <Trophy className='mx-auto h-16 w-16 text-yellow-500' />
        <h1 className='mt-4 text-4xl font-bold'>{t('title')}</h1>
        <p className='text-muted-foreground mt-2'>{t('description')}</p>
      </div>

      <Card>
        <CardContent className='p-0'>
          {leaderboard.length === 0 ? (
            <div className='p-12 text-center'>
              <Rocket className='text-muted-foreground mx-auto mb-4 h-16 w-16' />
              <h3 className='mb-2 text-2xl font-bold'>{t('empty.title')}</h3>
              <p className='text-muted-foreground mx-auto mb-6 max-w-md'>
                {t('empty.description')}
              </p>
              <Link href='/dashboard' className={buttonVariants()}>
                {t('empty.button')}
              </Link>
            </div>
          ) : (
            <ul className='divide-y'>
              {leaderboard.map((user, index) => (
                <li
                  key={user.id}
                  className='flex items-center justify-between p-4'
                >
                  <div className='flex items-center gap-4'>
                    {isRTL ? (
                      <>
                        <span
                          className={cn(
                            'text-lg font-bold',
                            index === 0 && 'text-yellow-500',
                            index === 1 && 'text-gray-400',
                            index === 2 && 'text-orange-400',
                          )}
                        >
                          {index + 1}
                        </span>
                        {index < 3 && (
                          <Award
                            size={20}
                            className={cn(
                              index === 0 && 'text-yellow-500',
                              index === 1 && 'text-gray-400',
                              index === 2 && 'text-orange-400',
                            )}
                          />
                        )}
                        <Avatar className='h-10 w-10'>
                          <AvatarImage src={user.image ?? ''} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className='font-medium'>{user.name}</span>
                      </>
                    ) : (
                      <>
                        <span
                          className={cn(
                            'text-lg font-bold',
                            index === 0 && 'text-yellow-500',
                            index === 1 && 'text-gray-400',
                            index === 2 && 'text-orange-400',
                          )}
                        >
                          {index + 1}
                        </span>
                        {index < 3 && (
                          <Award
                            size={20}
                            className={cn(
                              index === 0 && 'text-yellow-500',
                              index === 1 && 'text-gray-400',
                              index === 2 && 'text-orange-400',
                            )}
                          />
                        )}
                        <Avatar className='h-10 w-10'>
                          <AvatarImage src={user.image ?? ''} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className='font-medium'>{user.name}</span>
                      </>
                    )}
                  </div>

                  <div>
                    <Badge variant='secondary' className='text-lg'>
                      {user.xp} {t('xp')}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
