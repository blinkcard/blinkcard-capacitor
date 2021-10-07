//
//  MBCOverlaySettingsSerializers.h
//  BlinkIdDevDemo
//
//  Created by DoDo on 04/06/2018.
//

#import "MBCOverlayViewControllerDelegate.h"

#import <BlinkCard/BlinkCard.h>

#import <Foundation/Foundation.h>

@interface MBCOverlaySettingsSerializers : NSObject

+(instancetype) sharedInstance;

-(MBCOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBCRecognizerCollection*)recognizerCollection delegate:(id<MBCOverlayViewControllerDelegate>)delegate;

@end