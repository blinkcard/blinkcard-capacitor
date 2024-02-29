//
//  MBCRecognizer+MBCRecognizerWrapper_m.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 01/06/2018.
//

#import "MBCRecognizerWrapper.h"
#import <Foundation/Foundation.h>

@implementation MBCRecognizer (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* result = [[NSMutableDictionary alloc] init];

    [result setObject:[NSNumber numberWithUnsignedInteger:self.baseResult.resultState] forKey:@"resultState"];
    return result;
}

@end