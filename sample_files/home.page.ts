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
      ios: 'sRwAAAEVY29tLm1pY3JvYmxpbmsuc2FtcGxl1BIcP6dpSuS/37rVPjGokDWGeG0uIpg5vai86BjddI7X/rWIW0lmxdRfVFjAiONnsMYkAVGfTogq4XZBIyaQGc64arVDzTyPmbetbZ+8TMGw81HQwQTDOa7YLu1YlrOylkq+yK8Lt9rmTyWJcZ4s+i7Mif8gft8GXuErzTQhN+g2vs+89zoXlxeTaY9o0iQvXee4DxFd8oo58UqlvZ2EgBIZSoZNFnczm/rRvhsFIw==',
      android: 'sRwAAAAVY29tLm1pY3JvYmxpbmsuc2FtcGxlU9kJdb5ZkGlTu623Pixiw8Ch4dc3R99hww4bJP3CjnjB2xsx3MaGWq2rlYlj8a+o1ELLtwafmJLUVUrG+P2Wz+xJVT658sNQa9iyNRMRLkCYUxwi7JMPSULVHWGXvf+KYLRhSccUdMhkKUvAaCp1qwTYoTiC2TsZ6JCKgcg+BKCcthz3ibXVIvsD+aWCCEAIYCImsSkMfnQW7JlNKnUQQDYeRzgYrcnBER0I8NiArA==',
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