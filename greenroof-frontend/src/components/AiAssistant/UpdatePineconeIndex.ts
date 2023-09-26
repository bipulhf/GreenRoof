import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const updatePinecone = async (
    pinecone: Pinecone,
    indexName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs: Document<Record<string, any>>[]
) => {
    const index = pinecone.Index(indexName);
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: "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",
    });
    const batchSize = 100;

    for (const doc of docs) {
        const txtPath = doc.metadata.source;
        const text = doc.pageContent;
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 800,
            chunkOverlap: 200,
        });
        const chunks = await textSplitter.createDocuments([text]);
        console.log("Chunks: " + chunks.length);
        const embeddingsArrays = await embeddings.embedDocuments(
            chunks.map((chunk) => chunk.pageContent.replace("\n\n", "\n"))
        );

        let batch = [];
        for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            console.log("Chunk : " + idx);
            const vector = {
                id: `${txtPath}_${idx * ((Math.random() + 1) * 1137)}`,
                values: embeddingsArrays[idx],
                metadata: {
                    ...chunk.metadata,
                    loc: JSON.stringify(chunk.metadata.loc),
                    pageContent: chunk.pageContent,
                    txtPath: txtPath,
                },
            };
            batch.push(vector);

            if (batch.length === batchSize || idx === chunks.length - 1) {
                console.log("Upserting");
                await index.upsert(batch);
                batch = [];
            }
        }
    }
};
