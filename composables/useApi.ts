import type { NitroFetchOptions } from 'nitropack'

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
  method?: 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace'
}

const useApi = async (
  uri: string,
  options: FetchOptions = {},
  withContentType: boolean = true
): Promise<any> => {
  const { apiBaseUrl } = useRuntimeConfig().public

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
  }

  if (withContentType) {
    defaultHeaders['Content-Type'] = 'application/json'
  }

  const headers = {
    ...defaultHeaders,
    ...options.headers,
  }

  try {
    const fetchOptions: NitroFetchOptions<string, 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace'> = {
      ...options,
      headers,
      method: options.method ?? 'get',
    }

    return await $fetch(apiBaseUrl + uri, fetchOptions)
  } catch (e: any) {
    throw e
  }
}

export default useApi
