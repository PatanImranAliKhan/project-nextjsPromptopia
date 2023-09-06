import { connectToDB } from '@utils/database'

import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const id = params.id;

        const getPrompt = await Prompt.findById(id).populate('creator')
        if (!getPrompt) {
            return new Response("prompt not found", { status: 404 })
        }
        return new Response(JSON.stringify(getPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to Fetch prompts", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    try {
        await connectToDB();
        const id = params.id;
        const { prompt, tag } = await request.json();

        const getPrompt = await Prompt.findById(id).populate('creator')
        if (!getPrompt) {
            return new Response("prompt not found", { status: 404 })
        }
        getPrompt.prompt = prompt;
        getPrompt.tag = tag;
        await getPrompt.save();

        return new Response(JSON.stringify(getPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to Fetch prompts", { status: 500 })
    }
}

export const DELETE = async (request) => {
    try {
        await connectToDB();
        const id = params.id;

        await Prompt.findByIdAndDelete(id).populate('creator')
        return new Response("prompt deleted Successfully", { status: 201 })
    } catch (error) {
        return new Response("Failed to Fetch prompts", { status: 500 })
    }
}