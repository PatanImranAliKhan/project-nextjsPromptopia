"use client"

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data &&
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}

function Feed() {

  const [searchtext, setSearchtext] = useState("")
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchtext(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const fetchData = await response.json();

      setPosts(fetchData);
    }

    fetchPosts();

  }, [])


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text' placeholder='Search for a tag or a username'
          value={searchtext}
          onChange={(e) => { handleSearchChange(e) }}
          className='search_input peer'
          required
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => { }} />
    </section>
  )
}

export default Feed