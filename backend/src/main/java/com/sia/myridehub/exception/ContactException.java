package com.sia.myridehub.exception;

public class ContactException extends RuntimeException {
    
    public ContactException(String message) {
        super(message);
    }
    
    public ContactException(String message, Throwable cause) {
        super(message, cause);
    }
}