import Feed from "@components/Feed"

export default function Home() {
  return (
    <main>
      <div className='w-full text-center'>
        <h1 className='head_text text-center'>
          Discover & Share &nbsp;
          <br className='md:hidden'/>
          <span className='text-center text-orange-500'>AI-Powered Prompts</span>
        </h1>
        <p className='desc text-center'>Promptopia Is an open source AI prompting tool for modern world to discover, create and share creative prompts.</p>
      </div>

      <Feed />
    </main>
  )
}
