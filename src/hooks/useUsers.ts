import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/users'

export const useUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => fetchUsers(page, limit)
  })
}
