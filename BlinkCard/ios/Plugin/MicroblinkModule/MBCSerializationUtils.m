//
//  MBCSerializationUtils.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 01/06/2018.
//

#import "MBCSerializationUtils.h"

@implementation MBCSerializationUtils

+(NSDictionary *) serializeDay:(NSInteger)day month:(NSInteger)month year:(NSInteger)year {
    return @{
      @"day" : [NSNumber numberWithInteger:day],
      @"month" : [NSNumber numberWithInteger:month],
      @"year" : [NSNumber numberWithInteger:year]
    };
}

+(NSDictionary *) serializeNSDate:(NSDate*) value {
    NSDateComponents *components = [[NSCalendar currentCalendar] components:NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear fromDate:value];
    return [MBCSerializationUtils serializeDay:components.day month:components.month year:components.year];
}

+(NSDictionary *) serializeMBDateResult:(MBCDateResult *) value {
    return [MBCSerializationUtils serializeDay:value.day month:value.month year:value.year];
}

+(NSString *) encodeMBImage:(MBCImage * _Nullable) image {
    const int COMPRESSED_IMAGE_QUALITY = 90;

    if (image != nil) {
        NSData *imageData = UIImageJPEGRepresentation(image.image, COMPRESSED_IMAGE_QUALITY / 100.f);
        return [imageData base64EncodedStringWithOptions:0];
    } else {
        return nil;
    }
}

+(NSDictionary *)serializeCGPoint:(CGPoint) point {
    return @{
        @"x" : [NSNumber numberWithFloat:point.x],
        @"y" : [NSNumber numberWithFloat:point.y]
    };
}

+(NSDictionary *) serializeMBQuadrangle:(MBCQuadrangle *) quad {
    return @{
        @"upperLeft" : [MBCSerializationUtils serializeCGPoint:quad.upperLeft],
        @"upperRight" : [MBCSerializationUtils serializeCGPoint:quad.upperRight],
        @"lowerLeft" : [MBCSerializationUtils serializeCGPoint:quad.lowerLeft],
        @"lowerRight" : [MBCSerializationUtils serializeCGPoint:quad.lowerRight]
    };
}

@end