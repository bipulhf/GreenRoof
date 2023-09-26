package com.bankrupted.greenroof.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/ai")
@RequiredArgsConstructor
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    @PostMapping("")
    public ResponseEntity<?> getAiResponse(@RequestBody AiRequest question) {
        return new ResponseEntity<>(aiAssistantService.getAiResponse(question), HttpStatus.OK);
    }

}
