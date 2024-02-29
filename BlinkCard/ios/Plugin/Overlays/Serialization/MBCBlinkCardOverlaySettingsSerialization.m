//
//  MBCBlinkCardOverlaySettingsSerialization.m
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBCBlinkCardOverlaySettingsSerialization.h"
#import "MBCOverlaySerializationUtils.h"

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
    
    {
        id errorMoveCloser = [jsonOverlaySettings valueForKey:@"errorMoveCloser"];
        if (errorMoveCloser != nil) {
            sett.errorMoveCloser = (NSString *)errorMoveCloser;
        }
    }
    
    {
        id errorMoveFarther = [jsonOverlaySettings valueForKey:@"errorMoveFarther"];
        if (errorMoveFarther != nil) {
            sett.errorMoveFarther = (NSString *)errorMoveFarther;
        }
    }
    
    {
        id errorCardTooCloseToEdge = [jsonOverlaySettings valueForKey:@"errorCardTooCloseToEdge"];
        if (errorCardTooCloseToEdge != nil) {
            sett.errorDocumentTooCloseToEdge = (NSString *)errorCardTooCloseToEdge;
        }
    }
    
    {
        id showOnboardingInfo = [jsonOverlaySettings valueForKey:@"showOnboardingInfo"];
        if (showOnboardingInfo != nil) {
            sett.showOnboardingInfo = [showOnboardingInfo boolValue];
        }
    }
    
    {
        id showIntroductionDialog = [jsonOverlaySettings valueForKey:@"showIntroductionDialog"];
        if (showIntroductionDialog != nil) {
            sett.showIntroductionDialog = [showIntroductionDialog boolValue];
        }
    }
    
    {
        id onboardingButtonTooltipDelay = [jsonOverlaySettings valueForKey:@"onboardingButtonTooltipDelay"];
        if (onboardingButtonTooltipDelay != nil) {
            sett.onboardingButtonTooltipDelay = [onboardingButtonTooltipDelay doubleValue] / 1000.0;
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