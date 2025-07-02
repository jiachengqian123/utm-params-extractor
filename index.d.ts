export interface BrowserInfo {
    isMobile: boolean;
    browser: string;
    userAgent: string;
    osType: 'iOS' | 'Android' | 'HarmonyOS' | 'Unknown';
    osVersion: string;
}

export interface UtmParams {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
    referrer: string;
    browser: BrowserInfo;
    timestamp: string;
    url: string;
}

declare class UtmTracker {
    constructor();
    getParams(): UtmParams;
    static get(): UtmParams;
}

export default UtmTracker;

declare global {
    interface Window {
        UtmTracker: typeof UtmTracker;
    }
} 