"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState("")
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const fetchData = await response.json();
      setPosts(fetchData);
    }

    if (session?.user.id) fetchPosts();
  }, [])


  const handleEdit = async (post) => {
    router.push(`update-prompt/?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure want to delete this prompt ?")
    if (!hasConfirmed) return;

    try {
      const response = await fetch(`/api/prompt/${post._id.toString()}`, {
        method: 'DELETE'
      })
      const filteredPosts = posts.filter((p) => {
        p._id!==post._id
      })
      setPosts(filteredPosts)
    } catch (error) {

    }
  }

  return (
    <Profile name="My"
      desc="Welcome to your Personalized Profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    >

    </Profile>
  )
}

export default MyProfile