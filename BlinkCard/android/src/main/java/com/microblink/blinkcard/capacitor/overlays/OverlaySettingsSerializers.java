package com.microblink.blinkcard.capacitor.overlays;

import android.content.Context;

import com.microblink.blinkcard.entities.recognizers.RecognizerBundle;
import com.microblink.blinkcard.uisettings.UISettings;
import com.microblink.blinkcard.capacitor.overlays.serialization.*;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public enum OverlaySettingsSerializers {
    INSTANCE;

    private HashMap<String, OverlaySettingsSerialization> mByJSONName = new HashMap<>();

    private void registerMapping(OverlaySettingsSerialization overlaySettingsSerialization) {
        mByJSONName.put(overlaySettingsSerialization.getJsonName(), overlaySettingsSerialization);
    }

    OverlaySettingsSerializers() {
        registerMapping(new BlinkCardOverlaySettingsSerialization());
    }

    public UISettings getOverlaySettings(Context context, JSONObject jsonOverlaySettings, RecognizerBundle recognizerBundle) {
        try {
            return mByJSONName.get(jsonOverlaySettings.getString("overlaySettingsType")).createUISettings(context, jsonOverlaySettings, recognizerBundle);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

}