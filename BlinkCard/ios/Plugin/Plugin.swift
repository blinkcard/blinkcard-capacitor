import Foundation
import Capacitor
import BlinkCard

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(BlinkCardCapacitorPlugin)
public class BlinkCardCapacitorPlugin: CAPPlugin {

    var pluginCall: CAPPluginCall?
    var recognizerCollection: MBCRecognizerCollection?

    @objc func scanWithCamera(_ call: CAPPluginCall) {

        defer {
            // Reference plugin call for resolving scanning result
            pluginCall = call
        }

        guard let licensesObject = call.getObject("license") else {
            call.reject("Must provide license for Microblink SDK!")
            return
        }

        guard let overlaySettingsObject = call.getObject("overlaySettings") else {
            call.reject("Must provide overlay settings!")
            return
        }

        guard let recognizerCollectionObject = call.getObject("recognizerCollection") else {
            call.reject("Must provide recognizer collection!")
            return
        }

        let jsonOverlaySettings = sanitizeDictionary(overlaySettingsObject)
        let jsonRecognizerCollection = sanitizeDictionary(recognizerCollectionObject)
        guard let jsonLicense = sanitizeDictionary(licensesObject) else {
            call.reject("Must provide license keys for Microblink SDK!")
            return
        }

        setLicenseKey(license: jsonLicense)

        recognizerCollection = MBCRecognizerSerializers.sharedInstance()?.deserializeRecognizerCollection(jsonRecognizerCollection)

        DispatchQueue.main.async {
            guard let overlayVC = MBCOverlaySettingsSerializers.sharedInstance()?.createOverlayViewController(jsonOverlaySettings, recognizerCollection: self.recognizerCollection, delegate: self) else {
                call.reject("Unsupported overlay view controller!")
                return
            }

            guard let recognizerRunneViewController: UIViewController =
                MBCViewControllerFactory.recognizerRunnerViewController(withOverlayViewController: overlayVC) else {
                    return
            }
            recognizerRunneViewController.modalPresentationStyle = .fullScreen
            self.bridge.viewController.present(recognizerRunneViewController, animated: true, completion: nil)
        }
    }

    private func setLicenseKey(license: [String:Any]) {

        if (license["showTrialLicenseWarning"] != nil) {
            let showTrialLicenseWarning = license["showTrialLicenseWarning"] as! Bool
            MBCMicroblinkSDK.shared().showTrialLicenseWarning = showTrialLicenseWarning
        }

        guard let iOSLicense = license["ios"] as? String else {
            pluginCall?.reject("You must provide iOS License for Microblink SDK")
            return
        }

        MBCMicroblinkSDK.shared().setLicenseKey(iOSLicense) { (licenseError) in
        }
    }

    private func sanitizeDictionary(_ dictionary: [String : Any]) -> [String : Any]? {
        var mutableDictionary = dictionary
        for key in dictionary.keys {
            if let aMutableDictionary = mutableDictionary[key] as? NSNull {
                if aMutableDictionary == NSNull() {
                    mutableDictionary[key] = nil
                }
            }
        }
        return mutableDictionary
    }
}

extension BlinkCardCapacitorPlugin: MBCOverlayViewControllerDelegate {

    public func overlayViewControllerDidFinishScanning(_ overlayViewController: MBCOverlayViewController!, state: MBCRecognizerResultState) {

        defer {
		recognizerCollection = nil
            pluginCall = nil
        }

        if (state != .empty) {
            overlayViewController.recognizerRunnerViewController?.pauseScanning()

            guard let recognizerListCount = recognizerCollection?.recognizerList.count else {
                return
            }

            var resultJson = [NSDictionary]()

		var isDocumentCaptureRecognizer = false

            for recognizerIndex in 0..<recognizerListCount {
                guard let resultDict = recognizerCollection?.recognizerList[recognizerIndex].serializeResult() else {
                    return
                }
                resultJson.append(resultDict as NSDictionary)
            }

            if (!isDocumentCaptureRecognizer) {
		pluginCall?.resolve([
			"cancelled": false,
			"resultList": resultJson
		])
		}

            DispatchQueue.main.async {
                overlayViewController.dismiss(animated: true, completion: nil)
            }
        }
    }

    public func overlayDidTapClose(_ overlayViewController: MBCOverlayViewController!) {
        defer {
		recognizerCollection = nil
            pluginCall = nil
        }

        overlayViewController.dismiss(animated: true, completion: nil)
    }
}