export default function Home() {
  return (
    <div className='h-screen w-screen pb-4'>
      <div className='mx-auto flex max-w-screen-md flex-col'>
        <header className='mt-4 flex shrink-0 items-center gap-2 text-[15px] font-medium'>
          <span className='block size-3.5 rounded-full bg-[hsl(252,67%,2%)]' />
          Cuvii
        </header>

        <main className='mx-auto mt-4 w-full grow rounded-lg bg-theme-foreground p-8 shadow-[0_1px_6px_rgba(0,0,0,0.035)]'>
          <section className='prose prose-zinc'>
            <p className='leading-relaxed'>
              I'm a <span className='text-base font-medium text-[hsl(252,67%,2%)]'>Fullstack Developer</span> dedicated
              to crafting polished web experiences with a clean UIs and intuitive interfaces.
            </p>

            <p className='leading-relaxed'>
              I have a passion for learning and am constantly seeking to improve my skills mostly through reading,
              writing, and hands-on experimentation.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
