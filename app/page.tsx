export default function HomePage() {
  return (
    <div className='h-screen grid place-items-center'>
      <h1 className='text-sm'>Coming soon</h1>
      <p className='text-xs'>{process.env.SOURCE_COMMIT}</p>
    </div>
  )
}
