export interface Profile {
  name: string
  title: string
  subtitle: string
  description: string
  avatar: string
  tags: string[]
  contact: {
    phone: string
    email: string
    github: string
    linkedin?: string
  }
  jobExpectations: {
    positions: string[]
    cities: string[]
    salary: string
  }
}
