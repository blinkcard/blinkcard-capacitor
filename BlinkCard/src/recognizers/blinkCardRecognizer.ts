import { Recognizer, RecognizerResult } from '../recognizer'
import {
    Date,
    Point,
    Quadrilateral,
    
    LegacyCardIssuer,
    Issuer,
    BlinkCardProcessingStatus,
    BlinkCardAnonymizationMode,
    CardNumberAnonymizationSettings,
    BlinkCardAnonymizationSettings,
    DataMatchResult,
    ImageExtensionFactors,
    
} from '../types'

/* tslint:disable:no-unused-variable */

/**
 * Result object for BlinkCardRecognizer.
 */
export class BlinkCardRecognizerResult extends RecognizerResult {

    
    /**
     * The payment card number.
     */
    cardNumber: string;
    
    /**
     * The payment card number prefix.
     */
    cardNumberPrefix: string;
    
    /**
     * The payment card number is valid
     */
    cardNumberValid: boolean;
    
    /**
     *  Payment card's security code/value.
     */
    cvv: string;
    
    /**
     * Digital signature of the recognition result. Available only if enabled with signResult property.
     */
    digitalSignature: string;
    
    /**
     * Version of the digital signature. Available only if enabled with signResult property.
     */
    digitalSignatureVersion: number;
    
    /**
     * The payment card's expiry date.
     */
    expiryDate: Date;
    
    /**
     * Wheater the first scanned side is blurred.
     */
    firstSideBlurred: boolean;
    
    /**
     * Full image of the payment card from first side recognition.
     */
    firstSideFullDocumentImage: string;
    
    /**
     * Payment card's IBAN.
     */
    iban: string;
    
    /**
     * Payment card's issuing network.
     */
    issuer: Issuer;
    
    /**
     * Information about the payment card owner (name, company, etc.).
     */
    owner: string;
    
    /**
     * Status of the last recognition process.
     */
    processingStatus: BlinkCardProcessingStatus;
    
    /**
     * Returns true if recognizer has finished scanning first side and is now scanning back side,
         * false if it's still scanning first side.
     */
    scanningFirstSideDone: boolean;
    
    /**
     * Wheater the second scanned side is blurred.
     */
    secondSideBlurred: boolean;
    
    /**
     * Full image of the payment card from second side recognition.
     */
    secondSideFullDocumentImage: string;
    

    constructor(nativeResult: any) {
        super(nativeResult.resultState);
        
        /**
         * The payment card number.
         */
        this.cardNumber = nativeResult.cardNumber;
        
        /**
         * The payment card number prefix.
         */
        this.cardNumberPrefix = nativeResult.cardNumberPrefix;
        
        /**
         * The payment card number is valid
         */
        this.cardNumberValid = nativeResult.cardNumberValid;
        
        /**
         *  Payment card's security code/value.
         */
        this.cvv = nativeResult.cvv;
        
        /**
         * Digital signature of the recognition result. Available only if enabled with signResult property.
         */
        this.digitalSignature = nativeResult.digitalSignature;
        
        /**
         * Version of the digital signature. Available only if enabled with signResult property.
         */
        this.digitalSignatureVersion = nativeResult.digitalSignatureVersion;
        
        /**
         * The payment card's expiry date.
         */
        this.expiryDate = nativeResult.expiryDate != null ? new Date(nativeResult.expiryDate) : null;
        
        /**
         * Wheater the first scanned side is blurred.
         */
        this.firstSideBlurred = nativeResult.firstSideBlurred;
        
        /**
         * Full image of the payment card from first side recognition.
         */
        this.firstSideFullDocumentImage = nativeResult.firstSideFullDocumentImage;
        
        /**
         * Payment card's IBAN.
         */
        this.iban = nativeResult.iban;
        
        /**
         * Payment card's issuing network.
         */
        this.issuer = nativeResult.issuer;
        
        /**
         * Information about the payment card owner (name, company, etc.).
         */
        this.owner = nativeResult.owner;
        
        /**
         * Status of the last recognition process.
         */
        this.processingStatus = nativeResult.processingStatus;
        
        /**
         * Returns true if recognizer has finished scanning first side and is now scanning back side,
         * false if it's still scanning first side.
         */
        this.scanningFirstSideDone = nativeResult.scanningFirstSideDone;
        
        /**
         * Wheater the second scanned side is blurred.
         */
        this.secondSideBlurred = nativeResult.secondSideBlurred;
        
        /**
         * Full image of the payment card from second side recognition.
         */
        this.secondSideFullDocumentImage = nativeResult.secondSideFullDocumentImage;
        
    }
}

/**
 * Recognizer used for scanning credit/debit cards.
 */
export class BlinkCardRecognizer extends Recognizer {

    
    /**
     * Defines whether blured frames filtering is allowed
         * 
         * 
     */
    allowBlurFilter: boolean;
    
    /**
     * Defines whether sensitive data should be redacted from the result.
         * 
         * 
     */
    anonymizationSettings: BlinkCardAnonymizationSettings;
    
    /**
     * Should extract CVV
         * 
         * 
     */
    extractCvv: boolean;
    
    /**
     * Should extract the payment card's month of expiry
         * 
         * 
     */
    extractExpiryDate: boolean;
    
    /**
     * Should extract the payment card's IBAN
         * 
         * 
     */
    extractIban: boolean;
    
    /**
     * Should extract the card owner information
         * 
         * 
     */
    extractOwner: boolean;
    
    /**
     * Property for setting DPI for full document images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         * 
         * 
     */
    fullDocumentImageDpi: number;
    
    /**
     * Image extension factors for full document image.
         * 
         * @see CImageExtensionFactors
         * 
     */
    fullDocumentImageExtensionFactors: ImageExtensionFactors;
    
    /**
     * Pading is a minimum distance from the edge of the frame and is defined as a percentage of the frame width. Default value is 0.0f and in that case
         * padding edge and image edge are the same.
         * Recommended value is 0.02f.
         * 
         * 
     */
    paddingEdge: number;
    
    /**
     * Sets whether full document image of ID card should be extracted.
         * 
         * 
     */
    returnFullDocumentImage: boolean;
    
    /**
     * Whether or not recognition result should be signed.
         * 
         * 
     */
    signResult: boolean;
    

    constructor() {
        super('BlinkCardRecognizer');
        
        /**
         * Defines whether blured frames filtering is allowed
         * 
         * 
         */
        this.allowBlurFilter = true;
        
        /**
         * Defines whether sensitive data should be redacted from the result.
         * 
         * 
         */
        this.anonymizationSettings = new BlinkCardAnonymizationSettings();
        
        /**
         * Should extract CVV
         * 
         * 
         */
        this.extractCvv = true;
        
        /**
         * Should extract the payment card's month of expiry
         * 
         * 
         */
        this.extractExpiryDate = true;
        
        /**
         * Should extract the payment card's IBAN
         * 
         * 
         */
        this.extractIban = true;
        
        /**
         * Should extract the card owner information
         * 
         * 
         */
        this.extractOwner = true;
        
        /**
         * Property for setting DPI for full document images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         * 
         * 
         */
        this.fullDocumentImageDpi = 250;
        
        /**
         * Image extension factors for full document image.
         * 
         * @see CImageExtensionFactors
         * 
         */
        this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
        
        /**
         * Pading is a minimum distance from the edge of the frame and is defined as a percentage of the frame width. Default value is 0.0f and in that case
         * padding edge and image edge are the same.
         * Recommended value is 0.02f.
         * 
         * 
         */
        this.paddingEdge = 0.0;
        
        /**
         * Sets whether full document image of ID card should be extracted.
         * 
         * 
         */
        this.returnFullDocumentImage = false;
        
        /**
         * Whether or not recognition result should be signed.
         * 
         * 
         */
        this.signResult = false;
        

	this.createResultFromNative = (nativeResult: any) => { return new BlinkCardRecognizerResult(nativeResult); };
    }
}