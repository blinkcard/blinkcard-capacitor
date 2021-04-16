//
//  MBBlinkIDSerializationUtils.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBBlinkCardSerializationUtils.h"
#import "MBSerializationUtils.h"

@implementation MBCBlinkCardSerializationUtils


+(MBCCardNumberAnonymizationSettings *) deserializeMBCardNumberAnonymizationSettings:(NSDictionary * _Nullable)jsonCardNumberAnonymizationSettings {
    if (jsonCardNumberAnonymizationSettings == nil) {
        return [[MBCCardNumberAnonymizationSettings alloc] init];
    } else {
        MBCCardNumberAnonymizationSettings *cardNumberAnonymizationSettings = [[MBCCardNumberAnonymizationSettings alloc] init];
        cardNumberAnonymizationSettings.mode = (MBCBlinkCardAnonymizationMode)([[jsonCardNumberAnonymizationSettings valueForKey:@"mode"] integerValue] - 1);
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
        blinkCardAnonymizationSettings.cardNumberPrefixAnonymizationMode = (MBCBlinkCardAnonymizationMode)([[jsonBlinkCardAnonymizationSettings valueForKey:@"cardNumberPrefixAnonymizationMode"] integerValue] - 1);
        blinkCardAnonymizationSettings.cvvAnonymizationMode = (MBCBlinkCardAnonymizationMode)([[jsonBlinkCardAnonymizationSettings valueForKey:@"cvvAnonymizationMode"] integerValue] - 1);
        blinkCardAnonymizationSettings.ibanAnonymizationMode = (MBCBlinkCardAnonymizationMode)([[jsonBlinkCardAnonymizationSettings valueForKey:@"ibanAnonymizationMode"] integerValue] - 1);
        blinkCardAnonymizationSettings.ownerAnonymizationMode = (MBCBlinkCardAnonymizationMode)([[jsonBlinkCardAnonymizationSettings valueForKey:@"ownerAnonymizationMode"] integerValue] - 1);

        return blinkCardAnonymizationSettings;
    }
}

@end