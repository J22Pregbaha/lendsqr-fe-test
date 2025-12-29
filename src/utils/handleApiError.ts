/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

let lastError: string | null = null
let lastShownAt = 0

export const handleApiError = (err: AxiosError) => {
  const now = Date.now()
  const errorMessage =
    err.message === 'You\'re offline.'
      ? 'You\'re offline. Please connect to the internet and try again.'
      : getErrorMessage(err)

  // prevent showing the same toast again within 2s
  if (lastError === errorMessage && now - lastShownAt < 2000) {
    return
  }

  lastError = errorMessage
  lastShownAt = now

  if (err.message === 'You\'re offline.') {
    toast.error(errorMessage)
    return
  }

  if (err?.response?.status?.toString().startsWith('4')) {
    toast.warning(errorMessage)
  } else {
    toast.error(errorMessage)
  }
}

const getErrorMessage = (err: AxiosError) => {
  const error = err?.response?.data as any

  const formatedError = 'Something happened when trying to connect to the server'

  if (error?.details) {
    const errorArray = error.details?.replace(/,/g, '\r\n')
    return errorArray
  }

  if (error.message) {
    if (typeof error.message === 'object') {
      for (const [key, value] of Object.entries(error.message || {})) {
        return `${key}: ${value}`
      }
    } else {
      return error.message || error
    }
  }

  if (err?.response?.status === 500) {
    return 'Internal Server Error'
  }

  return formatedError
}
