import type { FormData, SubmittedFormData } from '@/types/form'

const STORAGE_KEY = 'submitted_forms'

const loadData = (): SubmittedFormData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading data:', error)
    return []
  }
}

const saveData = (data: SubmittedFormData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving data:', error)
    throw new Error('Failed to save data')
  }
}

const convertFileToObject = (file: File) => ({
  name: file.name,
  type: file.type,
  size: file.size,
})

export const submitForm = async (formData: FormData): Promise<SubmittedFormData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const submittedData: SubmittedFormData = {
          id: Date.now().toString(),
          groupFields: formData.groupFields,
          birthDate: formData.birthDate,
          gender: formData.gender,
          languages: formData.languages,
          cities: formData.cities,
          files: formData.files.map(convertFileToObject),
          submittedAt: new Date().toISOString(),
        }

        const existingData = loadData()
        existingData.push(submittedData)
        saveData(existingData)

        resolve(submittedData)
      } catch (error) {
        reject(new Error('Failed to submit form. Please try again.'))
      }
    }, 500)
  })
}

export const getSubmittedForms = async (): Promise<SubmittedFormData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = loadData()
      resolve(data)
    }, 100)
  })
}
