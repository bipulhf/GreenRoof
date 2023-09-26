import { Pinecone } from "@pinecone-database/pinecone";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";

export const queryPineconeAndGPT = async (
    pinecone: Pinecone,
    indexName: string,
    question: string
) => {
    const index = pinecone.Index(indexName);
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: "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",
    }).embedQuery(question);

    const vectorData = await embeddings;

    const queryResponse = await index.query({
        topK: 3,
        vector: vectorData,
        includeMetadata: true,
        includeValues: true,
    });

    if (queryResponse.matches?.length) {
        console.log(queryResponse.matches.length);
        const llm = new OpenAI({
            openAIApiKey: "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",
            temperature: 0.7,
        });
        const chain = loadQAStuffChain(llm);
        const concatenatedPageContent = queryResponse.matches
            .map((match) => match.metadata!.pageContent)
            .join();
        const result = await chain.call({
            input_documents: [
                new Document({ pageContent: concatenatedPageContent }),
            ],
            question: question,
        });

        return result;
    }
};
