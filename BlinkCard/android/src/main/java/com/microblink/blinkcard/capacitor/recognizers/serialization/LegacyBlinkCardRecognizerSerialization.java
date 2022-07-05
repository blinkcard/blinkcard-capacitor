package com.microblink.blinkcard.capacitor.recognizers.serialization;

import com.microblink.blinkcard.entities.recognizers.Recognizer;
import com.microblink.blinkcard.capacitor.recognizers.RecognizerSerialization;
import com.microblink.blinkcard.capacitor.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class LegacyBlinkCardRecognizerSerialization implements RecognizerSerialization {

    @Override
    public Recognizer<?> createRecognizer(JSONObject jsonObject) {
        com.microblink.blinkcard.entities.recognizers.blinkcard.legacy.LegacyBlinkCardRecognizer recognizer = new com.microblink.blinkcard.entities.recognizers.blinkcard.legacy.LegacyBlinkCardRecognizer();
        recognizer.setAnonymizeCardNumber(jsonObject.optBoolean("anonymizeCardNumber", false));
        recognizer.setAnonymizeCvv(jsonObject.optBoolean("anonymizeCvv", false));
        recognizer.setAnonymizeIban(jsonObject.optBoolean("anonymizeIban", false));
        recognizer.setAnonymizeOwner(jsonObject.optBoolean("anonymizeOwner", false));
        recognizer.setDetectGlare(jsonObject.optBoolean("detectGlare", true));
        recognizer.setExtractCvv(jsonObject.optBoolean("extractCvv", true));
        recognizer.setExtractIban(jsonObject.optBoolean("extractIban", false));
        recognizer.setExtractInventoryNumber(jsonObject.optBoolean("extractInventoryNumber", true));
        recognizer.setExtractOwner(jsonObject.optBoolean("extractOwner", false));
        recognizer.setExtractValidThru(jsonObject.optBoolean("extractValidThru", true));
        recognizer.setFullDocumentImageDpi(jsonObject.optInt("fullDocumentImageDpi", 250));
        recognizer.setFullDocumentImageExtensionFactors(SerializationUtils.deserializeExtensionFactors(jsonObject.optJSONObject("fullDocumentImageExtensionFactors")));
        recognizer.setReturnFullDocumentImage(jsonObject.optBoolean("returnFullDocumentImage", false));
        return recognizer;
    }

    @Override
    public JSONObject serializeResult(Recognizer<?> recognizer) {
        com.microblink.blinkcard.entities.recognizers.blinkcard.legacy.LegacyBlinkCardRecognizer.Result result = ((com.microblink.blinkcard.entities.recognizers.blinkcard.legacy.LegacyBlinkCardRecognizer)recognizer).getResult();
        JSONObject jsonResult = new JSONObject();
        try {
            SerializationUtils.addCommonRecognizerResultData(jsonResult, result);
            jsonResult.put("cardNumber", result.getCardNumber());
            jsonResult.put("cvv", result.getCvv());
            jsonResult.put("documentDataMatch", SerializationUtils.serializeEnum(result.getDocumentDataMatch()));
            jsonResult.put("fullDocumentBackImage", SerializationUtils.encodeImageBase64(result.getFullDocumentBackImage()));
            jsonResult.put("fullDocumentFrontImage", SerializationUtils.encodeImageBase64(result.getFullDocumentFrontImage()));
            jsonResult.put("iban", result.getIban());
            jsonResult.put("inventoryNumber", result.getInventoryNumber());
            jsonResult.put("issuer", SerializationUtils.serializeEnum(result.getIssuer()));
            jsonResult.put("owner", result.getOwner());
            jsonResult.put("scanningFirstSideDone", result.isScanningFirstSideDone());
            jsonResult.put("validThru", SerializationUtils.serializeDate(result.getValidThru()));
        } catch (JSONException e) {
            // see https://developer.android.com/reference/org/json/JSONException
            throw new RuntimeException(e);
        }
        return jsonResult;
    }

    @Override
    public String getJsonName() {
        return "LegacyBlinkCardRecognizer";
    }

    @Override
    public Class<?> getRecognizerClass() {
        return com.microblink.blinkcard.entities.recognizers.blinkcard.legacy.LegacyBlinkCardRecognizer.class;
    }
}