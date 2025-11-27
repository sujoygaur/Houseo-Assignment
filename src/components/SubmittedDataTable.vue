<template>
  <div class="table-container">
    <h3 class="mb-4">Submitted Forms</h3>
    <div v-if="submittedData.length === 0" class="text-center text-muted py-5">
      No submitted forms yet.
    </div>
    <div v-else class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="text-nowrap">ID</th>
            <th class="text-nowrap">Group Fields</th>
            <th class="text-nowrap">Birth Date</th>
            <th class="text-nowrap">Gender</th>
            <th class="text-nowrap">Languages</th>
            <th class="text-nowrap">Cities</th>
            <th class="text-nowrap">Files</th>
            <th class="text-nowrap">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in submittedData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <div v-for="(field, index) in item.groupFields" :key="index" class="mb-2">
                <strong>{{ field.name }}</strong><br />
                <small class="text-muted">{{ field.email }}</small><br />
                <small class="text-muted">{{ field.mobileNumber }}</small>
              </div>
            </td>
            <td>{{ formatDate(item.birthDate) }}</td>
            <td>{{ item.gender }}</td>
            <td>
              <span v-for="(lang, index) in item.languages" :key="index" class="badge bg-primary me-1">
                {{ lang }}
              </span>
            </td>
            <td>
              <span v-for="(city, index) in item.cities" :key="index" class="badge bg-secondary me-1">
                {{ getCityLabel(city) }}
              </span>
            </td>
            <td>
              <div v-for="(file, index) in item.files" :key="index">
                <small>{{ file.name }}</small>
              </div>
            </td>
            <td>{{ formatDate(item.submittedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/formatters'
import { cities } from '@/data/cities'
import type { SubmittedFormData } from '@/types/form'

interface Props {
  submittedData: SubmittedFormData[]
}

defineProps<Props>()

const getCityLabel = (cityValue: string): string => {
  const city = cities.find(c => c.value === cityValue)
  return city ? city.label : cityValue
}
</script>
