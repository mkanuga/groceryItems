package com.example.repository.exception;

/**
 * @author root
 *
 */
public class RecordNotFoundException  extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * @param errorMessage
     */
    public RecordNotFoundException(String errorMessage) {
        super(errorMessage);
    }

    /**
     * @param errorMessage
     * @param error
     */
    public RecordNotFoundException(String errorMessage, Exception error) {
        super(errorMessage,error);
    }
}