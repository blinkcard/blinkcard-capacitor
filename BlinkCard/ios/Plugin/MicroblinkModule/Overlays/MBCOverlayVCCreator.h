//
//  MBCOverlayVCCreator.h
//
//  Created by DoDo on 08/06/2018.
//  Copyright © 2018 Microblink. All rights reserved.
//

#pragma once

#import "MBCOverlayViewControllerDelegate.h"

#import <BlinkCard/BlinkCard.h>
#import <Foundation/Foundation.h>

@protocol MBCOverlayVCCreator
@required

- (MBCOverlayViewController * _Nullable)createOverlayViewController:(NSDictionary * _Nullable)jsonOverlaySettings recognizerCollection:(MBCRecognizerCollection * _Nullable)recognizerCollection delegate:(id<MBCOverlayViewControllerDelegate> _Nullable) delegate;

@property (nonatomic, nonnull, readonly) NSString *jsonName;

@end