#import "MBCLegacyBlinkCardEliteRecognizerWrapper.h"
#import "MBCSerializationUtils.h"
#import "MBCBlinkCardSerializationUtils.h"
#import "MBCCommonSerializationUtils.h"

@implementation MBCLegacyBlinkCardEliteRecognizerCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"LegacyBlinkCardEliteRecognizer";
    }
    return self;
}

-(MBCRecognizer *) createRecognizer:(NSDictionary*) jsonRecognizer {
    MBCLegacyBlinkCardEliteRecognizer *recognizer = [[MBCLegacyBlinkCardEliteRecognizer alloc] init];
    {
        id anonymizeCardNumber = [jsonRecognizer valueForKey:@"anonymizeCardNumber"];
        if (anonymizeCardNumber != nil) {
            recognizer.anonymizeCardNumber = [(NSNumber *)anonymizeCardNumber boolValue];
        }
    }
    {
        id anonymizeCvv = [jsonRecognizer valueForKey:@"anonymizeCvv"];
        if (anonymizeCvv != nil) {
            recognizer.anonymizeCvv = [(NSNumber *)anonymizeCvv boolValue];
        }
    }
    {
        id anonymizeOwner = [jsonRecognizer valueForKey:@"anonymizeOwner"];
        if (anonymizeOwner != nil) {
            recognizer.anonymizeOwner = [(NSNumber *)anonymizeOwner boolValue];
        }
    }
    {
        id detectGlare = [jsonRecognizer valueForKey:@"detectGlare"];
        if (detectGlare != nil) {
            recognizer.detectGlare = [(NSNumber *)detectGlare boolValue];
        }
    }
    {
        id extractInventoryNumber = [jsonRecognizer valueForKey:@"extractInventoryNumber"];
        if (extractInventoryNumber != nil) {
            recognizer.extractInventoryNumber = [(NSNumber *)extractInventoryNumber boolValue];
        }
    }
    {
        id extractOwner = [jsonRecognizer valueForKey:@"extractOwner"];
        if (extractOwner != nil) {
            recognizer.extractOwner = [(NSNumber *)extractOwner boolValue];
        }
    }
    {
        id extractValidThru = [jsonRecognizer valueForKey:@"extractValidThru"];
        if (extractValidThru != nil) {
            recognizer.extractValidThru = [(NSNumber *)extractValidThru boolValue];
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
        id returnFullDocumentImage = [jsonRecognizer valueForKey:@"returnFullDocumentImage"];
        if (returnFullDocumentImage != nil) {
            recognizer.returnFullDocumentImage = [(NSNumber *)returnFullDocumentImage boolValue];
        }
    }

    return recognizer;
}

@end

@interface MBCLegacyBlinkCardEliteRecognizer (JsonSerialization)
@end

@implementation MBCLegacyBlinkCardEliteRecognizer (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];
    [jsonResult setValue:self.result.cardNumber forKey:@"cardNumber"];
    [jsonResult setValue:self.result.cvv forKey:@"cvv"];
    [jsonResult setValue:[NSNumber numberWithInteger:(self.result.documentDataMatch + 1)] forKey:@"documentDataMatch"];
    [jsonResult setValue:[MBCSerializationUtils encodeMBImage:self.result.fullDocumentBackImage] forKey:@"fullDocumentBackImage"];
    [jsonResult setValue:[MBCSerializationUtils encodeMBImage:self.result.fullDocumentFrontImage] forKey:@"fullDocumentFrontImage"];
    [jsonResult setValue:self.result.inventoryNumber forKey:@"inventoryNumber"];
    [jsonResult setValue:self.result.owner forKey:@"owner"];
    [jsonResult setValue:[NSNumber numberWithBool:self.result.scanningFirstSideDone] forKey:@"scanningFirstSideDone"];
    [jsonResult setValue:[MBCSerializationUtils serializeMBDateResult:self.result.validThru] forKey:@"validThru"];
    return jsonResult;
}

@end