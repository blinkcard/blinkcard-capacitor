import { Recognizer, RecognizerResult } from '../recognizer'
import {
    Date,
    Point,
    Quadrilateral,
    
    Issuer,
    BlinkCardProcessingStatus,
    BlinkCardAnonymizationMode,
    CardNumberAnonymizationSettings,
    BlinkCardAnonymizationSettings,
    DocumentLivenessCheckResult,
    BlinkCardMatchLevel,
    
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
    cardNumber?: string;
    
    /**
     * The payment card number prefix.
     */
    cardNumberPrefix?: string;
    
    /**
     * The payment card number is valid
     */
    cardNumberValid?: boolean;
    
    /**
     *  Payment card's security code/value.
     */
    cvv?: string;
    
    /**
     * Document liveness check (screen, photocopy, hand presence) which can pass or fail.
     */
    documentLivenessCheck?: DocumentLivenessCheckResult;
    
    /**
     * The payment card's expiry date.
     */
    expiryDate?: Date;
    
    /**
     * Whether the first scanned side is anonymized.
     */
    firstSideAnonymized?: boolean;
    
    /**
     * Whether the first scanned side is blurred.
     */
    firstSideBlurred?: boolean;
    
    /**
     * Full image of the payment card from first side recognition.
     */
    firstSideFullDocumentImage?: string;
    
    /**
     * Payment card's IBAN.
     */
    iban?: string;
    
    /**
     * Payment card's issuing network.
     */
    issuer?: Issuer;
    
    /**
     * Information about the payment card owner (name, company, etc.).
     */
    owner?: string;
    
    /**
     * Status of the last recognition process.
     */
    processingStatus?: BlinkCardProcessingStatus;
    
    /**
     * Returns true if recognizer has finished scanning first side and is now scanning back side,
         * false if it's still scanning first side.
     */
    scanningFirstSideDone?: boolean;
    
    /**
     * Whether the second scanned side is anonymized.
     */
    secondSideAnonymized?: boolean;
    
    /**
     * Whether the second scanned side is blurred.
     */
    secondSideBlurred?: boolean;
    
    /**
     * Full image of the payment card from second side recognition.
     */
    secondSideFullDocumentImage?: string;
    

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
         * Document liveness check (screen, photocopy, hand presence) which can pass or fail.
         */
        this.documentLivenessCheck = nativeResult.documentLivenessCheck;
        
        /**
         * The payment card's expiry date.
         */
        this.expiryDate = nativeResult.expiryDate != null ? new Date(nativeResult.expiryDate) : null;
        
        /**
         * Whether the first scanned side is anonymized.
         */
        this.firstSideAnonymized = nativeResult.firstSideAnonymized;
        
        /**
         * Whether the first scanned side is blurred.
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
         * Whether the second scanned side is anonymized.
         */
        this.secondSideAnonymized = nativeResult.secondSideAnonymized;
        
        /**
         * Whether the second scanned side is blurred.
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
     * Whether invalid card number is accepted.
         * 
         * 
     */
    allowInvalidCardNumber: boolean;
    
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
     * This parameter is used to adjust heuristics that eliminate cases when the hand is present.
         * 
         * 
     */
    handDocumentOverlapThreshold: number;
    
    /**
     * Hand scale is calculated as a ratio between area of hand mask and document mask.
         * 
         * 
     */
    handScaleThreshold: number;
    
    /**
     * Pading is a minimum distance from the edge of the frame and is defined as a percentage of the frame width. Default value is 0.0f and in that case
         * padding edge and image edge are the same.
         * Recommended value is 0.02f.
         * 
         * 
     */
    paddingEdge: number;
    
    /**
     * Photocopy analysis match level - higher if stricter.
         * 
         * 
     */
    photocopyAnalysisMatchLevel: BlinkCardMatchLevel;
    
    /**
     * Sets whether full document image of ID card should be extracted.
         * 
         * 
     */
    returnFullDocumentImage: boolean;
    
    /**
     * Screen analysis match level - higher if stricter.
         * 
         * 
     */
    screenAnalysisMatchLevel: BlinkCardMatchLevel;
    

    constructor() {
        super('BlinkCardRecognizer');
        
        /**
         * Defines whether blured frames filtering is allowed
         * 
         * 
         */
        this.allowBlurFilter = true;
        
        /**
         * Whether invalid card number is accepted.
         * 
         * 
         */
        this.allowInvalidCardNumber = false;
        
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
         * This parameter is used to adjust heuristics that eliminate cases when the hand is present.
         * 
         * 
         */
        this.handDocumentOverlapThreshold = 0.05;
        
        /**
         * Hand scale is calculated as a ratio between area of hand mask and document mask.
         * 
         * 
         */
        this.handScaleThreshold = 0.15;
        
        /**
         * Pading is a minimum distance from the edge of the frame and is defined as a percentage of the frame width. Default value is 0.0f and in that case
         * padding edge and image edge are the same.
         * Recommended value is 0.02f.
         * 
         * 
         */
        this.paddingEdge = 0.0;
        
        /**
         * Photocopy analysis match level - higher if stricter.
         * 
         * 
         */
        this.photocopyAnalysisMatchLevel = BlinkCardMatchLevel.Level5;
        
        /**
         * Sets whether full document image of ID card should be extracted.
         * 
         * 
         */
        this.returnFullDocumentImage = false;
        
        /**
         * Screen analysis match level - higher if stricter.
         * 
         * 
         */
        this.screenAnalysisMatchLevel = BlinkCardMatchLevel.Level5;
        

	this.createResultFromNative = (nativeResult: any) => { return new BlinkCardRecognizerResult(nativeResult); };
    }
}