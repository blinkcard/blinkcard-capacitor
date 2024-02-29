import { Component } from '@angular/core';
import * as BlinkCard from '@microblink/blinkcard-capacitor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Results?: string;
  DocumentFirstSide?: string;
  DocumentSecondSide?: string;

  constructor() {}

  async scan() {

    const plugin = new BlinkCard.BlinkCardPlugin();

    const blinkCardRecognizer = new BlinkCard.BlinkCardRecognizer();
    blinkCardRecognizer.returnFullDocumentImage = true;

    // com.microblink.sample
    const licenseKeys: BlinkCard.License = {
      ios: 'sRwCABVjb20ubWljcm9ibGluay5zYW1wbGUBbGV5SkRjbVZoZEdWa1QyNGlPakUzTURnMk9EWTNOalE0TURZc0lrTnlaV0YwWldSR2IzSWlPaUkwT1RabFpEQXpaUzAwT0RBeExUUXpZV1F0WVRrMU5DMDBNemMyWlRObU9UTTVNR1FpZlE9Pc2TFqY01wri2M94Fe5sCUOx4F7K3M5TXqNAAJZWrZrJijNfC57WBNQMo7GkQo9Fp6zemUCuWlW0XGzB0RqVzCG1Y8aztpnim/cOYMPi5xoqZm3O3DeSkjmH6qUIyg==',
      android: 'sRwCABVjb20ubWljcm9ibGluay5zYW1wbGUAbGV5SkRjbVZoZEdWa1QyNGlPakUzTURnMk9EWTNPRGcwT1Rrc0lrTnlaV0YwWldSR2IzSWlPaUkwT1RabFpEQXpaUzAwT0RBeExUUXpZV1F0WVRrMU5DMDBNemMyWlRObU9UTTVNR1FpZlE9PUwdDoL/tBLmwfbOm3/dmw5DjLaYtTz1AGwI1162GlPEct+8fJxPBysGwVZ/8KX0Ygxi7NeroVHPM6IDNhCkmUMDHqELYqH3nK8xm8FPaTjCcN53o3B40SKVLm1Quw==',
      showTrialLicenseWarning: true
    };

    const scanningResults = await plugin.scanWithCamera(
      new BlinkCard.BlinkCardOverlaySettings(),
      new BlinkCard.RecognizerCollection([blinkCardRecognizer]),
      licenseKeys
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