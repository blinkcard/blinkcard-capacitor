#import "MBCBlinkCardRecognizerWrapper.h"
#import "MBCSerializationUtils.h"
#import "MBCBlinkCardSerializationUtils.h"
#import "MBCCommonSerializationUtils.h"

@implementation MBCBlinkCardRecognizerCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"BlinkCardRecognizer";
    }
    return self;
}

-(MBCRecognizer *) createRecognizer:(NSDictionary*) jsonRecognizer {
    MBCBlinkCardRecognizer *recognizer = [[MBCBlinkCardRecognizer alloc] init];
    {
        id allowBlurFilter = [jsonRecognizer valueForKey:@"allowBlurFilter"];
        if (allowBlurFilter != nil) {
            recognizer.allowBlurFilter = [(NSNumber *)allowBlurFilter boolValue];
        }
    }
    {
        id allowInvalidCardNumber = [jsonRecognizer valueForKey:@"allowInvalidCardNumber"];
        if (allowInvalidCardNumber != nil) {
            recognizer.allowInvalidCardNumber = [(NSNumber *)allowInvalidCardNumber boolValue];
        }
    }
    {
        id anonymizationSettings = [jsonRecognizer valueForKey:@"anonymizationSettings"];
        if (anonymizationSettings != nil) {
            recognizer.anonymizationSettings = [MBCBlinkCardSerializationUtils deserializeMBBlinkCardAnonymizationSettings:(NSDictionary*)anonymizationSettings];
        }
    }
    {
        id extractCvv = [jsonRecognizer valueForKey:@"extractCvv"];
        if (extractCvv != nil) {
            recognizer.extractCvv = [(NSNumber *)extractCvv boolValue];
        }
    }
    {
        id extractExpiryDate = [jsonRecognizer valueForKey:@"extractExpiryDate"];
        if (extractExpiryDate != nil) {
            recognizer.extractExpiryDate = [(NSNumber *)extractExpiryDate boolValue];
        }
    }
    {
        id extractIban = [jsonRecognizer valueForKey:@"extractIban"];
        if (extractIban != nil) {
            recognizer.extractIban = [(NSNumber *)extractIban boolValue];
        }
    }
    {
        id extractOwner = [jsonRecognizer valueForKey:@"extractOwner"];
        if (extractOwner != nil) {
            recognizer.extractOwner = [(NSNumber *)extractOwner boolValue];
        }
    }
    {
        id fullDocumentImageDpi = [jsonRecognizer valueForKey:@"fullDocumentImageDpi"];
        if (fullDocumentImageDpi != nil) {
            recognizer.fullDocumentImageDpi = [(NSNumber *)fullDocumentImageDpi integerValue];
        }
    }
    {
        id fullDocumentImageExtensionFactors = [jsonRecognizer valueForKey:@"fullDocumentImageExtensionFactors"];
        if (fullDocumentImageExtensionFactors != nil) {
            recognizer.fullDocumentImageExtensionFactors = [MBCCommonSerializationUtils deserializeMBImageExtensionFactors:(NSDictionary*)fullDocumentImageExtensionFactors];
        }
    }
    {
        id handDocumentOverlapThreshold = [jsonRecognizer valueForKey:@"handDocumentOverlapThreshold"];
        if (handDocumentOverlapThreshold != nil) {
            recognizer.handDocumentOverlapThreshold = [(NSNumber *)handDocumentOverlapThreshold floatValue];
        }
    }
    {
        id handScaleThreshold = [jsonRecognizer valueForKey:@"handScaleThreshold"];
        if (handScaleThreshold != nil) {
            recognizer.handScaleThreshold = [(NSNumber *)handScaleThreshold floatValue];
        }
    }
    {
        id paddingEdge = [jsonRecognizer valueForKey:@"paddingEdge"];
        if (paddingEdge != nil) {
            recognizer.paddingEdge = [(NSNumber *)paddingEdge floatValue];
        }
    }
    {
        id photocopyAnalysisMatchLevel = [jsonRecognizer valueForKey:@"photocopyAnalysisMatchLevel"];
        if (photocopyAnalysisMatchLevel != nil) {
            recognizer.photocopyAnalysisMatchLevel = (MBCMatchLevel)[(NSNumber *)photocopyAnalysisMatchLevel unsignedIntegerValue];
        }
    }
    {
        id returnFullDocumentImage = [jsonRecognizer valueForKey:@"returnFullDocumentImage"];
        if (returnFullDocumentImage != nil) {
            recognizer.returnFullDocumentImage = [(NSNumber *)returnFullDocumentImage boolValue];
        }
    }
    {
        id screenAnalysisMatchLevel = [jsonRecognizer valueForKey:@"screenAnalysisMatchLevel"];
        if (screenAnalysisMatchLevel != nil) {
            recognizer.screenAnalysisMatchLevel = (MBCMatchLevel)[(NSNumber *)screenAnalysisMatchLevel unsignedIntegerValue];
        }
    }

    return recognizer;
}

@end

@interface MBCBlinkCardRecognizer (JsonSerialization)
@end

@implementation MBCBlinkCardRecognizer (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.cardNumber forKey:@"cardNumber"];
    [jsonResult setValue:self.result.cardNumberPrefix forKey:@"cardNumberPrefix"];
    [jsonResult setValue:[NSNumber numberWithBool:self.result.cardNumberValid] forKey:@"cardNumberValid"];
    [jsonResult setValue:self.result.cvv forKey:@"cvv"];
    [jsonResult setValue:[MBCBlinkCardSerializationUtils serializeDocumentLivenessCheckResult:self.result.documentLivenessCheck] forKey:@"documentLivenessCheck"];
    [jsonResult setValue:[MBCSerializationUtils serializeMBCDate:self.result.expiryDate] forKey:@"expiryDate"];
    [jsonResult setValue:[NSNumber numberWithBool:self.result.firstSideAnonymized] forKey:@"firstSideAnonymized"];
    [jsonResult setValue:[NSNumber numberWithBool:self.result.firstSideBlurred] forKey:@"firstSideBlurred"];
    [jsonResult setValue:[MBCSerializationUtils encodeMBImage:self.result.firstSideFullDocumentImage] forKey:@"firstSideFullDocumentImage"];
    [jsonResult setValue:self.result.iban forKey:@"iban"];
    [jsonResult setValue:[NSNumber numberWithInteger:self.result.issuer] forKey:@"issuer"];
    [jsonResult setValue:self.result.owner forKey:@"owner"];
    [jsonResult setValue:[NSNumber numberWithInteger:self.result.processingStatus] forKey:@"processingStatus"];
    [jsonResult setValue:[NSNumber numberWithBool:self.result.scanningFirstSideDone] forKey:@"scanningFirstSideDone"];
    [jsonResult setValue:[NSNumber numberWithBool:self.result.secondSideAnonymized] forKey:@"secondSideAnonymized"];
    [jsonResult setValue:[NSNumber numberWithBool:self.result.secondSideBlurred] forKey:@"secondSideBlurred"];
    [jsonResult setValue:[MBCSerializationUtils encodeMBImage:self.result.secondSideFullDocumentImage] forKey:@"secondSideFullDocumentImage"];

    return jsonResult;
}

@end