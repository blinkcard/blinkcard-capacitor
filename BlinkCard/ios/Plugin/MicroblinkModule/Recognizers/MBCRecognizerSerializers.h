#import "MBCRecognizerWrapper.h"

#import <BlinkCard/BlinkCard.h>

#import <Foundation/Foundation.h>

@interface MBCRecognizerSerializers : NSObject

+(instancetype) sharedInstance;

-(MBCRecognizerCollection *) deserializeRecognizerCollection:(NSDictionary *)jsonRecognizerCollection;
-(id<MBCRecognizerCreator>) recognizerCreatorForJson:(NSDictionary *)recognizerJson;

@end