/**
 * Represents a date extracted from image.
 */
export class Date {
    /** day in month */
    day: number;
    /** month in year */
    month: number;
    /** year */
    year: number;
    /** original date string */
    originalDateStringResult: string;
    /** isFilledByDomainKnowledge */
    isFilledByDomainKnowledge: boolean;

    constructor(nativeDate: any) {
        this.day = nativeDate.day;
        this.month = nativeDate.month;
        this.year = nativeDate.year;
        this.originalDateStringResult = nativeDate.originalDateStringResult;
        this.isFilledByDomainKnowledge = nativeDate.isFilledByDomainKnowledge;
    }
}
/**
 * Represents a date result with additional properties.
 */
export class DateResult {
    /**  date */
    date: Date;
    /** original date string */
    originalDateStringResult: string;
    /** is filled by domain knowledge */
    isFilledByDomainKnowledge: boolean;
  
    constructor(nativeDateResult: any) {
        this.date = new Date(nativeDateResult.date);
        this.originalDateStringResult = nativeDateResult.originalDateStringResult;
        this.isFilledByDomainKnowledge = nativeDateResult.isFilledByDomainKnowledge;
    }
  }

/**
 * Represents a point in image
 */
export class Point {
    /** x coordinate of the point */
    x: number;
    /** y coordinate of the point */
    y: number;

    constructor(nativePoint: any) {
        this.x = nativePoint.x;
        this.y = nativePoint.y;
    }
}

/**
 * Represents a quadrilateral location in the image
 */
export class Quadrilateral {

    /** upper left point of the quadrilateral */
    upperLeft: Point;
    /** upper right point of the quadrilateral */
    upperRight: Point;
    /** lower left point of the quadrilateral */
    lowerLeft: Point;
    /** lower right point of the quadrilateral */
    lowerRight: Point;

    constructor(nativeQuad: any) {
        this.upperLeft = new Point(nativeQuad.upperLeft);
        this.upperRight = new Point(nativeQuad.upperRight);
        this.lowerLeft = new Point(nativeQuad.lowerLeft);
        this.lowerRight = new Point(nativeQuad.lowerRight);
    }
}





/**
 * Supported BlinkCard card issuer values.
 */
export const enum Issuer {
        /* Unidentified Card */
        Other = 0,
        /* The American Express Company Card */
        AmericanExpress = 1,
        /* China UnionPay Card */
        ChinaUnionPay = 2,
        /* Diners Club International Card */
        Diners = 3,
        /* Discover Card */
        DiscoverCard = 4,
        /* Elo card association */
        Elo = 5,
        /* The JCB Company Card */
        Jcb = 6,
        /* Maestro Debit Card */
        Maestro = 7,
        /* Mastercard Inc. Card */
        Mastercard = 8,
        /* RuPay */
        RuPay = 9,
        /* Interswitch Verve Card */
        Verve = 10,
        /* Visa Inc. Card */
        Visa = 11,
        /* VPay */
        VPay = 12
}

/**
 * Supported BLinkCard processing status
 */
export const enum BlinkCardProcessingStatus {
        /** Recognition was successful. */
        Success = 0,
        /** Detection of the document failed. */
        DetectionFailed = 1,
        /** Preprocessing of the input image has failed. */
        ImagePreprocessingFailed = 2,
        /** Recognizer has inconsistent results. */
        StabilityTestFailed = 3,
        /** Wrong side of the document has been scanned. */
        ScanningWrongSide = 4,
        /** Identification of the fields present on the document has failed. */
        FieldIdentificationFailed = 5,
        /** Failed to return a requested image. */
        ImageReturnFailed = 6,
        /** Payment card currently not supported by the recognizer. */
        UnsupportedCard = 7
}

/**
 * Enumerates the possible match levels indicating the strictness of a check result. Higher is stricter.
 */
 export const enum BlinkCardMatchLevel {
        /** Match level is disabled */
        Disabled = 0,
        /** Match level one. */
        Level1 = 1,
        /** Match level two */
        Level2 = 2,
        /** Match level three */        
        Level3 = 3,
        /** Match level four */
        Level4 = 4,
        /** Match level five */
        Level5 = 5,
        /** Match level six */
        Level6 = 6,
        /** Match level seven */
        Level7 = 7,
        /** Match level eight */
        Level8 = 8,
        /** Match level nine */
        Level9 = 9,
        /** Match level ten. Most strict match level */
        Level10 = 10
}

/**
 * Enumerates the possible results of BlinkCard's document liveness checks.
 */
export const enum  BlinkCardCheckResult {
        /** Indicates that the check was not performed. */
        NotPerformed = 0,
        /** Indicates that the document passed the check successfully. */
        Pass = 1,
        /** Indicates that the document failed the check. */
        Fail = 2,
    }

/**
 * Define level of anonymization performed on recognizer result.
 */
export const enum BlinkCardAnonymizationMode {
    /** No anonymization is performed in this mode. */
    None = 0,

    /** Sensitive data in the document image is anonymized with black boxes covering selected sensitive data. Data returned in result fields is not changed. */
    ImageOnly = 1,

    /** Document image is not changed. Data returned in result fields is redacted. */
    ResultFieldsOnly = 2,

    /** Sensitive data in the image is anonymized with black boxes covering selected sensitive data. Data returned in result fields is redacted. */
    FullResult = 3
}

/**
 * Holds the settings which control card number anonymization.
 */
export class CardNumberAnonymizationSettings {

    /** Defines the mode of card number anonymization. */
    mode: BlinkCardAnonymizationMode;
    /** Defines how many digits at the beginning of the card number remain visible after anonymization. */
    prefixDigitsVisible: number;
    /** Defines how many digits at the end of the card number remain visible after anonymization. */
    suffixDigitsVisible: number;

    constructor() {
        this.mode = BlinkCardAnonymizationMode.None;
        this.prefixDigitsVisible = -1;
        this.suffixDigitsVisible = -1;
    }
}

/**
 * Holds the settings which control card number anonymization.
 */
export class BlinkCardAnonymizationSettings {

    /** Defines the parameters of card number anonymization. */
    cardNumberAnonymizationSettings: CardNumberAnonymizationSettings;
    /** Defines the mode of card number prefix anonymization. */
    cardNumberPrefixAnonymizationMode: BlinkCardAnonymizationMode;
    /** Defines the mode of CVV anonymization. */
    cvvAnonymizationMode: BlinkCardAnonymizationMode;
    /** Defines the mode of IBAN anonymization. */
    ibanAnonymizationMode: BlinkCardAnonymizationMode;
    /** Defines the mode of owner anonymization. */
    ownerAnonymizationMode: BlinkCardAnonymizationMode;

    constructor() {
        this.cardNumberAnonymizationSettings = new CardNumberAnonymizationSettings();
        this.cardNumberPrefixAnonymizationMode = BlinkCardAnonymizationMode.None;
        this.cvvAnonymizationMode = BlinkCardAnonymizationMode.None;
        this.ibanAnonymizationMode = BlinkCardAnonymizationMode.None;
        this.ownerAnonymizationMode = BlinkCardAnonymizationMode.None;
    }
}
/**
 * Represents the card side for liveness checks
 */
export class BlinkCardSide {
    /** Retrieves the result of the check indicating the presence of a live hand. */
    handPresenceCheck: BlinkCardCheckResult;
    /** Retrieves the result of the check performed on the document using photocopy detection. */ 
    photocopyCheck: BlinkCardCheckResult;
    /** Retrieves the result of the check performed on the document using screen detection. */
    screenCheck: BlinkCardCheckResult;

    constructor(nativeCardSide: any) {
      this.handPresenceCheck = nativeCardSide.handPresenceCheck;
      this.photocopyCheck = nativeCardSide.photocopyCheck;
      this.screenCheck = nativeCardSide.screenCheck;
    }
}

/**
* Represents the result of liveness checks on both sides (front and back) of a card. 
*/
export class DocumentLivenessCheckResult {
    /** Returns the document liveness result of the first side. */
    front?: BlinkCardSide;
    /** Return the document liveness result of the back side. */
    back?: BlinkCardSide;
    
    constructor(nativeDocumentLivenessCheckResult: any) {
      this.front = nativeDocumentLivenessCheckResult.front != undefined ? new BlinkCardSide(nativeDocumentLivenessCheckResult.front) : undefined;
      this.back = nativeDocumentLivenessCheckResult.back != undefined ? new BlinkCardSide(nativeDocumentLivenessCheckResult.back) : undefined;
    }
}

/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * upFactor and downFactor define extensions relative to image height, e.g.
 * when upFactor is 0.5, upper image boundary will be extended for half of image's full
 * height.
 */
export class ImageExtensionFactors {
    /** image extension factor relative to full image height in UP direction. */
    upFactor: number;
    /** image extension factor relative to full image height in RIGHT direction. */
    rightFactor: number;
    /** image extension factor relative to full image height in DOWN direction. */
    downFactor: number;
    /** image extension factor relative to full image height in LEFT direction. */
    leftFactor: number;

    constructor() {
        /** image extension factor relative to full image height in UP direction. */
        this.upFactor = 0.0;
        /** image extension factor relative to full image height in RIGHT direction. */
        this.rightFactor = 0.0;
        /** image extension factor relative to full image height in DOWN direction. */
        this.downFactor = 0.0;
        /** image extension factor relative to full image height in LEFT direction. */
        this.leftFactor = 0.0;
    }
}

/** Result of the data matching algorithm for scanned parts/sides of the document. */
export enum DataMatchState {
    /** Data matching has not been performed. */
    NotPerformed = 0,
    /** Data does not match. */
    Failed = 1,
    /** Data match. */
    Success = 2
}