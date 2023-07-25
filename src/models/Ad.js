export class Ad {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.linkUrl = `https://${data.linkUrl}`
        this.square = data.square
        this.banner = data.banner
    }
}


// let ad = // {
//     "title": "MusicisFun",
//     "linkURL": "boisecodeworks.com",
//     "tall": "https://codeworks.blob.core.windows.net/public/assets/ads/TallAdMusicisfun.png",
//     "square": "https://codeworks.blob.core.windows.net/public/assets/ads/SquareAdMusicisfun.png",
//     "banner": "https://codeworks.blob.core.windows.net/public/assets/ads/BannerAdMusicisfun.png"
//   }