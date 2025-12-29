export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  status: 'Active' | 'Inactive' | 'Pending'
  organization: string
}
