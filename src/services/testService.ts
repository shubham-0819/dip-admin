import axios from "axios";
import { API_URL } from "../config";

export const testService = {
  // Get all tests
  getAll: async () => {
    const response = await axios.get(`${API_URL}/admin/test/get`)
    return response.data
  },

  // Get single test by ID
  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/admin/test/get/${id}`)
    return response.data
  },

  // Create new test
  create: async (data: {
    name: string
    description: string
    price: number
    category: string
    image?: File
  }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price.toString())
    formData.append('category', data.category)
    if (data.image) {
      formData.append('image', data.image)
    }

    const response = await axios.post(`${API_URL}/admin/test/create`, formData)
    return response.data
  },

  // Update test
  update: async (id: string, data: {
    name?: string
    description?: string
    price?: number
    category?: string
    image?: File
  }) => {
    const formData = new FormData()
    if (data.name) formData.append('name', data.name)
    if (data.description) formData.append('description', data.description)
    if (data.price) formData.append('price', data.price.toString())
    if (data.category) formData.append('category', data.category)
    if (data.image) formData.append('image', data.image)

    const response = await axios.put(`${API_URL}/admin/test/update/${id}`, formData)
    return response.data
  },

  // Delete test
  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/admin/test/delete/${id}`)
    return response.data
  },

  // Get tests by category
  getByCategory: async (category: string) => {
    const response = await axios.get(`${API_URL}/admin/test/category/${category}`)
    return response.data
  },

  // Update test status (active/inactive)
  updateStatus: async (id: string, status: boolean) => {
    const response = await axios.put(`${API_URL}/admin/test/status/${id}`, { status })
    return response.data
  }
}

export default testService;
