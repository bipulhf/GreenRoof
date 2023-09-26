package com.bankrupted.greenroof.ai;

import dev.langchain4j.chain.ConversationalRetrievalChain;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.input.Prompt;
import dev.langchain4j.model.input.PromptTemplate;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.model.openai.OpenAiEmbeddingModel;
import dev.langchain4j.retriever.EmbeddingStoreRetriever;
import dev.langchain4j.store.embedding.EmbeddingMatch;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeEmbeddingStore;
import io.pinecone.PineconeClient;
import io.pinecone.PineconeClientConfig;
import io.pinecone.PineconeConnection;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static dev.langchain4j.model.openai.OpenAiModelName.GPT_3_5_TURBO;
import static dev.langchain4j.model.openai.OpenAiModelName.TEXT_EMBEDDING_ADA_002;
import static java.time.Duration.ofSeconds;

@Service
public class AiAssistantService {
    public Map getAiResponse(AiRequest question) {
        PineconeConnection pineconeConnection = getPineconeClient().connect("greenroof");
        EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
                .apiKey("de2d2aaf-d896-4772-9834-e34bf2362e74")
                .index("greenroof")
                .environment("gcp-starter")
                .projectId("b7da5a8")
                .build();
        OpenAiEmbeddingModel embeddingModel = OpenAiEmbeddingModel.builder()
                .apiKey("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")
                .modelName(TEXT_EMBEDDING_ADA_002)
                .build();
        int maxResults = 3;
        double minScore = 0.1;
        Embedding embeddedQuestion = embeddingModel.embed(question.getQuestion());
        List<EmbeddingMatch<TextSegment>> relevantEmbeddings = embeddingStore.findRelevant(embeddedQuestion, maxResults, minScore);
        PromptTemplate promptTemplate = PromptTemplate.from("Use the following pieces of information to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{{information}}\n\nQuestion: {{question}}");
        String information = relevantEmbeddings.stream()
                .map(match -> match.embedded().text())
                .collect(Collectors.joining("\n\n"));
        Map<String, Object> variables = new HashMap<>();
        variables.put("question", question.getQuestion());
        variables.put("information", information);
//        Prompt prompt = promptTemplate.apply(variables);
//
//        ChatLanguageModel chatLanguageModel = OpenAiChatModel.builder()
//                .apiKey("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")
//                .modelName(GPT_3_5_TURBO)
//                .temperature(0.7)
//                .timeout(ofSeconds(15))
//                .maxRetries(3)
//                .logResponses(true)
//                .logRequests(true)
//                .build();

        ConversationalRetrievalChain chain = ConversationalRetrievalChain.builder()
                .chatLanguageModel(OpenAiChatModel.withApiKey("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"))
                .retriever(EmbeddingStoreRetriever.from(embeddingStore, embeddingModel))
//                 .promptTemplate(promptTemplate)
                .build();

//        AiMessage aiMessage = chatLanguageModel.sendUserMessage(prompt.toUserMessage());
        Map<String, String> answerMap = new HashMap<>();
        answerMap.put("answer", chain.execute(question.getQuestion()));
//        answerMap.put("answer", aiMessage.text());
        return answerMap;
    }

    private static PineconeClient getPineconeClient() {
       PineconeClientConfig pineconeClientConfig = new PineconeClientConfig()
               .withApiKey("de2d2aaf-d896-4772-9834-e34bf2362e74")
               .withProjectName("b7da5a8")
               .withEnvironment("gcp-starter");
       PineconeClient pineconeClient = new PineconeClient(pineconeClientConfig);
        return pineconeClient;
    }
}
