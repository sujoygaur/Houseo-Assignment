import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

export const groupFieldSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .test('phone-format', 'Please enter a valid 10-digit mobile number', (value) => {
      if (!value) return false
      const numbers = value.replace(/\D/g, '')
      return numbers.length === 10
    }),
})

const yupFormSchema = yup.object().shape({
  groupFields: yup
    .array()
    .of(groupFieldSchema)
    .min(2, 'At least 2 group fields are required')
    .required('Group fields are required'),
  birthDate: yup.string().required('Birth date is required'),
  gender: yup.string().required('Gender is required'),
  languages: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one language must be selected')
    .required('Languages are required'),
  cities: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one city must be selected')
    .required('Cities are required'),
  files: yup
    .array()
    .of(yup.mixed<File>())
    .test('file-type', 'Only JPEG and PDF files are allowed', (files) => {
      if (!files || files.length === 0) return true
      const allowedTypes = ['image/jpeg', 'application/pdf']
      return files.every((file) => file && allowedTypes.includes(file.type))
    })
    .optional(),
})

export const formSchema = toTypedSchema(yupFormSchema)
