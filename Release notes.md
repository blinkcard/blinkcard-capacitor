## 2.10.0

- Updated to [Android SDK v2.10.0](https://github.com/blinkcard/blinkcard-android/releases/tag/v2.10.0) and [iOS SDK v2.10.0](https://github.com/BlinkCard/blinkcard-ios/releases/tag/v2.10.0)
- Updated the SDK to Capacitor V6 

**Improvements**

- Significant improvements in photocopy detection.
    - Both the False Rejection Rate and False Acceptance Rate are reduced by ~50% as measured on the default match level.

**Bug fixes**

- Android specific:
    - Removed libc++_shared.so from the SDK
    - Fix for duplicate attrs resource: attr/mb_onboardingImageColor when combining multiple Microblink's SDKs in the same app

## 2.9.1

- Updated to [Android SDK v2.9.3](https://github.com/blinkcard/blinkcard-android/releases/tag/v2.9.3) and [iOS SDK v2.9.1](https://github.com/BlinkCard/blinkcard-ios/releases/tag/v2.9.1)
- This version of the SDK contains the native iOS BlinkCard.xcframework with the privacy manifest file (`PrivacyInfo.xcprivacy`).

### Major API update

- We have introduced the **DirectAPI** method of scanning, which allows the SDK to extract the card information from static images without the need to use the device’s camera and our UI.
- Usage:
    - The `scanWithDirectApi` method requires four parameters:
    - `license`, the licenses for iOS and Android required to unlock the SDK
    - `recognizerCollection`, which is a collection of Recognizers used for card scanning.
    - `frontImage`, which would represent the image of the card where the card number in located in the Base64 format string
    - `backImage`,  which would represent the image of the second side of the card in the Base64 format string
        - the `backImage` parameter is optional when scanning the card that contains all of the information on one side (or if you extract specific information located only on one side), and can be left out from the implementation or passed as an empty string (`””`) 
- An example of its usage can be found in the [sample application](https://github.com/blinkcard/blinkcard-capacitor/blob/main/sample_files/home.page.ts) , both for the two-sided and one-sided card scanning. 
- More information about the DirectAPI scanning can be found here in the native documentation for [Android](https://github.com/BlinkCard/blinkcard-android?tab=readme-ov-file#direct-api) and [iOS](https://github.com/BlinkCard/blinkcard-ios?tab=readme-ov-file#direct-api-processing)
- We still recommend using direct camera scanning, as static images can sometimes be in lower-quality which can cause SDK extraction error. It would be best to use the scanWithDirectApi method when using the device’s camera is not an option.

## 2.9.0

- Updated to [Android SDK v2.9.0](https://github.com/blinkcard/blinkcard-android/releases/tag/v2.9.0) and [iOS SDK v2.9.0](https://github.com/BlinkCard/blinkcard-ios/releases/tag/v2.9.0)
- Updated Capacitor version to 5.7.0
- Improved scanning performance and added support for virtually any card layout
- Added new result `documentLivenessCheck` that contains liveness information for the first and second sides of the scanned card.
    - `handPresenceCheck` , `photocopyCheck` and `screenCheck` liveness information can be obtained.
- Added `BlinkCardMatchLevel` for configuring the strictness of the check result for the document liveness properties
- Added `BlinkCardCheckResult` for enumerating document liveness check results
- Added `allowInvalidCardNumber` setting that allows reading invalid card numbers to avoid endless scanning on testing cards.
    - Added `cardNumberValid` flag within the `BlinkCardRecognizer` result to check if the card number is valid.
- Added additional properties to `BlinkCardOverlaySettings` that can be modified.
- Fixed issue with the SDK localization.

**Breaking API changes:**
- Removed `LegacyBlinkCardRecognizer` and `LegacyBlinkCardEliteRecognizer` legacy recognizers.

## 2.6.0

- Updated to [Android SDK v2.6.0](https://github.com/BlinkCard/blinkcard-android/releases/tag/v2.6.0) and [iOS SDK v2.6.0](https://github.com/BlinkCard/blinkcard-ios/releases/tag/v2.6.0)

## 2.4.1

- Changed file prefixes to support interoperability with BlinkID.

## 2.4.0

- Updated to [Android SDK v2.4.0](https://github.com/BlinkCard/blinkcard-android/releases/tag/v2.4.0) and [iOS SDK v2.4.0](https://github.com/BlinkCard/blinkcard-ios/releases/tag/v2.4.0)
- Upgraded to [Capacitor v3](https://capacitorjs.com/docs/updating/3-0)

## 2.3.0

Initial plugin release with [Android SDK v2.3.0](https://github.com/BlinkCard/blinkcard-android/releases/tag/v2.3.0) and [iOS SDK v2.3.0](https://github.com/BlinkCard/blinkcard-ios/releases/tag/v2.3.0)
