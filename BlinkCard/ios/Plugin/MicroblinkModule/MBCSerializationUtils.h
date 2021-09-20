//
//  MBCSerializationUtils.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 01/06/2018.
//

#import <BlinkCard/BlinkCard.h>
#import <Foundation/Foundation.h>

@interface MBCSerializationUtils : NSObject

+(NSDictionary * _Nonnull) serializeNSDate:(NSDate * _Nullable) value;
+(NSDictionary * _Nonnull) serializeMBDateResult:(MBCDateResult * _Nonnull) value;
+(NSString * _Nullable) encodeMBImage:(MBCImage * _Nullable) image;
+(NSDictionary * _Nonnull)serializeCGPoint:(CGPoint) point;
+(NSDictionary * _Nonnull) serializeMBQuadrangle:(MBCQuadrangle * _Nonnull) quad;

@end