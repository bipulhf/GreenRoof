// import { TextLoader } from "langchain/document_loaders/fs/text";
import { Pinecone } from "@pinecone-database/pinecone";
// import { updatePinecone } from "./UpdatePineconeIndex.js";
import { queryPineconeAndGPT } from "./QueryPineconeAndGPT";

// const loader = new TextLoader("src/GreenRoof.txt");
// const docs = await loader.load();
const indexName = "greenroof";

const pinecone = new Pinecone({
    environment: "gcp-starter",
    apiKey: "de2d2aaf-d896-4772-9834-e34bf2362e74",
});

export const run = async (question: string) => {
    // const template =
    //     "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}";
    // await updatePinecone(pinecone, indexName, docs);
    return await queryPineconeAndGPT(pinecone, indexName, question);
};
