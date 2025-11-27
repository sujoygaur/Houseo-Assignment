<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="mb-4 text-center">Form Assignment</h1>

        <div class="form-container">
          <Form :initial-values="initialValues" :validation-schema="formSchema" @submit="handleSubmit" ref="formRef"
            v-slot="{ meta: formMeta }">
            <h3 class="mb-4">Group Fields</h3>
            <FieldArray name="groupFields" v-slot="{ fields, push, remove }">
              <GroupFieldForm v-for="(field, index) in fields" :key="String(field.key)" :id="String(field.key)"
                :index="index" :can-remove="fields.length > 2" @remove="remove(index)" />

              <button type="button" class="btn btn-outline-primary btn-add-more" @click="addGroupField(push)">
                + Add More
              </button>
              <ErrorMessage name="groupFields" class="error-message d-block mt-2" />
            </FieldArray>

            <hr class="my-4" />

            <div class="form-group">
              <Field name="birthDate" v-slot="{ field, meta, handleBlur, handleChange }">
                <label for="birthDate" class="form-label">Birth Date</label>
                <input id="birthDate" :value="field.value || ''" type="date" class="form-control"
                  :class="{ 'is-invalid': (meta.touched || meta.validated) && !meta.valid }"
                  @input="(e) => handleChange((e.target as HTMLInputElement).value)" @blur="handleBlur" />
                <ErrorMessage name="birthDate" class="error-message" />
                <small v-if="field.value" class="text-muted d-block mt-1">
                  Formatted: {{ formatDate(field.value) }}
                </small>
              </Field>
            </div>

            <div class="form-group">
              <Field name="gender" v-slot="{ field }">
                <label class="form-label">Gender</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input id="gender-male" v-bind="field" type="radio" value="Male" class="form-check-input" />
                    <label class="form-check-label" for="gender-male">
                      Male
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input id="gender-female" v-bind="field" type="radio" value="Female" class="form-check-input" />
                    <label class="form-check-label" for="gender-female">
                      Female
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input id="gender-other" v-bind="field" type="radio" value="Other" class="form-check-input" />
                    <label class="form-check-label" for="gender-other">
                      Other
                    </label>
                  </div>
                </div>
                <ErrorMessage name="gender" class="error-message" />
              </Field>
            </div>

            <div class="form-group">
              <Field name="languages" v-slot="{ field, errors }">
                <label class="form-label">Languages</label>
                <div>
                  <div class="form-check">
                    <input id="lang-angular" type="checkbox" value="Angular" class="form-check-input"
                      :checked="field.value?.includes('Angular')"
                      @change="handleLanguageChange($event, field.value, field.onChange)" />
                    <label class="form-check-label" for="lang-angular">
                      Angular
                    </label>
                  </div>
                  <div class="form-check">
                    <input id="lang-vuejs" type="checkbox" value="Vuejs" class="form-check-input"
                      :checked="field.value?.includes('Vuejs')"
                      @change="handleLanguageChange($event, field.value, field.onChange)" />
                    <label class="form-check-label" for="lang-vuejs">
                      Vuejs
                    </label>
                  </div>
                  <div class="form-check">
                    <input id="lang-reactjs" type="checkbox" value="ReactJs" class="form-check-input"
                      :checked="field.value?.includes('ReactJs')"
                      @change="handleLanguageChange($event, field.value, field.onChange)" />
                    <label class="form-check-label" for="lang-reactjs">
                      ReactJs
                    </label>
                  </div>
                </div>

                <ErrorMessage name="languages" class="error-message" />
              </Field>
            </div>

            <div class="form-group">
              <Field name="cities" v-slot="{ field }">
                <label for="cities" class="form-label">City</label>
                <Multiselect id="cities" :model-value="field.value" :options="cityOptions" mode="tags"
                  :close-on-select="false" placeholder="Select cities" @update:model-value="field.onChange" />
                <ErrorMessage name="cities" class="error-message" />
              </Field>
            </div>

            <div class="form-group">
              <label class="form-label">File Upload</label>
              <FileUpload />
            </div>

            <div v-if="submitError" class="alert alert-danger" role="alert">
              {{ submitError }}
            </div>

            <div class="d-grid gap-2 mt-4">
              <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ isSubmitting ? 'Submitting...' : 'Submit Form' }}
              </button>
            </div>
          </Form>
        </div>

        <SubmittedDataTable :submitted-data="submittedData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Form, Field, FieldArray, ErrorMessage } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import GroupFieldForm from '@/components/GroupFieldForm.vue'
import FileUpload from '@/components/FileUpload.vue'
import SubmittedDataTable from '@/components/SubmittedDataTable.vue'
import { formSchema } from '@/utils/validation'
import { formatDate } from '@/utils/formatters'
import { submitForm, getSubmittedForms } from '@/services/api'
import { cities } from '@/data/cities'
import type { FormData, SubmittedFormData, GroupField } from '@/types/form'

const cityOptions = cities.map(city => ({
  value: city.value,
  label: city.label,
}))

const submittedData = ref<SubmittedFormData[]>([])
const isSubmitting = ref(false)
const submitError = ref('')
const formRef = ref<InstanceType<typeof Form> | null>(null)

const initialValues = {
  groupFields: [
    {
      id: '1',
      name: '',
      email: '',
      mobileNumber: '',
    },
    {
      id: '2',
      name: '',
      email: '',
      mobileNumber: '',
    },
  ],
  birthDate: '',
  gender: '',
  languages: [],
  cities: [],
  files: [],
}

const addGroupField = (push: (value: GroupField) => void) => {
  push({
    id: Date.now().toString(),
    name: '',
    email: '',
    mobileNumber: '',
  })
}

const handleLanguageChange = (
  event: Event,
  currentValue: string[],
  onChange: (value: string[]) => void
) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const checked = target.checked

  let newValue = currentValue || []
  if (checked) {
    if (!newValue.includes(value)) {
      newValue = [...newValue, value]
    }
  } else {
    newValue = newValue.filter((lang) => lang !== value)
  }
  onChange(newValue)
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetForm({
      values: {
        ...initialValues,
        groupFields: [
          { id: '1', name: '', email: '', mobileNumber: '' },
          { id: '2', name: '', email: '', mobileNumber: '' },
        ],
      },
    })
  }
}

const handleSubmit = async (values: any) => {
  isSubmitting.value = true
  submitError.value = ''

  try {
    const formData: FormData = {
      groupFields: values.groupFields,
      birthDate: values.birthDate,
      gender: values.gender,
      languages: values.languages || [],
      cities: values.cities || [],
      files: values.files || [],
    }

    await submitForm(formData)
    await loadSubmittedData()

    resetForm()
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const loadSubmittedData = async () => {
  try {
    submittedData.value = await getSubmittedForms()
  } catch (error) {
    console.error('Error loading submitted data:', error)
  }
}

onMounted(() => {
  loadSubmittedData()
})
</script>

<style>
@import '@vueform/multiselect/themes/default.css';

.multiselect {
  min-height: 38px;
}

.multiselect.is-invalid {
  border-color: #dc3545;
}
</style>
