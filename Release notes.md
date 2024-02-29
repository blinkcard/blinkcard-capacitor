## 2.9.0

- Updated to [Android SDK v2.9.0](https://github.com/blinkcard/blinkcard-android/releases/tag/v2.9.0) and [iOS SDK v2.9.0](https://github.com/BlinkCard/blinkcard-ios/releases/tag/v2.9.0)
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
