import { OverlaySettings } from '../overlaySettings'

/**
 * Class for setting up BlinkCard overlay.
 * BlinkCard overlay is best suited for scanning payment cards.
 */
export class BlinkCardOverlaySettings extends OverlaySettings {

    /**
     * String: user instructions that are shown above camera preview while the first side of the
     * document is being scanned.
     * If null, default value will be used.
     */
    firstSideInstructions: string;

    /**
     * String: user instructions that are shown above camera preview while the second side of the
     * document is being scanned.
     * If null, default value will be used.
     */
    flipCardInstructions: string;

    /**
    * Defines whether glare warning will be displayed when user turn on a flashlight
    *
    * Default: true
    */
    showFlashlightWarning: boolean;

    /**
    * String: Instructions for the user to move the document closer
    * 
    * If null, default value will be used.
    */
    errorMoveCloser: string;

    /**
    * String: Instructions for the user to move the document farther
    * 
    * If null, default value will be used.
    */
    errorMoveFarther: string;
    
    /**
    * String: Instructions for the user to move the document from the edge
    * 
    * If null, default value will be used.
    */
    errorCardTooCloseToEdge: string;
    
    /**
    * Defines whether button for presenting onboarding screens will be present on screen
    * 
    * Default: true
    */
    showOnboardingInfo: boolean;
    
    /**
    * Defines whether button for presenting onboarding screens will be present on screen
    * 
    * Default: true
    */
    showIntroductionDialog: boolean;
    
    /**
    * Option to configure when the onboarding help tooltip will appear. 
    * 
    * Default: 8000
    */
    onboardingButtonTooltipDelay: number;
        
    /**
    * Language of the UI. 
    * If default overlay contains textual information, text will be localized to this language. Otherwise device langauge will be used
    * example: "en" 
    */
    language: string;
    
    /**
    * Used with language variable, it defines the country locale 
    *
    * example: "US" to use "en_US" on Android and en-US on iOS
    */
    country: string;

    constructor() {
        super('BlinkCardOverlaySettings');

        this.firstSideInstructions = null;
        this.flipCardInstructions = null;
        this.showFlashlightWarning = true;
        this.errorMoveCloser = null;
        this.errorMoveFarther = null;
        this.errorCardTooCloseToEdge = null;
        this.showOnboardingInfo = true;
        this.showIntroductionDialog = true;
        this.onboardingButtonTooltipDelay = 8000;
        this.language = null;
        this.country = null;
    }
}
