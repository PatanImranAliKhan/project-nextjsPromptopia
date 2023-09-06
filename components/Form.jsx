import React from 'react'
import Link from 'next/link'

function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc test-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        organization run wild with the AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span
            className='font-satoshi font-semibold text-base text-grey-700'>
            Your AI Propt
          </span>
          <br />
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({
              ...post,
              prompt: e.target.value
            })}
            placeholder='Write your Prompt here...'
            className='font_textarea w-[90%] min-h-[250px]' required>

          </textarea>
        </label>

        <label>
          <span
            className='font-satoshi font-semibold text-base text-grey-700'>
            Tag
            <span className='font-normal'>(#product, #web-development)</span>
          </span>
          <br />
          <input
            value={post.tag}
            onChange={(e) => setPost({
              ...post,
              tag: e.target.value
            })}
            placeholder='#tag'
            className='font_input w-[90%] min-h-[40px]' required />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-grey-500 text-sm'>
            Cancel
          </Link>

          <button
            type='button'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white'
            onClick={handleSubmit}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form