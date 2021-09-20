//
//  MBCOverlaySerializationUtils.h
//  MicroblinkModule
//
//  Created by DoDo on 08/06/2018.
//  Copyright © 2018 Jura Skrlec. All rights reserved.
//

#import <BlinkCard/BlinkCard.h>
#import <Foundation/Foundation.h>

@interface MBCOverlaySerializationUtils : NSObject

+(void) extractCommonOverlaySettings:(NSDictionary *)jsonOverlaySettings overlaySettings:(MBCOverlaySettings *)overlaySettings;

@end