/**
 * 本地存储工具
 */
export const storage = {
  /**
   * 设置本地存储
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error('Failed to set storage:', error)
    }
  },

  /**
   * 获取本地存储
   */
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue ?? null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error('Failed to get storage:', error)
      return defaultValue ?? null
    }
  },

  /**
   * 删除本地存储
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove storage:', error)
    }
  },

  /**
   * 清空本地存储
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  },

  /**
   * 检查是否存在
   */
  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null
    } catch (error) {
      console.error('Failed to check storage:', error)
      return false
    }
  },
}

/**
 * 会话存储工具
 */
export const sessionStorage = {
  /**
   * 设置会话存储
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value)
      window.sessionStorage.setItem(key, serialized)
    } catch (error) {
      console.error('Failed to set session storage:', error)
    }
  },

  /**
   * 获取会话存储
   */
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = window.sessionStorage.getItem(key)
      if (item === null) {
        return defaultValue ?? null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error('Failed to get session storage:', error)
      return defaultValue ?? null
    }
  },

  /**
   * 删除会话存储
   */
  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove session storage:', error)
    }
  },

  /**
   * 清空会话存储
   */
  clear(): void {
    try {
      window.sessionStorage.clear()
    } catch (error) {
      console.error('Failed to clear session storage:', error)
    }
  },
}
