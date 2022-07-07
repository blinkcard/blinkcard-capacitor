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
      ios: 'sRwAAAEVY29tLm1pY3JvYmxpbmsuc2FtcGxl1BIcP6dpSuS/37rVPJmIM83fr/w89BOJALPcMQUwS9wIOKQPWi56s63K7WjS0zghtd7iZjWQ+Y3GsPgYIwIoPX1Pw0lyXLGevYFZrCPL+GqHVPgVolbhruatlqsXDECRwQsN7TwA9UXVr3Zd+EmiwbsglYqI0wBx7IyPndVfRcFmGozG4PSP9+0Mb5BLUPHHxuH1iV+TlGbukfps/XEHEoFXHnQXLWUH4BRClsSJVQ==',
      android: 'sRwAAAAVY29tLm1pY3JvYmxpbmsuc2FtcGxlU9kJdb5ZkGlTu623PARDZ2y3bw/2FMh5N8Ns88iVHtrPi9+/nWa1Jfjuaio9sNqvjMT6OtkQ6mJBjE58IcmwG5+mm6WUi+Jy6MYfmGIzIoMFQvkqfYUo2Q/WFqsbYjo57kuic4Q5BWQbqavo1wF7llPipW1ABXqrTLnoewhyHJrJCMyXSOvK6ensoeNbd2iJtgi2L6myHxmekGcmW2ZnKr9otoMUy0YqZ5AjqMxjDw==',
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
    return buildResult(`${result.month}/${result.year}`, key);
  }
  return '';
}

function buildIntResult(result, key) {
  if (result >= 0) {
    return buildResult(result.toString(), key);
  }
  return '';
}