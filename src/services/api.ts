import axios from 'axios';
import { 
  getApiUrl, 
  TIMEOUT, 
  WITH_CREDENTIALS 
} from '../config/proxy';

// 创建axios实例
const api = axios.create({
  // 不再使用硬编码的基础URL，而是使用配置中的方法
  baseURL: '',  // 将由getApiUrl处理
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: WITH_CREDENTIALS,
});

// 请求拦截器（可以添加认证token等）
api.interceptors.request.use(
  config => {
    // 动态设置URL，确保开发环境使用代理，生产环境使用完整URL
    if (config.url) {
      config.url = getApiUrl(config.url);
    }
    
    // 例如，添加token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    // 全局错误处理
    console.error('API错误:', error);
    
    // 针对跨域问题的特殊错误处理
    if (error.message === 'Network Error') {
      console.error('可能存在跨域问题，请检查API服务器CORS配置或代理设置');
    }
    
    return Promise.reject(error);
  }
);

// API方法
export const getHealth = () => {
  // 注意：这里不再需要'/api'前缀，因为getApiUrl会处理
  console.log('请求URL:', `${getApiUrl('health')}`);
  return api.get('health');
};

export default api; 