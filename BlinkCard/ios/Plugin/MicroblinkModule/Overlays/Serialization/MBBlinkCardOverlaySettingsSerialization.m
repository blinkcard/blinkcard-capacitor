//
//  MBBlinkCardOverlaySettingsSerialization.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBBlinkCardOverlaySettingsSerialization.h"
#import "MBOverlaySerializationUtils.h"

@interface MBCBlinkCardOverlaySettingsSerialization ()

@property (nonatomic, weak) id<MBCOverlayViewControllerDelegate> delegate;

@end

@implementation MBCBlinkCardOverlaySettingsSerialization

@synthesize jsonName = _jsonName;

-(instancetype) init {
    self = [super init];
    if (self) {
        _jsonName = @"BlinkCardOverlaySettings";
    }
    return self;
}

-(MBCOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBCRecognizerCollection*)recognizerCollection delegate:(id<MBCOverlayViewControllerDelegate>) delegate {
    // no settings deserialized at the moment
    MBCBlinkCardOverlaySettings *sett = [[MBCBlinkCardOverlaySettings alloc] init];
    self.delegate = delegate;
    sett.enableEditScreen = NO;
    [MBCOverlaySerializationUtils extractCommonOverlaySettings:jsonOverlaySettings overlaySettings:sett];

    {
        id glareMessage = [jsonOverlaySettings valueForKey:@"glareMessage"];
        if (glareMessage != nil) {
            sett.glareStatusMessage = (NSString *)glareMessage;
        }
    }

    {
        id firstSideInstructions = [jsonOverlaySettings valueForKey:@"firstSideInstructions"];
        if (firstSideInstructions != nil) {
            sett.frontSideMessage = (NSString *)firstSideInstructions;
        }
    }

    {
        id flipCardInstructions = [jsonOverlaySettings valueForKey:@"flipCardInstructions"];
        if (flipCardInstructions != nil) {
            sett.backSideMessage = (NSString *)flipCardInstructions;
        }
    }

    {
        id showFlashlightWarning = [jsonOverlaySettings valueForKey:@"showFlashlightWarning"];
        if (showFlashlightWarning != nil) {
            sett.showFlashlightWarning = [showFlashlightWarning boolValue];
        }
    }

    return [[MBCBlinkCardOverlayViewController alloc] initWithSettings:sett recognizerCollection:recognizerCollection delegate:self];
}


- (void)blinkCardOverlayViewControllerDidFinishScanning:(nonnull MBCBlinkCardOverlayViewController *)blinkCardOverlayViewController state:(MBCRecognizerResultState)state {
    [self.delegate overlayViewControllerDidFinishScanning:blinkCardOverlayViewController state:state];
}

- (void)blinkCardOverlayViewControllerDidTapClose:(nonnull MBCBlinkCardOverlayViewController *)blinkCardOverlayViewController {
    [self.delegate overlayDidTapClose:blinkCardOverlayViewController];
}

@end