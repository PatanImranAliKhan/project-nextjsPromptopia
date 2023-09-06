import React from 'react'
import PromptCard from './PromptCard'

function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='text-blue-500'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
        {data &&
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={()=> {handleEdit && handleEdit(post)}}
              handleDelete={() => {handleDelete && handleDelete(post)}}
            />
          ))
        }
      </div>
    </section>
  )
}

export default Profile