//
//  MBCBlinkIDSerializationUtils.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import <BlinkCard/BlinkCard.h>

#import <Foundation/Foundation.h>

@interface MBCCommonSerializationUtils : NSObject

+(MBCImageExtensionFactors) deserializeMBImageExtensionFactors:(NSDictionary * _Nullable)jsonExtensionFactors;

@end