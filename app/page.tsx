export default function Home() {
  return (
    <div className='flex min-h-screen flex-col justify-end font-bold tracking-tight'>
      <main className='pb-12 pl-24'>
        <section>
          <h1 className='text-9xl font-bold'>Cuvii.</h1>
          <p>Design Enginner. </p>
          <p>Photographer. </p>
        </section>

        <section className='mt-12 font-mono text-xs tracking-normal'>
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
      </main>
    </div>
  )
}
