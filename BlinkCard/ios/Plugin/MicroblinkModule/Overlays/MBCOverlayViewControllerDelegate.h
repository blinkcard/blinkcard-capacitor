//
//  MBCOverlayViewControllerDelegate.h
//
//  Created by DoDo on 01/06/2018.
//

#pragma once

#import <BlinkCard/BlinkCard.h>

@protocol MBCOverlayViewControllerDelegate<NSObject>
@required

- (void)overlayViewControllerDidFinishScanning:(MBCOverlayViewController *)overlayViewController state:(MBCRecognizerResultState)state;
- (void)overlayDidTapClose:(MBCOverlayViewController *)overlayViewController;

@end