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

    constructor() {
        super('BlinkCardOverlaySettings');

        this.firstSideInstructions = null;
        this.flipCardInstructions = null;
        this.showFlashlightWarning = true;
    }
}
