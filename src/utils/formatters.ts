import moment from 'moment'

// Format Phone Number
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '')

  if (numbers.length === 0) return ''
  if (numbers.length <= 3) return `(${numbers}`
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`

  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
}

// Format Date
export const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  return moment(dateString).format('MMMM DD, YYYY')
}

