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

    constructor(nativeDate: any) {
        this.day = nativeDate.day;
        this.month = nativeDate.month;
        this.year = nativeDate.year;
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
 * Supported Legacy BlinkCard card issuer values.
 */
export const enum LegacyCardIssuer {
    /** Unidentified Card */
    Other = 1,
    /** The American Express Company Card */
    AmericanExpress = 2,
    /** The Bank of Montreal ABM Card */
    BmoAbm = 3,
    /** China T-Union Transportation Card */
    ChinaTUnion = 4,
    /** China UnionPay Card */
    ChinaUnionPay = 5,
    /** Canadian Imperial Bank of Commerce Advantage Debit Card */
    CibcAdvantageDebit = 6,
    /** CISS Card */
    Ciss = 7,
    /** Diners Club International Card */
    DinersClubInternational = 8,
    /** Diners Club United States & Canada Card */
    DinersClubUsCanada = 9,
    /** Discover Card */
    DiscoverCard = 10,
    /** HSBC Bank Canada Card */
    Hsbc = 11,
    /** RuPay Card */
    RuPay = 12,
    /** InterPayment Card */
    InterPayment = 13,
    /** InstaPayment Card */
    InstaPayment = 14,
    /** The JCB Company Card */
    Jcb = 15,
    /** Laser Debit Card (deprecated) */
    Laser = 16,
    /** Maestro Debit Card */
    Maestro = 17,
    /** Dankort Card */
    Dankort = 18,
    /** MIR Card */
    Mir = 19,
    /** MasterCard Inc. Card */
    MasterCard = 20,
    /** The Royal Bank of Canada Client Card */
    RbcClient = 21,
    /** ScotiaBank Scotia Card */
    ScotiaBank = 22,
    /** TD Canada Trust Access Card */
    TdCtAccess = 23,
    /** Troy Card */
    Troy = 24,
    /** Visa Inc. Card */
    Visa = 25,
    /** Universal Air Travel Plan Inc. Card */
    Uatp = 26,
    /** Interswitch Verve Card */
    Verve = 27
}

/**
 * Supported BlinkCard card issuer values.
 */
export const enum Issuer {
        /* Unidentified Card */
        Other = 1,
        /* The American Express Company Card */
        AmericanExpress = 2,
        /* China UnionPay Card */
        ChinaUnionPay = 3,
        /* Diners Club International Card */
        Diners = 4,
        /* Discover Card */
        DiscoverCard = 5,
        /* Elo card association */
        Elo = 6,
        /* The JCB Company Card */
        Jcb = 7,
        /* Maestro Debit Card */
        Maestro = 8,
        /* Mastercard Inc. Card */
        Mastercard = 9,
        /* RuPay */
        RuPay = 10,
        /* Interswitch Verve Card */
        Verve = 11,
        /* Visa Inc. Card */
        Visa = 12,
        /* VPay */
        VPay = 13
}

/**
 * Supported BLinkCard processing status
 */
export const enum BlinkCardProcessingStatus {
        /** Recognition was successful. */
        Success = 1,
        /** Detection of the document failed. */
        DetectionFailed = 2,
        /** Preprocessing of the input image has failed. */
        ImagePreprocessingFailed = 3,
        /** Recognizer has inconsistent results. */
        StabilityTestFailed = 4,
        /** Wrong side of the document has been scanned. */
        ScanningWrongSide = 5,
        /** Identification of the fields present on the document has failed. */
        FieldIdentificationFailed = 6,
        /** Failed to return a requested image. */
        ImageReturnFailed = 7,
        /** Payment card currently not supported by the recognizer. */
        UnsupportedCard = 8
}

/**
 * Define level of anonymization performed on recognizer result.
 */
export const enum BlinkCardAnonymizationMode {
    /** No anonymization is performed in this mode. */
    None = 1,

    /** Sensitive data in the document image is anonymized with black boxes covering selected sensitive data. Data returned in result fields is not changed. */
    ImageOnly = 2,

    /** Document image is not changed. Data returned in result fields is redacted. */
    ResultFieldsOnly = 3,

    /** Sensitive data in the image is anonymized with black boxes covering selected sensitive data. Data returned in result fields is redacted. */
    FullResult = 4
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
        this.prefixDigitsVisible = 0;
        this.suffixDigitsVisible = 0;
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
export const enum DataMatchResult {
    /** Data matching has not been performed. */
    NotPerformed = 1,
    /** Data does not match. */
    Failed = 2,
    /** Data match. */
    Success = 3
}