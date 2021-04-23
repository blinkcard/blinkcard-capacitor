package com.microblink.blinkcard.capacitor.overlays;

import android.content.Context;

import com.microblink.blinkcard.entities.recognizers.RecognizerBundle;
import com.microblink.blinkcard.uisettings.UISettings;

import org.json.JSONObject;

public interface OverlaySettingsSerialization {

    UISettings createUISettings(Context context, JSONObject jsonUISettings, RecognizerBundle recognizerBundle);

    String getJsonName();
}