const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (value: unknown): boolean | string => {
  if (typeof value !== 'string' || !value) return 'Email is required'
  if (!emailRegex.test(value)) return 'Please enter a valid email address'
  return true
}

export const validateRequired = (value: unknown): boolean | string => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return 'This field is required'
  }
  return true
}

export const validatePhone = (value: unknown): boolean | string => {
  if (typeof value !== 'string' || !value) return 'Mobile number is required'
  const numbers = value.replace(/\D/g, '')
  if (numbers.length !== 10) {
    return 'Please enter a valid 10-digit mobile number'
  }
  return true
}

export const validateMinGroups = (value: unknown): boolean | string => {
  if (!Array.isArray(value) || value.length < 2) {
    return 'At least 2 group fields are required'
  }
  return true
}

export const validateFileType = (value: unknown): boolean | string => {
  if (!value || !Array.isArray(value) || value.length === 0) return true

  const files = value as File[]
  const allowedTypes = ['image/jpeg', 'application/pdf']
  const invalidFiles = files.filter((file) => !allowedTypes.includes(file.type))

  if (invalidFiles.length > 0) {
    return 'Only JPEG and PDF files are allowed'
  }
  return true
}

