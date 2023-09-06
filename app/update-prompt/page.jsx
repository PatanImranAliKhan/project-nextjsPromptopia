"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form'

const EditPrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const details = await response.json();
        setPost({
            prompt: details.prompt,
            tag: details.tag,
        })
      }

      if(promptId) getPromptDetails()
    }, [promptId])
    

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(JSON.stringify(post))
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(response.ok) {
                router.push("/profile");
            }
        } catch (error) {
            console.log("Error while posting Prompt: "+error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <Form type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </div>
    )
}

export default EditPrompt