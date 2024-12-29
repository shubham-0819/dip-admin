export interface SubAdmin {
  id: string
  name: string
  role: 'subadmin'
  // Add any other fields that your sub-admin object includes
} 

export interface Test {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  status: boolean
  createdAt: string
  updatedAt: string
} 