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
 * Result object for LegacyBlinkCardRecognizer.
 */
export class LegacyBlinkCardRecognizerResult extends RecognizerResult {

    
    /**
     * The payment card number.
     */
    cardNumber: string;
    
    /**
     *  Payment card's security code/value
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
     * Returns CDataMatchResultSuccess if data from scanned parts/sides of the document match,
         * CDataMatchResultFailed otherwise. For example if date of expiry is scanned from the front and back side
         * of the document and values do not match, this method will return CDataMatchResultFailed. Result will
         * be CDataMatchResultSuccess only if scanned values for all fields that are compared are the same.
     */
    documentDataMatch: DataMatchResult;
    
    /**
     * back side image of the document if enabled with returnFullDocumentImage property.
     */
    fullDocumentBackImage: string;
    
    /**
     * front side image of the document if enabled with returnFullDocumentImage property.
     */
    fullDocumentFrontImage: string;
    
    /**
     * Payment card's IBAN
     */
    iban: string;
    
    /**
     * Payment card's inventory number.
     */
    inventoryNumber: string;
    
    /**
     * Payment card's issuing network
     */
    issuer: LegacyCardIssuer;
    
    /**
     * Information about the payment card owner (name, company, etc.).
     */
    owner: string;
    
    /**
     * Returns true if recognizer has finished scanning first side and is now scanning back side,
         * false if it's still scanning first side.
     */
    scanningFirstSideDone: boolean;
    
    /**
     * The payment card's last month of validity.
     */
    validThru: Date;
    

    constructor(nativeResult: any) {
        super(nativeResult.resultState);
        
        /**
         * The payment card number.
         */
        this.cardNumber = nativeResult.cardNumber;
        
        /**
         *  Payment card's security code/value
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
         * Returns CDataMatchResultSuccess if data from scanned parts/sides of the document match,
         * CDataMatchResultFailed otherwise. For example if date of expiry is scanned from the front and back side
         * of the document and values do not match, this method will return CDataMatchResultFailed. Result will
         * be CDataMatchResultSuccess only if scanned values for all fields that are compared are the same.
         */
        this.documentDataMatch = nativeResult.documentDataMatch;
        
        /**
         * back side image of the document if enabled with returnFullDocumentImage property.
         */
        this.fullDocumentBackImage = nativeResult.fullDocumentBackImage;
        
        /**
         * front side image of the document if enabled with returnFullDocumentImage property.
         */
        this.fullDocumentFrontImage = nativeResult.fullDocumentFrontImage;
        
        /**
         * Payment card's IBAN
         */
        this.iban = nativeResult.iban;
        
        /**
         * Payment card's inventory number.
         */
        this.inventoryNumber = nativeResult.inventoryNumber;
        
        /**
         * Payment card's issuing network
         */
        this.issuer = nativeResult.issuer;
        
        /**
         * Information about the payment card owner (name, company, etc.).
         */
        this.owner = nativeResult.owner;
        
        /**
         * Returns true if recognizer has finished scanning first side and is now scanning back side,
         * false if it's still scanning first side.
         */
        this.scanningFirstSideDone = nativeResult.scanningFirstSideDone;
        
        /**
         * The payment card's last month of validity.
         */
        this.validThru = nativeResult.validThru != null ? new Date(nativeResult.validThru) : null;
        
    }
}

/**
 * Recognizer used for scanning the front side of credit/debit cards.
 */
export class LegacyBlinkCardRecognizer extends Recognizer {

    
    /**
     * Should anonymize the card number area (redact image pixels) on the document image result
         * 
         * 
     */
    anonymizeCardNumber: boolean;
    
    /**
     * Should anonymize the CVV on the document image result
         * 
         * 
     */
    anonymizeCvv: boolean;
    
    /**
     * Should anonymize the IBAN area (redact image pixels) on the document image result
         * 
         * 
     */
    anonymizeIban: boolean;
    
    /**
     * Should anonymize the owner area (redact image pixels) on the document image result
         * 
         * 
     */
    anonymizeOwner: boolean;
    
    /**
     * Defines if glare detection should be turned on/off.
         * 
         * 
     */
    detectGlare: boolean;
    
    /**
     * Should extract CVV
         * 
         * 
     */
    extractCvv: boolean;
    
    /**
     * Should extract the payment card's IBAN
         * 
         * 
     */
    extractIban: boolean;
    
    /**
     * Should extract the card's inventory number
         * 
         * 
     */
    extractInventoryNumber: boolean;
    
    /**
     * Should extract the card owner information
         * 
         * 
     */
    extractOwner: boolean;
    
    /**
     * Should extract the payment card's month of expiry
         * 
         * 
     */
    extractValidThru: boolean;
    
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
        super('LegacyBlinkCardRecognizer');
        
        /**
         * Should anonymize the card number area (redact image pixels) on the document image result
         * 
         * 
         */
        this.anonymizeCardNumber = false;
        
        /**
         * Should anonymize the CVV on the document image result
         * 
         * 
         */
        this.anonymizeCvv = false;
        
        /**
         * Should anonymize the IBAN area (redact image pixels) on the document image result
         * 
         * 
         */
        this.anonymizeIban = false;
        
        /**
         * Should anonymize the owner area (redact image pixels) on the document image result
         * 
         * 
         */
        this.anonymizeOwner = false;
        
        /**
         * Defines if glare detection should be turned on/off.
         * 
         * 
         */
        this.detectGlare = true;
        
        /**
         * Should extract CVV
         * 
         * 
         */
        this.extractCvv = true;
        
        /**
         * Should extract the payment card's IBAN
         * 
         * 
         */
        this.extractIban = false;
        
        /**
         * Should extract the card's inventory number
         * 
         * 
         */
        this.extractInventoryNumber = true;
        
        /**
         * Should extract the card owner information
         * 
         * 
         */
        this.extractOwner = false;
        
        /**
         * Should extract the payment card's month of expiry
         * 
         * 
         */
        this.extractValidThru = true;
        
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
        

	this.createResultFromNative = (nativeResult: any) => { return new LegacyBlinkCardRecognizerResult(nativeResult); };
    }
}