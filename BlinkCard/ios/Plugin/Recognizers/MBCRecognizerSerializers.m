#import "MBCRecognizerSerializers.h"

#import "MBCRecognizerWrapper.h"
#import "MBCSuccessFrameGrabberRecognizerWrapper.h"
#import "MBCBlinkCardRecognizerWrapper.h"

@interface MBCRecognizerSerializers ()

@property (nonatomic, strong) NSDictionary<NSString*, id<MBCRecognizerCreator>> *recognizerSerializers;

@end

@implementation MBCRecognizerSerializers

- (void)registerCreator:(id<MBCRecognizerCreator>)recognizerCreator {
    [self.recognizerSerializers setValue:recognizerCreator forKey:recognizerCreator.jsonName];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _recognizerSerializers = [[NSMutableDictionary alloc] init];
        [self registerCreator:[[MBCSuccessFrameGrabberRecognizerCreator alloc] init]];
        [self registerCreator:[[MBCBlinkCardRecognizerCreator alloc] init]];
    }
    return self;
}

+ (instancetype)sharedInstance {
    static MBCRecognizerSerializers *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];

    });
    return sharedInstance;
}

-(id<MBCRecognizerCreator>) recognizerCreatorForJson:(NSDictionary *)recognizerJson {
    NSString* recognizerType = [recognizerJson objectForKey:@"recognizerType"];
    return [self.recognizerSerializers objectForKey:recognizerType];
}

-(MBCRecognizerCollection *) deserializeRecognizerCollection:(NSDictionary *)jsonRecognizerCollection {
    NSArray *recognizerArray = [jsonRecognizerCollection valueForKey:@"recognizerArray"];
    NSUInteger numRecognizers = recognizerArray.count;

    NSMutableArray<MBCRecognizer*> *recognizers = [[NSMutableArray alloc] initWithCapacity:numRecognizers];
    for (NSUInteger i = 0; i < numRecognizers; ++i) {
        NSDictionary* recognizerJson = [recognizerArray objectAtIndex:i];
        [recognizers addObject:[[self recognizerCreatorForJson:recognizerJson] createRecognizer:recognizerArray[i]]];
    }

    MBCRecognizerCollection* recognizerCollection = [[MBCRecognizerCollection alloc] initWithRecognizers:recognizers];
    {
        id allowMultipleResults = [jsonRecognizerCollection objectForKey:@"allowMultipleResults"];
        if (allowMultipleResults != nil) {
            recognizerCollection.allowMultipleResults = [(NSNumber*)allowMultipleResults boolValue];
        }
    }
    {
        id milisecondsBeforeTimeout = [jsonRecognizerCollection objectForKey:@"milisecondsBeforeTimeout"];
        if (milisecondsBeforeTimeout != nil) {
            recognizerCollection.partialRecognitionTimeout = (NSTimeInterval)[(NSNumber*)milisecondsBeforeTimeout integerValue] / 1000.0;
        }
    }
    return recognizerCollection;
}

@end