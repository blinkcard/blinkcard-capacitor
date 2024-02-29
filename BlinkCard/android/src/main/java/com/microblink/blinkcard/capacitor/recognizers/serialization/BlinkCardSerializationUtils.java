package com.microblink.blinkcard.capacitor.recognizers.serialization;

import com.microblink.blinkcard.capacitor.SerializationUtils;

import com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardAnonymizationMode;
import com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardAnonymizationSettings;
import com.microblink.blinkcard.entities.recognizers.blinkcard.CardNumberAnonymizationSettings;
import com.microblink.blinkcard.entities.recognizers.blinkcard.MatchLevel;
import com.microblink.blinkcard.entities.recognizers.blinkcard.DocumentLivenessCheckResult;

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
            return BlinkCardAnonymizationMode.values()[json.optInt(name, 1)];
        }

        public static JSONObject serializeDocumentLivenessCheckResult(DocumentLivenessCheckResult documentLivenessCheckResult) throws JSONException {
            JSONObject jsonDocumentLivenessCheckResult = new JSONObject();
            if (documentLivenessCheckResult != null) {
                JSONObject frontDocumentLivenessResult = new JSONObject();
                frontDocumentLivenessResult.put("handPresenceCheck", documentLivenessCheckResult.getFront().getHandPresenceCheck().ordinal());
                frontDocumentLivenessResult.put("photocopyCheck", documentLivenessCheckResult.getFront().getPhotocopyCheck().getCheckResult().ordinal());
                frontDocumentLivenessResult.put("screenCheck", documentLivenessCheckResult.getFront().getScreenCheck().getCheckResult().ordinal());
                jsonDocumentLivenessCheckResult.put("front", frontDocumentLivenessResult);
                JSONObject backDocumentLivenessResult = new JSONObject();
                backDocumentLivenessResult.put("handPresenceCheck", documentLivenessCheckResult.getBack().getHandPresenceCheck().ordinal());
                backDocumentLivenessResult.put("photocopyCheck", documentLivenessCheckResult.getBack().getPhotocopyCheck().getCheckResult().ordinal());
                backDocumentLivenessResult.put("screenCheck", documentLivenessCheckResult.getBack().getScreenCheck().getCheckResult().ordinal());
                jsonDocumentLivenessCheckResult.put("back", backDocumentLivenessResult);
            }
            return jsonDocumentLivenessCheckResult;
        }

        public static MatchLevel deserializeMatchLevel(JSONObject json, String name) {
            return MatchLevel.values()[json.optInt(name, 5)];
    }
}