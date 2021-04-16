# BlinkCard SDK Capacitor plugin

AI-driven Credit Card scanning software for cross-platform apps built with Capacitor. Keep in mind that for full access to all features and functionalities, you’ll be better off using one of our native SDKs ([iOS](https://github.com/BlinkCard/blinkcard-ios)
and [Android](https://github.com/BlinkCard/blinkcard-android)). Not all features of native SDKs are available. However, the wrapper is open source so you can add the features that you need.

Below, you'll find everything you need to add BlinkCard in your Capacitor iOS or Android app ⬇️

## Minimum software requirements

Package depends on [BlinkCard SDK](https://microblink.com/products/blinkcard) and it is required to download and install [BlinkCard iOS SDK](https://github.com/BlinkCard/blinkcard-ios) and [BlinkCard Android SDK](https://github.com/BlinkCard/blinkcard-android). For more information on how to do that, please check our [Platform specifics](#platform-specifics) section.

### Capacitor

BlinkCard plugin is developed with Capacitor version 2.4.0.
For help with Capacitor, view official [documentation](https://capacitorjs.com/docs).

### iOS

BlinkCard Capacitor plugin supports iOS 11.0 or newer.

### Android

BlinkCard Capacitor plugin support Android Android 5.0 (API level 21) or newer.

## Getting Started

To get started, first create empty project if needed:

```shell
ionic start project_name --capacitor
```

Install blinkcard-capacitor package:

```shell
npm install --save @microblink/blinkcard-capacitor
```

### Quick start with sample app

Sample app is built with latest [Ionic framework](https://ionicframework.com) and it uses [Angular](https://angular.io). To try BlinkCard plugin, you can generate a minimal sample application. To do so run `./initIonicSampleApp.sh` script.

To run sample application:

* iOS
	* Open the app in XCode by running ```npx cap open ios``` from the sample app's root directory
	* Open info.plist and add corresponding permissions to the app
		* Privacy - Camera Usage Description: To Take Photos and Video
	* Open `Signing & Capabilities` and set your Team
	* Press `Run`

* Android
	* Open the app in Android Studio by running ```npx cap open android``` from the sample app's root directory
	* Press `Run`

### Plugin usage

1. Import blinkcard-capacitor package

	```typescript
	import * as BlinkCard from '@microblink/blinkcard-capacitor';
	```

2. Initialize plugin

	```typescript
	const plugin = new BlinkCard.BlinkCardPlugin();
	```
	
3. Perform scanning by calling the method `plugin.scanWithCamera()` and pass `RecognizerCollection`, `OverlaySettings` you wish to use and license keys. To find out more about licensing, click
 [here](#licensing).
 
	 ```typescript
	async scan() {
		 	
	 	// Initialize plugin
		const plugin = new BlinkCard.BlinkCardPlugin();
		
		// Initialize wanted recognizer
    	const blinkCardRecognizer = new BlinkCard.BlinkCardRecognizer();
    	blinkCardRecognizer.returnFullDocumentImage = true
	
		// Initialize license 
		const licenseKeys: BlinkCard.License = {
	  		ios: '<your_ios_license>',
	  		android: '<your_android_license>',
	  		showTimeLimitedLicenseKeyWarning: true
		};
		
		// Perform scan and gather results
		const scanningResults = await plugin.scanWithCamera(
      		new BlinkCard.BlinkCardOverlaySettings(),
      		new BlinkCard.RecognizerCollection([blinkCardRecognizer])
			licenseKeys
		);
  	}
	 ```
	
4. When scanning is completed, variable `scanningResults` will contain a list of non-empty `RecognizerResults` from recognizers set in `RecognizerCollection`. You can then access each result individually. If the scanning is manually closed, the method will return an empty list.

For more information please refer to our sample files in [SampleFiles folder](https://github.com/BlinkCard/blinkcard-capacitor/tree/master/SampleFiles) and  sample application source code.

### Available API

All available recognizers can be found inside `BlinkCard/src/recognizers`.

All available overlays can be found inside `BlinkCard/src/overlays`.

### Platform specifics

Plugin implementation is in folder `src`, while platform specific implementations are in `android` and `ios` folders.

#### iOS

To initialize BlinkCard framework for use with iOS, after you've added the dependency to `@microblink/blinkcard-capacitor` to your project, go to `NameOfYourProject/ios`and run `pod install`.
Our `@microblink/blinkcard-capacitor` depends on the latest [MBBlinkCard pod](https://cocoapods.org/pods/MBBlinkCard) so it will be installed automatically.

#### Android

To use BlinkCard plugin on Android you need to add the plugin to the MainActivity.java. Note that our [script](https://github.com/BlinkCard/blinkcard-capacitor/blob/feature/ios-capacitor/initIonicSampleApp.sh) does this automatically.

```java
public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(com.microblink.capacitor.MicroblinkPlugin.class);
    }});
  }
}
```

## Licensing

- [Generate](https://microblink.com/login?url=/customer/generatedemolicence) a **free trial license key** to start using the SDK in your app (registration required)
- Get information about pricing and licensing of [BlinkCard](https://microblink.com/blinkcard)
