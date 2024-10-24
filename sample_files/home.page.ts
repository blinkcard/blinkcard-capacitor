import { Component } from '@angular/core';
import * as BlinkCard from '@microblink/blinkcard-capacitor';
import { CameraResultType, Camera } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Results?: string;
  DocumentFirstSide?: string;
  DocumentSecondSide?: string;

  // license key is needed to unlock the BlinCard SDK
  // com.microblink.sample
  licenseKeys: BlinkCard.License = {
    ios: 'sRwCABVjb20ubWljcm9ibGluay5zYW1wbGUBbGV5SkRjbVZoZEdWa1QyNGlPakUzTWprM05qQTRORFF6TWpVc0lrTnlaV0YwWldSR2IzSWlPaUprWkdRd05qWmxaaTAxT0RJekxUUXdNRGd0T1RRNE1DMDFORFU0WWpBeFlUVTJZamdpZlE9PdpgwBE8zC2bkURiApcIdb+xhoY+mB/itohh9v8my1Lb39N8IPk/HfYIvDD0m8X/cFME1JJfUJGJUetfARGfzFILLtIt9JPo+T7IalVil7FiBU1llaQFHKjUoryGrQ==',
    android: 'sRwCABVjb20ubWljcm9ibGluay5zYW1wbGUAbGV5SkRjbVZoZEdWa1QyNGlPakUzTWprM05qQTRNVEk0TURjc0lrTnlaV0YwWldSR2IzSWlPaUprWkdRd05qWmxaaTAxT0RJekxUUXdNRGd0T1RRNE1DMDFORFU0WWpBeFlUVTJZamdpZlE9PfikQ/spr3JjXSCa8CyD2Ia0PMt5PMnGUb7ypnEnXO7QzwQLPl0m0Y1DavWTVjaskpeum+zMui+dHoo+5NS/5Pu25yg5Tu4jWOkXSZkYUh/XSmvVEfSG3Mr38VOZtQ==',
    showTrialLicenseWarning: true
  };

  constructor() {}
  
  /* BlinkCard scanning with camera */
  async scan() {

    const plugin = new BlinkCard.BlinkCardPlugin();

    const blinkCardRecognizer = new BlinkCard.BlinkCardRecognizer();
    blinkCardRecognizer.returnFullDocumentImage = true;

    const scanningResults = await plugin.scanWithCamera(
      new BlinkCard.BlinkCardOverlaySettings(),
      new BlinkCard.RecognizerCollection([blinkCardRecognizer]),
      this.licenseKeys
    );

    if (scanningResults.length === 0) {
      return;
    }

    for (const result of scanningResults) {
      if (result instanceof BlinkCard.BlinkCardRecognizerResult) {
        this.Results = getCardResultsString(result);
        this.DocumentFirstSide = result.firstSideFullDocumentImage ? `data:image/jpg;base64,${result.firstSideFullDocumentImage}` : undefined;
        this.DocumentSecondSide = result.secondSideFullDocumentImage ? `data:image/jpg;base64,${result.secondSideFullDocumentImage}` : undefined;
      } 
    }
  }

  /* BlinkCard scanning with DirectAPI that requires both card images.
  Best used for getting the information from both sides from various cards */
  async directApiTwoSidesScan() {

    const plugin = new BlinkCard.BlinkCardPlugin();

   // Select the first image where the card number is located and return the Base64 string
    const firstImage = await this.pickImage();

   // Select the image of the second side of the card and return the Base64 string
   const secondImage = await this.pickImage();

   const blinkCardRecognizer = new BlinkCard.BlinkCardRecognizer();
   blinkCardRecognizer.returnFullDocumentImage = true;

    try {

      const scanningResults = await plugin.scanWithDirectApi(
        this.licenseKeys,
        new BlinkCard.RecognizerCollection([blinkCardRecognizer]),
        firstImage,
        secondImage
      );
  
      if (scanningResults.length === 0) {
        return;
      }
  
      for (const result of scanningResults) {
        if (result instanceof BlinkCard.BlinkCardRecognizerResult) {
          this.Results = getCardResultsString(result);
          this.DocumentFirstSide = result.firstSideFullDocumentImage ? `data:image/jpg;base64,${result.firstSideFullDocumentImage}` : undefined;
          this.DocumentSecondSide = result.secondSideFullDocumentImage ? `data:image/jpg;base64,${result.secondSideFullDocumentImage}` : undefined;
        } 
      }
    } catch (scanningError: any) {
      this.Results = scanningError.message || 'An unknown error occurred';
      this.DocumentFirstSide = "";
      this.DocumentSecondSide = "";
    }
  }

  /* BlinkCard scanning with DirectAPI that requires one card image.
  Best used for cards that have all of the information on one side, or if the needed information is on one side */
  async directApiOneSideScan() {

    const plugin = new BlinkCard.BlinkCardPlugin();

    // Select the image where the card number is located and return the Base64 string
    const image = await this.pickImage();

    const blinkCardRecognizer = new BlinkCard.BlinkCardRecognizer();
    blinkCardRecognizer.returnFullDocumentImage = true;
    blinkCardRecognizer.returnFullDocumentImage = true;
    blinkCardRecognizer.extractCvv = false;
    blinkCardRecognizer.extractIban = false;
    blinkCardRecognizer.extractExpiryDate = false;

    try {

      const scanningResults = await plugin.scanWithDirectApi(
        this.licenseKeys,
        new BlinkCard.RecognizerCollection([blinkCardRecognizer]),
        image
      );
  
      if (scanningResults.length === 0) {
        return;
      }
  
      for (const result of scanningResults) {
        if (result instanceof BlinkCard.BlinkCardRecognizerResult) {
          this.Results = getCardResultsString(result);
          this.DocumentFirstSide = result.firstSideFullDocumentImage ? `data:image/jpg;base64,${result.firstSideFullDocumentImage}` : undefined;
          this.DocumentSecondSide = "";
        } 
      }
    } catch (scanningError: any) {
      this.Results = scanningError.message || 'An unknown error occurred';
      this.DocumentFirstSide = "";
      this.DocumentSecondSide = "";
    }
  }

  // A helper method to obtain the base64 image for DirectAPI processing
  async pickImage(): Promise<string> {
    const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
    });
    return image.base64String ?? '';
  }
}

function getCardResultsString(result: BlinkCard.BlinkCardRecognizerResult) {
  return buildResult(result.cardNumber, 'Card Number') +
      buildResult(result.cardNumberPrefix, 'Card Number Prefix') +
      buildResult(result.iban, 'IBAN') +
      buildResult(result.cvv, 'CVV') +
      buildResult(result.owner, 'Owner') +
      buildResult(result.cardNumberValid?.toString(), 'Card Number Valid') +
      buildDateResult(result.expiryDate, 'Expiry date') +
      buildLivenessResult(result.documentLivenessCheck?.front, "Front side liveness check") +
      buildLivenessResult(result.documentLivenessCheck?.back, "Back side liveness check");
}

function buildResult(result: any, key: String) {
  if (result && result !== '') {
    return `${key}: ${result}\n`;
  }
  return '';
}

function buildLivenessResult(result: BlinkCard.BlinkCardSide | undefined, key: String) {
  if (result) {
    return `\n${key}:\n` +
    buildResult(result.handPresenceCheck.toString(), "Hand presence check") + 
    buildResult(result.photocopyCheck.toString(), "Photocopy check") +
    buildResult(result.screenCheck.toString(), "Screen check");
  }
  return '';
}

function buildDateResult(result: BlinkCard.Date | undefined, key: String) {
  if (result && result.year !== 0) {
    return buildResult(`${result.month}/${result.year}`, key);
  }
  return '';
}

function buildIntResult(result: number, key: String) {
  if (result >= 0) {
    return buildResult(result.toString(), key);
  }
  return '';
}