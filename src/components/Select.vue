<template>
  <div class="block">
    <label :for="id" class="block">
      <span>{{ label }}</span>
      <select
          :id="id"
          v-model="model"
          class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
const [model] = defineModel({})


interface Option {
  label: string;
  value: string;
}

defineProps<{
  id: string;
  label: string;
  options: Option[];
}>();

</script>