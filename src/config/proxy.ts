/**
 * 跨域代理配置文件
 * 用于管理所有与API通信相关的跨域配置
 */

// API基础URL
export const API_BASE_URL = 'http://192.168.5.21:8080/api';

// 开发环境下使用的代理路径前缀
export const API_PROXY_PREFIX = '/api';

// 是否启用凭证（cookies等）
export const WITH_CREDENTIALS = false;

// 请求超时时间(毫秒)
export const TIMEOUT = 10000;

// 构建API URL (根据环境判断是否使用代理)
export const getApiUrl = (endpoint: string): string => {
  // 开发环境使用相对路径，生产环境使用完整URL
  const isDev = import.meta.env.DEV;
  
  // 移除开头的斜杠以避免路径重复
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  
  if (isDev) {
    // 在开发环境中使用代理前缀，由Vite的开发服务器处理跨域
    return `${API_PROXY_PREFIX}/${cleanEndpoint}`;
  } else {
    // 在生产环境中使用完整URL，需要API服务器支持CORS
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
}; 