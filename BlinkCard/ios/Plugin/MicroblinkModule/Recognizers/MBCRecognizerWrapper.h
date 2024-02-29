//
//  MBCRecognizerWrapper.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 01/06/2018.
//

#pragma once

#import <BlinkCard/BlinkCard.h>

/** Object that knows how to create recognizer from JSON */
@protocol MBCRecognizerCreator
@required

- (MBCRecognizer * _Nullable)createRecognizer:(NSDictionary * _Nullable) jsonRecognizer;

@property (nonatomic, nonnull, readonly) NSString* jsonName;

@end

/** Category on MBCRecognizer that adds support writing its result to JSON */

@interface MBCRecognizer (JsonSerialization)

- (NSDictionary * _Nullable)serializeResult;

@end