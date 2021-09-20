//
//  MBCSuccessFrameGrabberRecognizerWrapper.m
//  MicroblinkModule
//
//  Created by DoDo on 15/06/2018.
//  Copyright © 2018 Jura Skrlec. All rights reserved.
//

#import "MBCSuccessFrameGrabberRecognizerWrapper.h"

#import "MBCRecognizerSerializers.h"
#import "MBCSerializationUtils.h"

@implementation MBCSuccessFrameGrabberRecognizerCreator

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"SuccessFrameGrabberRecognizer";
    }
    return self;
}

-(MBCRecognizer *) createRecognizer:(NSDictionary*) jsonRecognizer {
    // first obtain slave recognizer
    NSDictionary *jsonSlaveRecognizer = [jsonRecognizer valueForKey:@"slaveRecognizer"];
    MBCRecognizer *slaveRecognizer = [[[MBCRecognizerSerializers sharedInstance] recognizerCreatorForJson:jsonSlaveRecognizer] createRecognizer:jsonSlaveRecognizer];

    return [[MBCSuccessFrameGrabberRecognizer alloc] initWithRecognizer:slaveRecognizer];
}

@end

@interface MBCSuccessFrameGrabberRecognizer (JsonSerialization)
@end

@implementation MBCSuccessFrameGrabberRecognizer (JsonSerialization)

-(NSDictionary *) serializeResult {
    NSMutableDictionary* jsonResult = (NSMutableDictionary*)[super serializeResult];

    [jsonResult setValue:[MBCSerializationUtils encodeMBImage:self.result.successFrame] forKey:@"successFrame"];
    [jsonResult setValue:[self.slaveRecognizer serializeResult] forKey:@"slaveRecognizerResult"];

    return jsonResult;
}

@end