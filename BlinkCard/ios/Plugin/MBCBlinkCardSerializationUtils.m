//
//  MBCBlinkIDSerializationUtils.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBCBlinkCardSerializationUtils.h"
#import "MBCSerializationUtils.h"

@implementation MBCBlinkCardSerializationUtils

+(NSDictionary *) serializeDocumentLivenessCheckResult:(MBCDocumentLivenessCheckResult *)documentlivenessCheckResult {
    NSMutableDictionary *documentLivenessResultDict = [NSMutableDictionary dictionary];
    NSMutableDictionary *frontDocumentLivenessResultDict = [NSMutableDictionary dictionary];
    [frontDocumentLivenessResultDict setValue:[NSNumber numberWithInteger:documentlivenessCheckResult.front.handPresenceCheck] forKey:@"handPresenceCheck"];
    [frontDocumentLivenessResultDict setValue: [NSNumber numberWithInteger:documentlivenessCheckResult.front.photocopyCheck.result]  forKey:@"photocopyCheck"];
    [frontDocumentLivenessResultDict setValue:[NSNumber numberWithInteger:documentlivenessCheckResult.front.screenCheck.result] forKey:@"screenCheck"];
    [documentLivenessResultDict setValue:frontDocumentLivenessResultDict forKey:@"front"];

    NSMutableDictionary *backDocumentLivenessResultDict = [NSMutableDictionary dictionary];
    [backDocumentLivenessResultDict setValue:[NSNumber numberWithInteger:[documentlivenessCheckResult.back handPresenceCheck]] forKey:@"handPresenceCheck"];
    [backDocumentLivenessResultDict setValue:[NSNumber numberWithInteger:documentlivenessCheckResult.back.photocopyCheck.result] forKey:@"photocopyCheck"];
    [backDocumentLivenessResultDict setValue:[NSNumber numberWithInteger:documentlivenessCheckResult.back.screenCheck.result] forKey:@"screenCheck"];
    [documentLivenessResultDict setValue:backDocumentLivenessResultDict forKey:@"back"];
    
    return documentLivenessResultDict;
}

+(MBCCardNumberAnonymizationSettings *) deserializeMBCardNumberAnonymizationSettings:(NSDictionary * _Nullable)jsonCardNumberAnonymizationSettings {
    if (jsonCardNumberAnonymizationSettings == nil) {
        return [[MBCCardNumberAnonymizationSettings alloc] init];
    } else {
        MBCCardNumberAnonymizationSettings *cardNumberAnonymizationSettings = [[MBCCardNumberAnonymizationSettings alloc] init];
        cardNumberAnonymizationSettings.mode = (MBCBlinkCardAnonymizationMode)[[jsonCardNumberAnonymizationSettings valueForKey:@"mode"] integerValue];
        cardNumberAnonymizationSettings.prefixDigitsVisible = [(NSNumber*)[jsonCardNumberAnonymizationSettings valueForKey:@"prefixDigitsVisible"] integerValue];
        cardNumberAnonymizationSettings.suffixDigitsVisible = [(NSNumber*)[jsonCardNumberAnonymizationSettings valueForKey:@"suffixDigitsVisible"] integerValue];

        return cardNumberAnonymizationSettings;
    }
}

+(MBCBlinkCardAnonymizationSettings *) deserializeMBBlinkCardAnonymizationSettings:(NSDictionary * _Nullable)jsonBlinkCardAnonymizationSettings{
    if (jsonBlinkCardAnonymizationSettings == nil) {
        return [[MBCBlinkCardAnonymizationSettings alloc] init];
    } else {
        MBCBlinkCardAnonymizationSettings *blinkCardAnonymizationSettings = [[MBCBlinkCardAnonymizationSettings alloc] init];

        blinkCardAnonymizationSettings.cardNumberAnonymizationSettings = [MBCBlinkCardSerializationUtils deserializeMBCardNumberAnonymizationSettings: [jsonBlinkCardAnonymizationSettings valueForKey:@"cardNumberAnonymizationSettings"]];
        blinkCardAnonymizationSettings.cardNumberPrefixAnonymizationMode = (MBCBlinkCardAnonymizationMode)[[jsonBlinkCardAnonymizationSettings valueForKey:@"cardNumberPrefixAnonymizationMode"] integerValue];
        blinkCardAnonymizationSettings.cvvAnonymizationMode = (MBCBlinkCardAnonymizationMode)[[jsonBlinkCardAnonymizationSettings valueForKey:@"cvvAnonymizationMode"] integerValue];
        blinkCardAnonymizationSettings.ibanAnonymizationMode = (MBCBlinkCardAnonymizationMode)[[jsonBlinkCardAnonymizationSettings valueForKey:@"ibanAnonymizationMode"] integerValue];
        blinkCardAnonymizationSettings.ownerAnonymizationMode = (MBCBlinkCardAnonymizationMode)[[jsonBlinkCardAnonymizationSettings valueForKey:@"ownerAnonymizationMode"] integerValue];

        return blinkCardAnonymizationSettings;
    }
}

@end