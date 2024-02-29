package com.microblink.blinkcard.capacitor.overlays.serialization;

import android.content.Context;

import com.microblink.blinkcard.entities.recognizers.RecognizerBundle;
import com.microblink.blinkcard.fragment.overlay.blinkcard.reticleui.BlinkCardReticleOverlayStrings;
import com.microblink.blinkcard.uisettings.BlinkCardUISettings;
import com.microblink.blinkcard.uisettings.UISettings;
import com.microblink.blinkcard.capacitor.overlays.OverlaySettingsSerialization;
import com.microblink.blinkcard.capacitor.overlays.OverlaySerializationUtils;

import org.json.JSONObject;

public final class BlinkCardOverlaySettingsSerialization implements OverlaySettingsSerialization {
    @Override
    public UISettings createUISettings(Context context, JSONObject jsonUISettings, RecognizerBundle recognizerBundle) {
        BlinkCardUISettings settings = new BlinkCardUISettings(recognizerBundle);

        OverlaySerializationUtils.prepareCommonUiSettings(context, jsonUISettings, settings);

        settings.setEditScreenEnabled(false);

        boolean showFlashlightWarning = jsonUISettings.optBoolean("showFlashlightWarning", true);
        settings.setShowGlareWarning(showFlashlightWarning);

        boolean showOnboardingInfo = jsonUISettings.optBoolean("showOnboardingInfo", true);
        settings.setShowOnboardingInfo(showOnboardingInfo);

        boolean showIntroductionDialog = jsonUISettings.optBoolean("showIntroductionDialog", true);
        settings.setShowIntroductionDialog(showIntroductionDialog);

        long onboardingButtonTooltipDelay = jsonUISettings.optLong("onboardingButtonTooltipDelay", 8000);
        settings.setShowTooltipTimeIntervalMs(onboardingButtonTooltipDelay);

        BlinkCardReticleOverlayStrings.Builder overlayStringsBuilder = new BlinkCardReticleOverlayStrings.Builder(context);
        String firstSideInstructions = getStringFromJSONObject(jsonUISettings, "firstSideInstructions");
        if (firstSideInstructions != null) {
            overlayStringsBuilder.setFrontSideInstructionsText(firstSideInstructions);
        }
        String flipCardInstructions = getStringFromJSONObject(jsonUISettings, "flipCardInstructions");
        if (flipCardInstructions != null) {
            overlayStringsBuilder.setFlipCardInstructions(flipCardInstructions);
        }
        String errorMoveCloser = getStringFromJSONObject(jsonUISettings, "errorMoveCloser");
        if (errorMoveCloser != null) {
            overlayStringsBuilder.setErrorMoveCloser(errorMoveCloser);
        }
        String errorMoveFarther = getStringFromJSONObject(jsonUISettings, "errorMoveFarther");
        if (errorMoveFarther != null) {
            overlayStringsBuilder.setErrorMoveFarther(errorMoveFarther);
        }
        String errorCardTooCloseToEdge = getStringFromJSONObject(jsonUISettings, "errorCardTooCloseToEdge");
        if (errorCardTooCloseToEdge != null) {
            overlayStringsBuilder.setErrorCardTooCloseToEdge(errorCardTooCloseToEdge);
        }

        settings.setStrings(overlayStringsBuilder.build());
        return settings;
    }

    private String getStringFromJSONObject(JSONObject map, String key) {
        String value = map.optString(key, null);
        if ("null".equals(value)) {
            value = null;
        }
        return value;
    }

    @Override
    public String getJsonName() {
        return "BlinkCardOverlaySettings";
    }
}