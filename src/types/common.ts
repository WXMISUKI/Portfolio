export interface SocialLink {
  name: string
  icon: string
  url: string
}

export interface NavLink {
  path: string
  name: string
}

export interface NavigationItem {
  id: string
  label: string
  path: string
  icon?: string
}

export interface Category {
  id: string
  name: string
  count?: number
}

export interface Metric {
  label: string
  value: number | string
  suffix?: string
  prefix?: string
}
