<template>
  <div>
    <!-- //File Upload Area Starts Here -->
    <Field name="files" v-slot="{ field }">
      <div class="file-upload-area" :class="{ 'dragover': isDragging }" @drop="handleDrop($event, field.onChange)"
        @dragover.prevent="isDragging = true" @dragleave="isDragging = false" @click="triggerFileInput">
        <input ref="fileInput" type="file" multiple accept=".jpeg,.jpg,.pdf" class="d-none"
          @change="handleFileChange($event, field.onChange)" />
        <p class="mb-0">
          <strong>Click to upload</strong> or drag and drop
        </p>
        <p class="text-muted small mb-0">JPEG and PDF files only</p>
      </div>

      <div v-if="files.length > 0" class="file-list">
        <div v-for="(file, index) in files" :key="index" class="file-item">
          <span class="file-name">{{ file.name }}</span>
          <button type="button" class="btn btn-sm btn-danger" @click="removeFile(index, field.onChange)">
            Remove
          </button>
        </div>
      </div>

      <ErrorMessage name="files" class="error-message" />
    </Field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const fileInput = ref<HTMLInputElement | null>(null)
const files = ref<File[]>([])
const isDragging = ref(false)

const triggerFileInput = () => {
  fileInput.value?.click()
}

// Handle File Change
const handleFileChange = (event: Event, onChange: (value: File[]) => void) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const newFiles = Array.from(target.files)
    const updatedFiles = [...files.value, ...newFiles]
    files.value = updatedFiles
    onChange(updatedFiles)
  }
}

// Handle Drop
const handleDrop = (event: DragEvent, onChange: (value: File[]) => void) => {
  event.preventDefault()
  isDragging.value = false

  if (event.dataTransfer?.files) {
    const newFiles = Array.from(event.dataTransfer.files)
    const updatedFiles = [...files.value, ...newFiles]
    files.value = updatedFiles
    onChange(updatedFiles)
  }
}

// Remove File
const removeFile = (index: number, onChange: (value: File[]) => void) => {
  files.value.splice(index, 1)
  onChange([...files.value])
}
</script>
