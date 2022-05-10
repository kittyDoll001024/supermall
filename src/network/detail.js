import { requests } from "./request";

// 商品详情数据
export function getDetail(iid) {
  return requests({
    url: "/detail",
    params: {
      iid
    }
  })
}

// 详情推荐数据
export function getRecommend() {
  return requests({
    url: "/recommend"
  })
}

// 商品数据
export class Goods {
  constructor(itemInfo, services, columns) {
    this.title = itemInfo.title
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.desc = itemInfo.desc
    this.discountDesc = itemInfo.discountDesc
    this.lowNowPrice = itemInfo.lowNowPrice
    this.discountBgColor = itemInfo.discountBgColor
    this.services = services
    this.columns = columns
  }
}

// 商家信息数据
export class Shop {
  constructor(shopInfo) {
    this.score = shopInfo.score
    this.shopLogo = shopInfo.shopLogo
    this.cFans = shopInfo.cFans
    this.cGoods = shopInfo.cGoods
    this.cSells = shopInfo.cSells
    this.name = shopInfo.name
    
  }
}

// 参数数据
export class GoodsParam {
  constructor(info, rule) {
    this.infos = info.set
    this.sizes = rule.tables
    this.image = info.images ? info.images[0] : ""
  }
}
