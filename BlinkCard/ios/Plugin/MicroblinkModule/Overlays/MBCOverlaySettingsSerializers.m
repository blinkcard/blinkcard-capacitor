//
//  MBCOverlaySettingsSerializers.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBCOverlaySettingsSerializers.h"

#import "MBCOverlayVCCreator.h"
#import "MBCBlinkCardOverlaySettingsSerialization.h"

@interface MBCOverlaySettingsSerializers ()

@property (nonatomic, strong) NSDictionary<NSString*, id<MBCOverlayVCCreator>> *overlayCreators;

@end

@implementation MBCOverlaySettingsSerializers

- (void)registerMapping:(id<MBCOverlayVCCreator>)overlayCreator {
    [self.overlayCreators setValue:overlayCreator forKey:overlayCreator.jsonName];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _overlayCreators = [[NSMutableDictionary alloc] init];
        [self registerMapping:[[MBCBlinkCardOverlaySettingsSerialization alloc] init]];
    }
    return self;
}

+ (instancetype)sharedInstance {
    static MBCOverlaySettingsSerializers *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];

    });
    return sharedInstance;
}

-(MBCOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBCRecognizerCollection*)recognizerCollection delegate:(id<MBCOverlayViewControllerDelegate>)delegate {
    return [[self.overlayCreators valueForKey:[jsonOverlaySettings valueForKey:@"overlaySettingsType"]] createOverlayViewController:jsonOverlaySettings recognizerCollection:recognizerCollection delegate:delegate];
}

@end