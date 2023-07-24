import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AdsService {

    async getAds() {
        const res = await api.get('api/ads')
        logger.log('[GETTING ADS]', res.data);
        const newAd = res.data.map(a => new Ad(a))
        AppState.ads = newAd
    }

    async getAdsByNumber() {
        const res = await api.get('api/ads?count=*2*')
        logger.log('[GETTING ADS', res.data);
        const TwoAds = new Ad(res.data);
        AppState.ads = TwoAds
    }
}

export const adsService = new AdsService()