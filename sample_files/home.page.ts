import { Component } from '@angular/core';
import * as BlinkCard from '@microblink/blinkcard-capacitor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Results: string;
  EditResults: string;
  DocumentFirstSide: string;
  DocumentSecondSide: string;

  constructor() {}

  async scan() {

    const plugin = new BlinkCard.BlinkCardPlugin();

    const blinkCardRecognizer = new BlinkCard.BlinkCardRecognizer();
    blinkCardRecognizer.returnFullDocumentImage = true;

    // com.microblink.sample
    const licenseKeys: BlinkCard.License = {
      ios: 'sRwAAAEVY29tLm1pY3JvYmxpbmsuc2FtcGxl1BIcP6dpSuS/37rVPcGKMeTrsgR8MahcSwwXAx7W+q4DISNxpyD6+I7UJwEXZY0idcmSKWVeQM6vHpTFfH7GFprdWTFfjlKyu60UtOHF0npdL2MmfTLta+7nnJRT28SshWOzbKsFOlZ0JJoeiZMEyM4znE2J6KFWNTsI8rIUfKoZvf1ZrPQRT1B+2AzIVrm6WmIIUKHsoHnmvNM424vPEBC4yhcWu2anECMkX8Li/Q==',
      android: 'sRwAAAAVY29tLm1pY3JvYmxpbmsuc2FtcGxlU9kJdb5ZkGlTu623PZxAZICPbHRp9IoY9I830/KF7XwO8xpxs1tlpIHihmMKXYcAMdAiQHI0UYZaw/MqIyWvt2dDUTunS3xrbYfu4Ubhq3sRVM/6k/s43MqANJo+g7Jm9u6rrjLfdAkmNEsV69xPNd5fYBfDnp2iQed8SYB9RVLljhWOJepp7jACKo86X6CmsZHqwomPqjvxdhyRh+mZIUNTx74F11yprw4JMONQvg==',
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
      buildResult(result.cardNumberValid.toString(), 'Card Number Valid') +
      buildDateResult(result.expiryDate, 'Expiry date');
    }

function buildResult(result, key) {
  if (result && result !== '') {
    return `${key}: ${result}\n`;
  }
  return '';
}

function buildDateResult(result, key) {
  if (result && result.year !== 0) {
    return buildResult(`${result.day}.${result.month}.${result.year}`, key);
  }
  return '';
}

function buildIntResult(result, key) {
  if (result >= 0) {
    return buildResult(result.toString(), key);
  }
  return '';
}