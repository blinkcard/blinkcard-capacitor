//
//  MBCBlinkIDSerializationUtils.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import <BlinkCard/BlinkCard.h>

#import <Foundation/Foundation.h>

@interface MBCBlinkCardSerializationUtils : NSObject
+(NSDictionary *) serializeDocumentLivenessCheckResult:(MBCDocumentLivenessCheckResult * _Nullable)documentlivenessCheckResult;
+(MBCCardNumberAnonymizationSettings *) deserializeMBCardNumberAnonymizationSettings:(NSDictionary * _Nullable)jsonCardNumberAnonymizationSettings;
+(MBCBlinkCardAnonymizationSettings *) deserializeMBBlinkCardAnonymizationSettings:(NSDictionary * _Nullable)jsonBlinkCardAnonymizationSettings;

@end