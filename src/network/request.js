import axios from "axios"

// 封装一个 axios
export function request(config) {
  const instance1 = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 2000
  })
  // 拦截器
  /* instance1.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  }) */
  // 响应式拦截器
  instance1.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  // 发送网络请求
  return instance1(config)
}


export function requests(config) {
  const instance2 = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 2000
  })

  instance2.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance2(config)
}