package com.example.repository.exception;

/**
 * @author root
 *
 */
public class RecordExistException  extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * @param errorMessage
     */
    public RecordExistException(String errorMessage) {
        super(errorMessage);
    }

    /**
     * @param errorMessage
     * @param error
     */
    public RecordExistException(String errorMessage, Exception error) {
        super(errorMessage,error);
    }
}