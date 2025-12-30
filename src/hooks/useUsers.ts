import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { fetchUsers } from '../api/users'
import type { User } from '../types/types'
import type { AxiosError } from 'axios'

export const useUsers = (page: number, limit: number, options?: UseQueryOptions<User[], AxiosError>) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => fetchUsers(page, limit),
    ...options,
  })
}
