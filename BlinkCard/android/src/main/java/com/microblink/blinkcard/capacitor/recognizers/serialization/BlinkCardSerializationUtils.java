package com.microblink.blinkcard.capacitor.recognizers.serialization;

import com.microblink.blinkcard.capacitor.SerializationUtils;

import com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardAnonymizationMode;
import com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardAnonymizationSettings;
import com.microblink.blinkcard.entities.recognizers.blinkcard.CardNumberAnonymizationSettings;

import org.json.JSONException;
import org.json.JSONObject;

public abstract class BlinkCardSerializationUtils {

        public static CardNumberAnonymizationSettings deserializeCardNumberAnonymizationSettings(JSONObject json) {
            if (json == null) {
                return new CardNumberAnonymizationSettings();
            } else {
                BlinkCardAnonymizationMode mode = getAnonymizationMode(json,"mode");
                int prefix = json.optInt("prefixDigitsVisible", 0);
                int suffix = json.optInt("suffixDigitsVisible", 0);
                return new CardNumberAnonymizationSettings(mode, prefix, suffix);
            }
        }

        public static BlinkCardAnonymizationSettings deserializeBlinkCardAnonymizationSettings(JSONObject json) {
            BlinkCardAnonymizationSettings settings = new BlinkCardAnonymizationSettings();
            if (json != null) {
                settings.setCardNumberAnonymizationSettings(deserializeCardNumberAnonymizationSettings(json.optJSONObject("cardNumberAnonymizationSettings")));
                settings.setCvvAnonymizationMode(getAnonymizationMode(json, "cvvAnonymizationMode"));
                settings.setIbanAnonymizationMode(getAnonymizationMode(json,"ibanAnonymizationMode"));
                settings.setCardNumberPrefixAnonymizationMode(getAnonymizationMode(json,"cardNumberPrefixAnonymizationMode"));
                settings.setOwnerAnonymizationMode(getAnonymizationMode(json,"ownerAnonymizationMode"));
            }

            return settings;
        }

        private static BlinkCardAnonymizationMode getAnonymizationMode(JSONObject json, String name) {
            return BlinkCardAnonymizationMode.values()[json.optInt(name, 1) -1];
        }

}