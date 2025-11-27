<template>
  <div class="group-field-container">
    <button v-if="canRemove" type="button" class="btn btn-sm btn-danger btn-remove" @click="$emit('remove')">
      Remove
    </button>

    <div class="row">
      <div class="col-md-4">
        <Field :name="`groupFields.${index}.name`" :rules="validateRequired" v-slot="{ field, errors }">
          <label :for="`name-${id}`" class="form-label">Name</label>
          <input :id="`name-${id}`" v-bind="field" type="text" class="form-control"
            :class="{ 'is-invalid': errors.length > 0 }" placeholder="Enter name" />
          <span v-if="errors.length > 0" class="error-message">
            {{ errors[0] }}
          </span>
        </Field>
      </div>

      <div class="col-md-4">
        <Field :name="`groupFields.${index}.email`" :rules="validateEmail" v-slot="{ field, errors }">
          <label :for="`email-${id}`" class="form-label">Email</label>
          <input :id="`email-${id}`" v-bind="field" type="email" class="form-control"
            :class="{ 'is-invalid': errors.length > 0 }" placeholder="Enter email" />
          <span v-if="errors.length > 0" class="error-message">
            {{ errors[0] }}
          </span>
        </Field>
      </div>

      <div class="col-md-4">
        <Field :name="`groupFields.${index}.mobileNumber`" :rules="validatePhone" v-slot="{ field, errors }">
          <label :for="`mobile-${id}`" class="form-label">Mobile Number</label>
          <input :id="`mobile-${id}`" v-bind="field" type="text" class="form-control"
            :class="{ 'is-invalid': errors.length > 0 }" placeholder="(844) 448-0110"
            @input="handlePhoneInput($event, field.onInput)" />
          <span v-if="errors.length > 0" class="error-message">
            {{ errors[0] }}
          </span>
        </Field>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'
import { validateRequired, validateEmail, validatePhone } from '@/utils/validation'
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

const handlePhoneInput = (event: Event, onInput: (value: string) => void) => {
  const target = event.target as HTMLInputElement
  const formatted = formatPhoneNumber(target.value)
  onInput(formatted)
}
</script>

<style scoped>
.group-field-container {
  position: relative;
}
</style>
