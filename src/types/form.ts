export interface GroupField {
  id: string
  name: string
  email: string
  mobileNumber: string
}

export interface FormData {
  groupFields: GroupField[]
  birthDate: string
  gender: string
  languages: string[]
  cities: string[]
  files: File[]
}

export interface SubmittedFormData extends Omit<FormData, 'files'> {
  id: string
  submittedAt: string
  files: {
    name: string
    type: string
    size: number
  }[]
}
