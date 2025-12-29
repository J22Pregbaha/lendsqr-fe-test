import axios from 'axios'

export const apiId =
  import.meta.env.VITE_MOCK_API_ID || '123'

export const fetchUsers = async (page: number, limit: number) => {
  const res = await axios.get(
    `https://${apiId}.mockapi.io/api/v1/users`,
    {
      params: {
        page,
        limit
      }
    }
  )

  return res.data
}
