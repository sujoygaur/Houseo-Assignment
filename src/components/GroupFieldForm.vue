<template>
  <div class="group-field-container">
    <button v-if="canRemove" type="button" class="btn btn-sm btn-danger btn-remove" @click="$emit('remove')">
      Remove
    </button>

    <div class="row">
      <!-- //Name Starts Here -->
      <div class="col-md-4">
        <Field :name="`groupFields.${index}.name`" v-slot="{ field, meta, handleBlur, handleChange, errors }">
          <label :for="`name-${id}`" class="form-label">Name</label>
          <input :id="`name-${id}`" :value="field.value || ''" type="text" class="form-control"
            :class="{ 'is-invalid': (meta.touched || meta.validated) && !meta.valid }" placeholder="Enter name"
            @input="(e) => handleChange((e.target as HTMLInputElement).value)" @blur="handleBlur" />
          <span v-if="errors && errors.length > 0" class="error-message">
            {{ errors[0] }}
          </span>
          <ErrorMessage :name="`groupFields.${index}.name`" class="error-message" />
        </Field>
      </div>
      <!-- //Name Ends Here -->
      <!-- //Email Starts Here -->
      <div class="col-md-4">
        <Field :name="`groupFields.${index}.email`" v-slot="{ field, meta, handleBlur, handleChange, errors }">
          <label :for="`email-${id}`" class="form-label">Email</label>
          <input :id="`email-${id}`" :value="field.value || ''" type="email" class="form-control"
            :class="{ 'is-invalid': (meta.touched || meta.validated) && !meta.valid }" placeholder="Enter email"
            @input="(e) => handleChange((e.target as HTMLInputElement).value)" @blur="handleBlur" />
          <span v-if="errors && errors.length > 0" class="error-message">
            {{ errors[0] }}
          </span>
          <ErrorMessage :name="`groupFields.${index}.email`" class="error-message" />
        </Field>
      </div>
      <!-- //Email Ends Here -->
      <!-- //Mobile Number Starts Here -->  
      <div class="col-md-4">
        <Field :name="`groupFields.${index}.mobileNumber`" v-slot="{ field, meta, handleBlur, handleChange, errors }">
          <label :for="`mobile-${id}`" class="form-label">Mobile Number</label>
          <input :id="`mobile-${id}`" :value="field.value || ''" type="text" class="form-control"
            :class="{ 'is-invalid': (meta.touched || meta.validated) && !meta.valid }" placeholder="(844) 448-0110"
            @input="(e) => handlePhoneInput(e, handleChange)" @blur="handleBlur" />
          <span v-if="errors && errors.length > 0" class="error-message">
            {{ errors[0] }}
          </span>
          <ErrorMessage :name="`groupFields.${index}.mobileNumber`" class="error-message" />
        </Field>
      </div>
      <!-- //Mobile Number Ends Here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { formatPhoneNumber } from '@/utils/formatters'

interface Props {
  id: string
  index: number
  canRemove: boolean
}

defineProps<Props>()

defineEmits<{
  remove: []
}>()

// Handle Phone Input formatting
const handlePhoneInput = (event: Event, handleChange: (value: string) => void) => {
  const target = event.target as HTMLInputElement
  const formatted = formatPhoneNumber(target.value)
  handleChange(formatted)
}
</script>

<style scoped>
.group-field-container {
  position: relative;
}
</style>
