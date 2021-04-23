package com.microblink.blinkcard.capacitor.overlays;

import android.content.Context;

import com.microblink.blinkcard.capacitor.FakeR;
import com.microblink.blinkcard.hardware.camera.CameraType;
import com.microblink.blinkcard.uisettings.CameraSettings;
import com.microblink.blinkcard.uisettings.UISettings;
import com.microblink.blinkcard.uisettings.options.BeepSoundUIOptions;

import org.json.JSONObject;

public class OverlaySerializationUtils {

    public static void prepareCommonUiSettings(Context context, JSONObject jsonUISettings, UISettings uiSettings) {
        boolean useFrontCamera = jsonUISettings.optBoolean("useFrontCamera", false);
        if (useFrontCamera) {
            CameraSettings cameraSettings = new CameraSettings.Builder()
                    .setType(CameraType.CAMERA_FRONTFACE).build();
            uiSettings.setCameraSettings(cameraSettings);
        }

        if (uiSettings instanceof BeepSoundUIOptions) {
            boolean enableBeep = jsonUISettings.optBoolean("enableBeep", false);
            if (true) {
                FakeR fakeR = new FakeR(context);
                ((BeepSoundUIOptions) uiSettings).setBeepSoundResourceID(fakeR.getId("raw", "beep"));
            }
        }
    }
}