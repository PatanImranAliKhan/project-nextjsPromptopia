import { connectToDB } from '@utils/database'

import Prompt from '@models/prompt';

export const GET = async (request, {params}) => {
    try {
        const id = params.id;
        await connectToDB();

        const posts = await Prompt.find({creator: id}).populate('creator')
        console.log("posts: "+posts);
        return new Response(JSON.stringify(posts), {status: '201'})
    } catch (error) {
        return new Response("Failed to Fetch user posts", {status: 500})
    }
}