import { Plugins } from '@capacitor/core';

const { BlinkCardCapacitorPlugin } = Plugins;

import { Recognizer, RecognizerResult, RecognizerCollection, RecognizerResultState } from '../recognizer'
import { OverlaySettings } from '../overlaySettings'

export interface License {
    ios: string;
    android: string;
    showTrialLicenseWarning: boolean;
}

export enum ScanningStatus {
  cancelled,
  succeeded
}

export class BlinkCardPlugin implements BlinkCardPluginInterface {
  async scanWithCamera(overlaySettings: OverlaySettings, recognizerCollection: RecognizerCollection, license: License): Promise<any> {

    let functions = [];
    for ( let recognizer of recognizerCollection.recognizerArray ) {
        let recognizerFunction = recognizer.createResultFromNative;
        functions.push( recognizerFunction );
        delete recognizer.createResultFromNative;
    }

    const response = await BlinkCardCapacitorPlugin.scanWithCamera({'overlaySettings': overlaySettings, 'recognizerCollection': recognizerCollection, 'license': license});
    const results = response.resultList;
    const isCancelled = response.cancelled;
    let resultsFromNative = [];
    if (!isCancelled && results) {
        for ( let i = 0; i < results.length; ++i ) {
            recognizerCollection.recognizerArray[ i ].createResultFromNative = functions[ i ];
            let result = recognizerCollection.recognizerArray[i].createResultFromNative(results[i]);
            if (result.resultState != RecognizerResultState.empty) {
                resultsFromNative.push(result);
            }
        }
    }

    return resultsFromNative
  }

  async scanWithDirectApi(license: License, recognizerCollection: RecognizerCollection, frontImage: string, backImage?: string): Promise<any> {

    let functions = [];
    for ( let recognizer of recognizerCollection.recognizerArray ) {
        let recognizerFunction = recognizer.createResultFromNative;
        functions.push( recognizerFunction );
        delete recognizer.createResultFromNative;
    }

    const response = await BlinkCardCapacitorPlugin.scanWithDirectApi({'license': license, 'recognizerCollection': recognizerCollection, 'frontImage': frontImage, 'backImage': backImage});
    const results = response.resultList;
    const isCancelled = response.cancelled;
    let resultsFromNative = [];
    if (!isCancelled && results) {
        for ( let i = 0; i < results.length; ++i ) {
            recognizerCollection.recognizerArray[ i ].createResultFromNative = functions[ i ];
            let result = recognizerCollection.recognizerArray[i].createResultFromNative(results[i]);
            if (result.resultState != RecognizerResultState.empty) {
                resultsFromNative.push(result);
            }
        }
    }
    return resultsFromNative
  }
}

export interface BlinkCardPluginInterface {
  scanWithCamera(overlaySettings: OverlaySettings, recognizerCollection: RecognizerCollection, license: License): Promise<any>;
  scanWithDirectApi(license: License, recognizerCollection: RecognizerCollection, frontImage: string, backImage?: string): Promise<any>;
}