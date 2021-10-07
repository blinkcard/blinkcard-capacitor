//
//  MBCOverlayVCCreator.h
//  MicroblinkModule
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

-(MBCOverlayViewController *) createOverlayViewController:(NSDictionary *)jsonOverlaySettings recognizerCollection:(MBCRecognizerCollection*)recognizerCollection delegate:(id<MBCOverlayViewControllerDelegate>) delegate;

@property (nonatomic, nonnull, readonly) NSString *jsonName;

@end