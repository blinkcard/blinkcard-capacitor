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
     * Payment card's security code/value.
     */
    cvv: string;
    
    /**
     * Defines digital signature of recognition results.
     */
    digitalSignature: string;
    
    /**
     * Defines digital signature version.
     */
    digitalSignatureVersion: number;
    
    /**
     * Defines result of the data matching algorithm for scanned parts/sides of the document.
     */
    documentDataMatch: DataMatchResult;
    
    /**
     * Back side image of the document
     */
    fullDocumentBackImage: string;
    
    /**
     * Front side image of the document
     */
    fullDocumentFrontImage: string;
    
    /**
     * Payment card's IBAN.
     */
    iban: string;
    
    /**
     * Payment card's inventory number.
     */
    inventoryNumber: string;
    
    /**
     * The payment card's issuing network.
     */
    issuer: LegacyCardIssuer;
    
    /**
     * Information about the payment card owner (name, company, etc.)
     */
    owner: string;
    
    /**
     * {true} if recognizer has finished scanning first side and is now scanning back side,
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
         * Payment card's security code/value.
         */
        this.cvv = nativeResult.cvv;
        
        /**
         * Defines digital signature of recognition results.
         */
        this.digitalSignature = nativeResult.digitalSignature;
        
        /**
         * Defines digital signature version.
         */
        this.digitalSignatureVersion = nativeResult.digitalSignatureVersion;
        
        /**
         * Defines result of the data matching algorithm for scanned parts/sides of the document.
         */
        this.documentDataMatch = nativeResult.documentDataMatch;
        
        /**
         * Back side image of the document
         */
        this.fullDocumentBackImage = nativeResult.fullDocumentBackImage;
        
        /**
         * Front side image of the document
         */
        this.fullDocumentFrontImage = nativeResult.fullDocumentFrontImage;
        
        /**
         * Payment card's IBAN.
         */
        this.iban = nativeResult.iban;
        
        /**
         * Payment card's inventory number.
         */
        this.inventoryNumber = nativeResult.inventoryNumber;
        
        /**
         * The payment card's issuing network.
         */
        this.issuer = nativeResult.issuer;
        
        /**
         * Information about the payment card owner (name, company, etc.)
         */
        this.owner = nativeResult.owner;
        
        /**
         * {true} if recognizer has finished scanning first side and is now scanning back side,
         */
        this.scanningFirstSideDone = nativeResult.scanningFirstSideDone;
        
        /**
         * The payment card's last month of validity.
         */
        this.validThru = nativeResult.validThru != null ? new Date(nativeResult.validThru) : null;
        
    }
}

/**
 * Recognizer used for scanning both sides of payment cards.
 */
export class LegacyBlinkCardRecognizer extends Recognizer {

    
    /**
     * Should anonymize the card number area (redact image pixels) on the document image result
     */
    anonymizeCardNumber: boolean;
    
    /**
     * Should anonymize the CVV area (redact image pixels) on the document image result
     */
    anonymizeCvv: boolean;
    
    /**
     * Should anonymize the IBAN area (redact image pixels) on the document image result
     */
    anonymizeIban: boolean;
    
    /**
     * Should anonymize the owner area (redact image pixels) on the document image result
     */
    anonymizeOwner: boolean;
    
    /**
     * Defines whether glare detector is enabled.
     */
    detectGlare: boolean;
    
    /**
     * Should extract the card CVV
     */
    extractCvv: boolean;
    
    /**
     * Should extract the card IBAN
     */
    extractIban: boolean;
    
    /**
     * Should extract the card's inventory number
     */
    extractInventoryNumber: boolean;
    
    /**
     * Should extract the card owner information
     */
    extractOwner: boolean;
    
    /**
     * Should extract the payment card's month of expiry
     */
    extractValidThru: boolean;
    
    /**
     * The DPI (Dots Per Inch) for full document image that should be returned.
     */
    fullDocumentImageDpi: number;
    
    /**
     * The extension factors for full document image.
     */
    fullDocumentImageExtensionFactors: ImageExtensionFactors;
    
    /**
     * Defines whether full document image will be available in
     */
    returnFullDocumentImage: boolean;
    
    /**
     * Defines whether or not recognition result should be signed.
     */
    signResult: boolean;
    

    constructor() {
        super('LegacyBlinkCardRecognizer');
        
        /**
         * Should anonymize the card number area (redact image pixels) on the document image result
         */
        this.anonymizeCardNumber = false;
        
        /**
         * Should anonymize the CVV area (redact image pixels) on the document image result
         */
        this.anonymizeCvv = false;
        
        /**
         * Should anonymize the IBAN area (redact image pixels) on the document image result
         */
        this.anonymizeIban = false;
        
        /**
         * Should anonymize the owner area (redact image pixels) on the document image result
         */
        this.anonymizeOwner = false;
        
        /**
         * Defines whether glare detector is enabled.
         */
        this.detectGlare = true;
        
        /**
         * Should extract the card CVV
         */
        this.extractCvv = true;
        
        /**
         * Should extract the card IBAN
         */
        this.extractIban = false;
        
        /**
         * Should extract the card's inventory number
         */
        this.extractInventoryNumber = true;
        
        /**
         * Should extract the card owner information
         */
        this.extractOwner = false;
        
        /**
         * Should extract the payment card's month of expiry
         */
        this.extractValidThru = true;
        
        /**
         * The DPI (Dots Per Inch) for full document image that should be returned.
         */
        this.fullDocumentImageDpi = 250;
        
        /**
         * The extension factors for full document image.
         */
        this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
        
        /**
         * Defines whether full document image will be available in
         */
        this.returnFullDocumentImage = false;
        
        /**
         * Defines whether or not recognition result should be signed.
         */
        this.signResult = false;
        

	this.createResultFromNative = (nativeResult: any) => { return new LegacyBlinkCardRecognizerResult(nativeResult); };
    }
}