package com.bankrupted.greenroof.advice;

import com.bankrupted.greenroof.exception.GenericException;
import com.bankrupted.greenroof.exception.InvalidVerificationTokenException;
import com.bankrupted.greenroof.exception.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ServerErrorException;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    private static Map<String, String> errorHandling(String ex, HttpStatus httpStatus) {
        Map<String, String> errors = new HashMap<>();
        errors.put("status", String.valueOf(httpStatus.value()));
        errors.put("error", httpStatus.toString());
        errors.put("message", ex);
        errors.put("time", new Date().toString());
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidArguments(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserAlreadyExistsException.class)
    public Map<String, String> userNotFound(UserAlreadyExistsException ex) {
        Map<String, String> errors = errorHandling(ex.getMessage(), HttpStatus.CONFLICT);
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidVerificationTokenException.class)
    public Map<String, String> tokenNotFound(InvalidVerificationTokenException ex) {
        Map<String, String> errors = errorHandling(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        return errors;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    public Map<String, String> noSuchElement(NoSuchElementException ex) {
        Map<String, String> errors = errorHandling(ex.getMessage(), HttpStatus.NOT_FOUND);
        return errors;
    }

    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public Map<String, String> methodNotSupported (HttpRequestMethodNotSupportedException ex) {
        Map<String, String> errors = errorHandling(ex.getMessage(), HttpStatus.METHOD_NOT_ALLOWED);
        return errors;
    }

    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    @ExceptionHandler(ServerErrorException.class)
    public Map<String, String> serverError (ServerErrorException ex) {
        Map<String, String> errors = errorHandling(ex.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
        return errors;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(IndexOutOfBoundsException.class)
    public Map<String, String> indexOutOfBoundException (IndexOutOfBoundsException ex) {
        Map<String, String> errors = errorHandling(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return errors;
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(BadCredentialsException.class)
    public Map<String, String> credentialsNotMatch(BadCredentialsException ex) {
        Map<String, String> errors = errorHandling("Username or Password does not exists.", HttpStatus.FORBIDDEN);
        return errors;
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(GenericException.class)
    public Map<String, String> followException(GenericException ex) {
        Map<String, String> errors = errorHandling(ex.getMessage(), HttpStatus.FORBIDDEN);
        return errors;
    }
}

