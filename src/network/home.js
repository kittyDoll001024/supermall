import { request, requests } from "./request";

export function getHomeMultdata() {
  return request({
    url: "/home/multidata"
  })
}

export function getHomeGoods(type, page) {
  return requests({
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}
