import { Component } from '@angular/core';
import * as BlinkID from '@microblink/blinkid-capacitor';
import * as BlinkCard from '@microblink/blinkcard-capacitor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Results: string;
  ResultsCard: string;
  DocumentFront: string;
  DocumentBack: string;
  DocumentFace: string;
  DocumentFirstSide: string;
  DocumentSecondSide: string;

  constructor() {}

  async scan() {

    const plugin = new BlinkID.BlinkIDPlugin();

    const blinkIdCombinedRecognizer = new BlinkID.BlinkIdCombinedRecognizer();
    blinkIdCombinedRecognizer.returnFullDocumentImage = true;
    blinkIdCombinedRecognizer.returnFaceImage = true;

    // com.microblink.sample
    const licenseKeys: BlinkID.License = {
      ios: 'sRwAAAEVY29tLm1pY3JvYmxpbmsuc2FtcGxl1BIcP4FpSuS/38JVPN6LN30XR1dNmBk0UwYGCLgOyTq5zPvPIF/qiXxOunWtkR0r059DRiZZ4jBoJ5XHTpN67T//JZJmqKFOyew5HKkYoY3yVvHHQzkME6RXH9aE6g20UaOMiQy0ovE8u6TOVeJEtwkfFFs7YmAYlDmUBXYHJ+q8k1SxBNUa/O95f2IFgD8hnIN8qXElNDC+RMa9UQu3rx2LdAbD/VbEOT8C873Y3K0gy71X0vVqgAgUJ2S3MqWuxIn21+PS6IorRz3/lsB1Tti4JjeCaUm3FWeV8dErWav0sLr4tt+uI8RGLJvHdehLFRPekLa25PTDz2rnzUccxFAP',
      android: 'sRwAAAAVY29tLm1pY3JvYmxpbmsuc2FtcGxlU9kJdZhZkGlTu9U3PMNBZBWiPW+o0Uk0mC9jNyz3kW8/eNwXJfp2mnHLrdFFWGly5ja3ioMhDcjBxsmz2gHcj/CcfmUhA13Z69hwha6+qptLwcpRr3gPbt62VyR4uBxke1q7dGraSh3lmEqL6lQThkvEvxBhXX24jh76OjS/FTBS3cAZpMTApiiZvWrpSosHPotJXjnjH99LGTsUZJmZFHFNFXKJQuS3IkndqNQK1sJotkDNQt9cq3sRELM2onCQ51Yo+ORb2r3wANSGSjw02IUjPaU8VPXOsdVP3A1quKJDbJRi+4jC/oAII+HdDt1FhPHgaCdX463bDP3S5aWmx/nB',
      showTrialLicenseWarning: true
    };

    const scanningResults = await plugin.scanWithCamera(
      new BlinkID.BlinkIdOverlaySettings(),
      new BlinkID.RecognizerCollection([blinkIdCombinedRecognizer]),
      licenseKeys
    );

    if (scanningResults.length === 0) {
      return;
    }

    for (const result of scanningResults) {
      if (result instanceof BlinkID.BlinkIdCombinedRecognizerResult) {
        this.Results = getIdResultsString(result);
        this.DocumentFront = result.fullDocumentFrontImage ? `data:image/jpg;base64,${result.fullDocumentFrontImage}` : undefined;
        this.DocumentBack = result.fullDocumentBackImage ? `data:image/jpg;base64,${result.fullDocumentBackImage}` : undefined;
        this.DocumentFace = result.faceImage ? `data:image/jpg;base64,${result.faceImage}` : undefined;
      } else if (result instanceof BlinkID.MrtdCombinedRecognizerResult) {
        this.Results = getMrzResultsString(result);
        this.DocumentFront = result.fullDocumentFrontImage ? `data:image/jpg;base64,${result.fullDocumentFrontImage}` : undefined;
        this.DocumentBack = result.fullDocumentBackImage ? `data:image/jpg;base64,${result.fullDocumentBackImage}` : undefined;
        this.DocumentFace = result.faceImage ? `data:image/jpg;base64,${result.faceImage}` : undefined;
      }
    }
  }

  async scanCard() {

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
        this.ResultsCard = getCardResultsString(result);
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

function getIdResultsString(result: BlinkID.BlinkIdCombinedRecognizerResult) {
  return buildResult(result.firstName, 'First name') +
      buildResult(result.lastName, 'Last name') +
      buildResult(result.fullName, 'Full name') +
      buildResult(result.localizedName, 'Localized name') +
      buildResult(result.additionalNameInformation, 'Additional name info') +
      buildResult(result.address, 'Address') +
      buildResult(
          result.additionalAddressInformation, 'Additional address info') +
      buildResult(result.documentNumber, 'Document number') +
      buildResult(
          result.documentAdditionalNumber, 'Additional document number') +
      buildResult(result.sex, 'Sex') +
      buildResult(result.issuingAuthority, 'Issuing authority') +
      buildResult(result.nationality, 'Nationality') +
      buildDateResult(result.dateOfBirth, 'Date of birth') +
      buildIntResult(result.age, 'Age') +
      buildDateResult(result.dateOfIssue, 'Date of issue') +
      buildDateResult(result.dateOfExpiry, 'Date of expiry') +
      buildResult(result.dateOfExpiryPermanent.toString(),
          'Date of expiry permanent') +
      buildResult(result.maritalStatus, 'Martial status') +
      buildResult(result.personalIdNumber, 'Personal Id Number') +
      buildResult(result.profession, 'Profession') +
      buildResult(result.race, 'Race') +
      buildResult(result.religion, 'Religion') +
      buildResult(result.residentialStatus, 'Residential Status') +
      buildDriverLicenceResult(result.driverLicenseDetailedInfo);
}

function getMrzResultsString(result: BlinkID.MrtdCombinedRecognizerResult) {
  const mrzResult = result.mrzResult;
  return buildResult(mrzResult.primaryId, 'Primary ID') +
      buildResult(mrzResult.secondaryId, 'Secondary ID') +
      buildResult(mrzResult.gender, 'Gender') +
      buildResult(mrzResult.issuer, 'Issuer') +
      buildResult(mrzResult.nationality, 'Nationality') +
      buildDateResult(mrzResult.dateOfBirth, 'Date of birth') +
      buildIntResult(mrzResult.age, 'Age') +
      buildDateResult(mrzResult.dateOfExpiry, 'Date of expiry') +
      buildResult(mrzResult.documentCode, 'Document code') +
      buildResult(mrzResult.documentType, 'Document type') +
      buildResult(mrzResult.opt1, 'Optional 1') +
      buildResult(mrzResult.opt2, 'Optional 2') +
      buildResult(mrzResult.mrzText, 'MRZ Text');
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

function buildDriverLicenceResult(result) {
  if (result) {
    return buildResult(result.restrictions, 'Restrictions') +
        buildResult(result.endorsements, 'Endorsements') +
        buildResult(result.vehicleClass, 'Vehicle class') +
        buildResult(result.conditions, 'Conditions');
  }
  return '';
}
