//
//  MBCOverlaySerializationUtils.m
//  MicroblinkModule
//
//  Created by DoDo on 08/06/2018.
//  Copyright © 2018 Jura Skrlec. All rights reserved.
//

#import "MBCOverlaySerializationUtils.h"

@implementation MBCOverlaySerializationUtils

+(void) extractCommonOverlaySettings:(NSDictionary *)jsonOverlaySettings overlaySettings:(MBCOverlaySettings *)overlaySettings {
    {
        id useFrontCamera = [jsonOverlaySettings objectForKey:@"useFrontCamera"];
        if (useFrontCamera != nil && [(NSNumber*)useFrontCamera boolValue]) {
            overlaySettings.cameraSettings.cameraType = MBCCameraTypeFront;
        }
    }
    {
        id language = [jsonOverlaySettings objectForKey:@"language"];
        if (language != nil && language != NSNull.null) {
            id country = [jsonOverlaySettings objectForKey:@"country"];
            if (country && country != NSNull.null) {
                overlaySettings.language = [[(NSString *)language stringByAppendingString:@"-" ] stringByAppendingString:(NSString *)country];
            } else {
                overlaySettings.language = (NSString *)language;
            }
        }
    }
    if ([overlaySettings isKindOfClass:[MBCBaseOverlaySettings class]]) {
        MBCBaseOverlaySettings *baseOverlaySettings = (MBCBaseOverlaySettings*)overlaySettings;
        {
            id enableBeep = [jsonOverlaySettings objectForKey:@"enableBeep"];
            if ([enableBeep isKindOfClass:NSNumber.class]) {
                if (((NSNumber*)enableBeep).boolValue) {
                    baseOverlaySettings.soundFilePath = [[MBCMicroblinkApp sharedInstance].resourcesBundle pathForResource:@"PPbeep" ofType:@"wav"];
                } else {
                    baseOverlaySettings.soundFilePath = @"";
                }
            }
        }
    }
}

@end