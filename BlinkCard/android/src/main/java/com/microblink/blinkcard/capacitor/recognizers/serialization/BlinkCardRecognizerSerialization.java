package com.microblink.blinkcard.capacitor.recognizers.serialization;

import com.microblink.blinkcard.entities.recognizers.Recognizer;
import com.microblink.blinkcard.capacitor.recognizers.RecognizerSerialization;
import com.microblink.blinkcard.capacitor.SerializationUtils;

import org.json.JSONException;
import org.json.JSONObject;

public final class BlinkCardRecognizerSerialization implements RecognizerSerialization {

    @Override
    public Recognizer<?> createRecognizer(JSONObject jsonObject) {
        com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardRecognizer recognizer = new com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardRecognizer();
        recognizer.setAllowBlurFilter(jsonObject.optBoolean("allowBlurFilter", true));
        recognizer.setAllowInvalidCardNumber(jsonObject.optBoolean("allowInvalidCardNumber", false));
        recognizer.setAnonymizationSettings(BlinkCardSerializationUtils.deserializeBlinkCardAnonymizationSettings(jsonObject.optJSONObject("anonymizationSettings")));
        recognizer.setExtractCvv(jsonObject.optBoolean("extractCvv", true));
        recognizer.setExtractExpiryDate(jsonObject.optBoolean("extractExpiryDate", true));
        recognizer.setExtractIban(jsonObject.optBoolean("extractIban", true));
        recognizer.setExtractOwner(jsonObject.optBoolean("extractOwner", true));
        recognizer.setFullDocumentImageDpi(jsonObject.optInt("fullDocumentImageDpi", 250));
        recognizer.setFullDocumentImageExtensionFactors(SerializationUtils.deserializeExtensionFactors(jsonObject.optJSONObject("fullDocumentImageExtensionFactors")));
        recognizer.setHandDocumentOverlapThreshold((float)jsonObject.optDouble("handDocumentOverlapThreshold", 0.05));
        recognizer.setHandScaleThreshold((float)jsonObject.optDouble("handScaleThreshold", 0.15));
        recognizer.setPaddingEdge((float)jsonObject.optDouble("paddingEdge", 0.0));
        recognizer.setPhotocopyAnalysisMatchLevel(BlinkCardSerializationUtils.deserializeMatchLevel(jsonObject, "photocopyAnalysisMatchLevel"));
        recognizer.setReturnFullDocumentImage(jsonObject.optBoolean("returnFullDocumentImage", false));
        recognizer.setScreenAnalysisMatchLevel(BlinkCardSerializationUtils.deserializeMatchLevel(jsonObject, "screenAnalysisMatchLevel"));
        return recognizer;
    }

    @Override
    public JSONObject serializeResult(Recognizer<?> recognizer) {
        com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardRecognizer.Result result = ((com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardRecognizer)recognizer).getResult();
        JSONObject jsonResult = new JSONObject();
        try {
            SerializationUtils.addCommonRecognizerResultData(jsonResult, result);
            jsonResult.put("cardNumber", result.getCardNumber());
            jsonResult.put("cardNumberPrefix", result.getCardNumberPrefix());
            jsonResult.put("cardNumberValid", result.isCardNumberValid());
            jsonResult.put("cvv", result.getCvv());
            jsonResult.put("documentLivenessCheck", BlinkCardSerializationUtils.serializeDocumentLivenessCheckResult(result.getDocumentLivenessCheck()));
            jsonResult.put("expiryDate", SerializationUtils.serializeDate(result.getExpiryDate()));
            jsonResult.put("firstSideAnonymized", result.isFirstSideAnonymized());
            jsonResult.put("firstSideBlurred", result.isFirstSideBlurred());
            jsonResult.put("firstSideFullDocumentImage", SerializationUtils.encodeImageBase64(result.getFirstSideFullDocumentImage()));
            jsonResult.put("iban", result.getIban());
            jsonResult.put("issuer", SerializationUtils.serializeEnum(result.getIssuer()));
            jsonResult.put("owner", result.getOwner());
            jsonResult.put("processingStatus", SerializationUtils.serializeEnum(result.getProcessingStatus()));
            jsonResult.put("scanningFirstSideDone", result.isScanningFirstSideDone());
            jsonResult.put("secondSideAnonymized", result.isSecondSideAnonymized());
            jsonResult.put("secondSideBlurred", result.isSecondSideBlurred());
            jsonResult.put("secondSideFullDocumentImage", SerializationUtils.encodeImageBase64(result.getSecondSideFullDocumentImage()));
        } catch (JSONException e) {
            // see https://developer.android.com/reference/org/json/JSONException
            throw new RuntimeException(e);
        }
        return jsonResult;
    }

    @Override
    public String getJsonName() {
        return "BlinkCardRecognizer";
    }

    @Override
    public Class<?> getRecognizerClass() {
        return com.microblink.blinkcard.entities.recognizers.blinkcard.BlinkCardRecognizer.class;
    }
}