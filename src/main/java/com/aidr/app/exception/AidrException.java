package com.aidr.app.exception;

public class AidrException extends Exception {

    public AidrException() {
    }

    public AidrException(String message) {
        super(message);
    }

    public AidrException(String message, Throwable cause) {
        super(message, cause);
    }

}
