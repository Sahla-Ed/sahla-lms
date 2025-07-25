import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
  return (
    <>
      <section className='gradient-bg bg-grid relative flex min-h-screen items-center overflow-hidden'>
        <div className='relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
            <div
              className={`text-gray-900 ${styles['animate-fade-in']} ${styles['animate-slide-up']}`}
            >
              <h1 className='mb-6 text-5xl leading-tight font-bold lg:text-7xl'>
                Build Something
                <span> </span>
                <span className='text-gray-900'>Amazing</span>
              </h1>
              <p className='mb-8 text-xl leading-relaxed text-gray-700 lg:text-2xl'>
                Transform your ideas into reality with our cutting-edge
                solutions and expert guidance.
              </p>
              <div
                className={`flex flex-col gap-4 sm:flex-row ${styles['animate-slide-up']}`}
              >
                <Link
                  href={'/start'}
                  className='rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl'
                >
                  Start Your Journey
                </Link>
              </div>
            </div>
            <div className='relative ms-20'>
              <div className={styles['animate-float']}>
                <div className='rounded-3xl border border-gray-200 bg-white/80 p-8 backdrop-blur-lg'>
                  <div className='space-y-4'>
                    <div className='h-4 w-3/4 rounded-full bg-[#deab8c]'></div>
                    <div className='h-4 w-1/2 rounded-full bg-[#e0c2af]'></div>
                    <div className='h-4 w-5/6 rounded-full bg-[#db9c74]'></div>
                    <div className='mt-6 grid grid-cols-2 gap-4'>
                      <div className='rounded-xl bg-white p-4 text-center shadow'>
                        <div className='text-2xl font-bold text-gray-900'>
                          250+
                        </div>
                        <div className='text-sm text-gray-700'>Projects</div>
                      </div>
                      <div className='rounded-xl bg-white p-4 text-center shadow'>
                        <div className='text-2xl font-bold text-gray-900'>
                          98%
                        </div>
                        <div className='text-sm text-gray-700'>
                          Success Rate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Floating Elements --> */}
        <div
          className={`absolute top-20 left-24 h-4 w-4 rounded-full bg-[#EDECE8] ${styles['animate-pulse']}`}
        ></div>
        <div
          className={`absolute top-40 right-20 h-6 w-6 rounded-full bg-[#EDECE8] ${styles['animate-bounce']}`}
        ></div>
        <div
          className={`absolute bottom-40 left-20 h-3 w-3 rounded-full bg-[#EDECE8] ${styles['animate-ping']}`}
        ></div>
      </section>

      {/* <!-- Features Section --> */}
      <section className={`bg-[#EDECE8] py-20 ${styles['animate-slide-up']}`}>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold text-gray-900 lg:text-5xl'>
              Why Choose Us?
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-gray-600'>
              We deliver exceptional results through innovation, expertise, and
              dedication to your success.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div
              className={`rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 ${styles['card-hover']} ${styles['card-pop-1']}`}
            >
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900'>
                <svg
                  className='h-6 w-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  ></path>
                </svg>
              </div>
              <h3 className='mb-4 text-2xl font-bold text-gray-900'>
                Empower Your Teaching
              </h3>
              <p className='leading-relaxed text-gray-600'>
                Seamless tools for instructors to create, publish, and manage
                high-quality educational content with ease.
              </p>
            </div>

            <div
              className={`rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 ${styles['card-hover']} ${styles['card-pop-2']}`}
            >
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-700'>
                <svg
                  className='h-6 w-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <h3 className='mb-4 text-2xl font-bold text-gray-900'>
                Discover Your Learning Path
              </h3>
              <p className='leading-relaxed text-gray-600'>
                Students easily find relevant courses and engage with modern,
                interactive content tailored to their needs.
              </p>
            </div>

            <div
              className={`rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 ${styles['card-hover']} ${styles['card-pop-3']}`}
            >
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500'>
                <svg
                  className='h-6 w-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  ></path>
                </svg>
              </div>
              <h3 className='mb-4 text-2xl font-bold text-gray-900'>
                Diverse & In-Demand Content
              </h3>
              <p className='leading-relaxed text-gray-600'>
                Access a rich library of specialized courses, continuously
                updated to align with current industry demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!--  -------------------------------------------------------------------------------- -->
    <!--  -------------------------------------------------------------------------------- --> */}
      <section className='bg-white py-20 text-gray-900'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* <!-- Header --> */}
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl leading-tight font-light text-gray-900 lg:text-5xl'>
              Where your business keeps growing
            </h2>
          </div>

          <div className='grid grid-cols-1 items-start gap-16 lg:grid-cols-2'>
            {/* <!-- Features List --> */}
            <div className='space-y-8'>
              {/* <!-- Create Feature --> */}
              <div
                className='feature-item active cursor-pointer rounded-lg p-6'
                data-feature='create'
              >
                <div className='flex items-start space-x-4'>
                  <div className='mt-1 h-16 w-1 flex-shrink-0 rounded-full bg-gray-300'></div>
                  <div>
                    <h3 className='mb-3 text-2xl font-semibold text-gray-900'>
                      Create
                    </h3>
                    <p className='mb-4 text-lg leading-relaxed text-gray-500'>
                      Start fast with intuitive, no-code site and product
                      builders.
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Sell Feature --> */}
              <div
                className='feature-item cursor-pointer rounded-lg p-6'
                data-feature='sell'
              >
                <div className='flex items-start space-x-4'>
                  <div className='mt-1 h-16 w-1 flex-shrink-0 rounded-full bg-gray-300'></div>
                  <div>
                    <h3 className='mb-3 text-2xl font-semibold text-gray-700'>
                      Sell
                    </h3>
                    <p className='mb-4 text-lg leading-relaxed text-gray-500'>
                      Do not just sell—optimize your checkout flow with built-in
                      sales features.
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Engage Feature --> */}
              <div
                className='feature-item cursor-pointer rounded-lg p-6'
                data-feature='engage'
              >
                <div className='flex items-start space-x-4'>
                  <div className='mt-1 h-16 w-1 flex-shrink-0 rounded-full bg-gray-300'></div>
                  <div>
                    <h3 className='mb-3 text-2xl font-semibold text-gray-700'>
                      Engage
                    </h3>
                    <p className='mb-4 text-lg leading-relaxed text-gray-500'>
                      Nurture progress with an excellent student-side
                      experience, including community.
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Analyze Feature --> */}
              <div
                className='feature-item cursor-pointer rounded-lg p-6'
                data-feature='analyze'
              >
                <div className='flex items-start space-x-4'>
                  <div className='mt-1 h-16 w-1 flex-shrink-0 rounded-full bg-gray-300'></div>
                  <div>
                    <h3 className='mb-3 text-2xl font-semibold text-gray-700'>
                      Analyze
                    </h3>
                    <p className='mb-4 text-lg leading-relaxed text-gray-500'>
                      Track sales and student performance with on-demand
                      reporting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Interface Mockup --> */}
            <div className='relative'>
              <div className='mockup-shadow overflow-hidden rounded-xl border border-gray-200 bg-gray-50'>
                {/* <!-- Browser Header --> */}
                <div className='flex items-center space-x-2 bg-gray-200 px-4 py-3'>
                  <div className='flex space-x-2'>
                    <div className='h-3 w-3 rounded-full bg-red-400'></div>
                    <div className='h-3 w-3 rounded-full bg-yellow-300'></div>
                    <div className='h-3 w-3 rounded-full bg-green-400'></div>
                  </div>
                </div>

                {/* <!-- Main Interface --> */}
                <div className='bg-white p-6'>
                  {/* <!-- Top Bar --> */}
                  <div className='mb-6 flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Understanding Light and Shadow
                    </h3>
                    <div className='flex items-center space-x-3'>
                      <button className='rounded-md border bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700'>
                        Publish
                      </button>
                      <button className='p-2 text-gray-500 hover:text-gray-700'>
                        <svg
                          className='h-5 w-5'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-6'>
                    {/* <!-- Main Content Area --> */}
                    <div className='col-span-8'>
                      {/* <!-- Video Section --> */}
                      <div className='mb-6 rounded-lg bg-gray-50 p-4'>
                        <div className='mb-3 flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <div className='h-6 w-6 rounded bg-gray-300'></div>
                            <span className='text-sm font-medium text-gray-700'>
                              VIDEO
                            </span>
                          </div>
                          <button className='p-1 text-gray-500 hover:text-gray-700'>
                            <svg
                              className='h-4 w-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
                            </svg>
                          </button>
                        </div>

                        {/* <!-- Video Thumbnail --> */}
                        <div className='relative mb-3 aspect-video overflow-hidden rounded-lg bg-gray-200'>
                          <Image
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%23e5e7eb'/%3E%3Ctext x='200' y='112.5' font-family='Arial' font-size='16' fill='%23374151' text-anchor='middle'%3EVideo Preview%3C/text%3E%3C/svg%3E"
                            alt='Video preview'
                            className='h-full w-full object-cover'
                          />
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='bg-opacity-90 flex h-12 w-12 items-center justify-center rounded-full bg-white'>
                              <svg
                                className='ml-1 h-5 w-5 text-gray-800'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z'></path>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Video Info --> */}
                        <div className='text-sm text-gray-600'>
                          <div className='mb-1 font-medium text-gray-900'>
                            LightShadow.mov
                          </div>
                          <div className='flex items-center space-x-4 text-xs'>
                            <span className='flex items-center'>
                              <svg
                                className='mr-1 h-3 w-3'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                                  clipRule='evenodd'
                                ></path>
                              </svg>
                              10:22
                            </span>
                            <span className='flex items-center'>
                              <svg
                                className='mr-1 h-3 w-3'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                  clipRule='evenodd'
                                ></path>
                              </svg>
                              Subtitles: English
                            </span>
                            <span className='flex items-center'>
                              <svg
                                className='mr-1 h-3 w-3'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                  clipRule='evenodd'
                                ></path>
                              </svg>
                              Download link hidden
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Text Section --> */}
                      <div className='rounded-lg bg-gray-50 p-4'>
                        <div className='mb-3 flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <div className='h-6 w-6 rounded bg-gray-300'></div>
                            <span className='text-sm font-medium text-gray-700'>
                              TEXT & PHOTOS
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <button className='rounded bg-gray-200 px-3 py-1 text-sm text-gray-700'>
                              Edit
                            </button>
                            <button className='p-1 text-gray-500 hover:text-gray-700'>
                              <svg
                                className='h-4 w-4'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* <!-- Text Content Lines --> */}
                        <div className='space-y-2'>
                          <div className='h-3 w-full rounded bg-gray-300'></div>
                          <div className='h-3 w-4/5 rounded bg-gray-300'></div>
                          <div className='h-3 w-3/4 rounded bg-gray-300'></div>
                          <div className='h-3 w-full rounded bg-gray-300'></div>
                          <div className='h-3 w-2/3 rounded bg-gray-300'></div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Sidebar --> */}
                    <div className='col-span-4'>
                      <div className='rounded-lg bg-gray-50 p-4'>
                        <h4 className='mb-4 font-semibold text-gray-900'>
                          Add content
                        </h4>

                        {/* <!-- Content Types --> */}
                        <div className='space-y-4'>
                          <div>
                            <h5 className='mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase'>
                              CONTENT
                            </h5>
                            <div className='grid grid-cols-2 gap-2'>
                              <button className='rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300'>
                                <div className='mx-auto mb-1 h-6 w-6 rounded bg-gray-400'></div>
                                <div className='text-xs text-gray-600'>
                                  Text & Photos
                                </div>
                              </button>
                              <button className='rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300'>
                                <div className='mx-auto mb-1 h-6 w-6 rounded bg-gray-900'></div>
                                <div className='text-xs text-gray-600'>
                                  Video
                                </div>
                              </button>
                            </div>
                          </div>

                          <div>
                            <div className='grid grid-cols-2 gap-2'>
                              <button className='rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300'>
                                <div className='mx-auto mb-1 h-6 w-6 rounded bg-gray-400'></div>
                                <div className='text-xs text-gray-600'>
                                  Audio
                                </div>
                              </button>
                              <button className='rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300'>
                                <div className='mx-auto mb-1 h-6 w-6 rounded bg-gray-400'></div>
                                <div className='text-xs text-gray-600'>
                                  Banner Image
                                </div>
                              </button>
                            </div>
                          </div>

                          <div>
                            <h5 className='mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase'>
                              EDUCATIONAL TOOLS
                            </h5>
                            <button className='w-full rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300'>
                              <div className='mx-auto mb-1 h-6 w-6 rounded bg-gray-400'></div>
                              <div className='text-xs text-gray-600'>Quiz</div>
                            </button>
                            <div>
                              <button className='w-full rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300'>
                                <div className='mx-auto mb-1 h-6 w-6 rounded bg-gray-400'></div>
                                <div className='text-xs text-gray-600'>
                                  Code Playground
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--  -------------------------------------------------------------------------------- -->
    <!--  -------------------------------------------------------------------------------- --> */}

      {/* <!-- CTA Section --> */}
      <section className='bg-[#EDECE8] py-20'>
        <div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
          <h2 className='mb-6 text-4xl font-bold text-gray-900 lg:text-5xl'>
            Ready to Get Started?
          </h2>
          <p className='mb-8 text-xl leading-relaxed text-gray-700'>
            Join thousands of satisfied customers who have transformed their
            business with our solutions.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link
              href={'/start'}
              className='rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl'
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
