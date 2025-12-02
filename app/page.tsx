import { ShenzhenClock } from './components/shenzhen-clock'

export default function Home() {
  return (
    <div className='flex min-h-dvh flex-col justify-end font-bold tracking-tight'>
      <main className='px-6 pb-12 sm:px-10 md:px-16 lg:pl-24'>
        <section>
          <h1 className='text-6xl font-bold sm:text-7xl md:text-8xl lg:text-9xl'>Cuvii.</h1>
          <p className='ml-1'>Design Engineer. </p>
          <p className='ml-1'>Street Photographer. </p>
        </section>

        <section className='mt-12 flex items-end justify-between px-1'>
          <section className='font-mono text-xs tracking-normal'>
            <ul>
              <li>
                <a className='underline-offset-4 hover:underline' href='mailto:yo@cuvii.dev'>
                  yo@cuvii.dev
                </a>
              </li>
              <li>
                <a className='hover:underline' href='https://x.com/thecuvii'>
                  x.com/thecuvii
                </a>
              </li>
              <li>
                <a className='hover:underline' href='https://github.com/thecuvii'>
                  github.com/thecuvii
                </a>
              </li>
              <li>
                <a className='hover:underline' href='https://unsplash.com/@cuvii'>
                  unsplash.com/@cuvii
                </a>
              </li>
            </ul>
          </section>

          <ShenzhenClock />
        </section>
      </main>
    </div>
  )
}
