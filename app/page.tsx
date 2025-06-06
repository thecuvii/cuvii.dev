import { clsxm } from '@zolplay/clsxm'
import { CuviiIcon } from '~/components/icons/cuvii'
import { CuviiFlicker } from '~/components/icons/cuvii-flicker'

export default function HomePage() {
  return (
    <main className='min-h-dvh bg-[#fafafa] font-mono overflow-hidden'>
      <div
        className={clsxm(
          'max-w-[33rem] mt-40 mx-auto',
          'p-8 sm:p-0',
          'space-y-8',

          'text-xs text-[#616161]',
          '[*]:uppercase',
          '[&_h2]:text-sm [&_h2]:text-[#090909] [&_h2]:mb-2 [&_h2]:relative [&_h2]:before:content-[">"] [&_h2]:before:absolute [&_h2]:before:left-[-1rem] [&_h2]:before:text-[8px] [&_h2]:before:top-1/2 [&_h2]:before:-translate-y-1/2',
          '[&_p]:text-xs',
          '[&_bold]:font-normal',
          '[&_a]:text-xs [&_a]:underline',

          'selection:bg-[#616161] selection:text-[#fafafa]',
        )}
      >
        <CuviiIcon className='size-12 text-black' />
        <CuviiFlicker />

        <section>
          <h2>INTRO</h2>

          <p>
            Will Xiang (<span className='bg-[#616161] text-[#fafafa] px-1'>Cuvii</span> online) – a software engineer by
            profession, now exploring the art and science of design.
          </p>
        </section>

        <section>
          <h2>Interests</h2>
          <p>Photography, Reading, Perpetual Learning.</p>
        </section>

        <section>
          <h2>Works</h2>

          <ul className='space-y-0.5'>
            <li>
              <a href='https://github.com/thecuvii/fuji-recipes' target='_blank' rel='noopener noreferrer'>
                FUJI RECIPES
              </a>
            </li>
            <li>
              <a href='https://github.com/thecuvii/devfools' target='_blank' rel='noopener noreferrer'>
                DEVFOOLS
              </a>
            </li>
            <li>
              <a href='https://github.com/thecuvii/remark-sandpack' target='_blank' rel='noopener noreferrer'>
                REMARK SANDPACK
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>CONTACT</h2>
          <p>
            <a href='mailto:yo@cuvii.dev'>yo@cuvii.dev</a> or{' '}
            <a href='https://x.com/thecuvii' target='_blank' rel='noopener noreferrer'>
              X
            </a>
            .
          </p>
        </section>

        <div className='animate-blink'>_</div>
      </div>
    </main>
  )
}
