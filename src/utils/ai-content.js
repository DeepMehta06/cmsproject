"use server";

export default async function AIContent({ text, customInstruction = "", contentGeneration = false }) {
    let basePrompt;
    if (contentGeneration) {
        basePrompt = `You are a senior and experience content writer, you are asked to compose a elaborated, fact checked content.\
        The content should be properly bulleted using numbers, headings.\
        The content topic is give as follows: ${text}
        Below are some custom instructions for the content: ${customInstruction}`;
    }

    else {
        basePrompt = `You are a senior content reviewer. Your task will be to go through given content and rewrite in easy to understand langugage.\
        The content you need need to rephrase is as follows: ${text}
        Some custom Instructions are: ${customInstruction}`;
    }

    try {
        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.HF_TOKEN}`
            },
            body: JSON.stringify({
                model: "Qwen/Qwen3-VL-8B-Instruct:novita",
                messages: [{
                    role: "user",
                    content: basePrompt
                }],
                max_tokens: contentGeneration ? 1500 : 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.choices[0].message.content);
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error("AI GENERATION FAILED Error:", error);
        throw error;
    }
}
