<script setup lang="ts">
import {computed, PropType} from "vue";

const [model] = defineModel({})

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  name: {
    type: String,
  },
  placeholder: {
    type: String,
    required: false
  },
  icon: {
    required: false
  },
  prefix: {
    type: String,
  },
  includePrefix: {
    type: Boolean,
  },
  iconPosition: {
    type: String as PropType<'before' | 'after'>,
    required: false,
    default: 'before'
  },
  additionalClasses: {
    type: String,
    required: false,
  },
  button: {
    type: Object,
  },
  buttonProps: {
    type: Object
  }
});

const baseInputStyles: string =
    'relative flex w-full h-10 text-sm bg-white border rounded-md border-neutral-300 ' +
    'ring-offset-background placeholder:text-neutral-500 focus-within:outline-none focus-within:ring-2 ' +
    'focus-within:ring-offset-2 focus-within:ring-neutral-400';

const computedClasses = computed(() => {
  return `${baseInputStyles}  ${props.additionalClasses || ''}`;
});

</script>

<template>


  <div class="space-y-4">
    <label v-if="label" :for="name" class="font-bold">{{ label }}</label>
    <div :class="computedClasses">
      <div v-if="prefix" class="bg-gray-200 p-4 text-gray-600 font-semibold flex items-center">
        <span>
        {{ prefix }}
        </span>
      </div>

      <span class="absolute inset-y-0 left-0 flex items-center pl-2" v-if="icon && iconPosition === 'before'">
            <component :is="icon"/>
      </span>
      <input v-model="model" :name="name" :placeholder="placeholder"
             :class="[
                 {'pl-10': icon && iconPosition === 'before', 'pl-2': !icon},
                'py-2 rounded-md focus:outline-none focus:text-gray-900 w-full'
             ]">
      <component :is="button" v-bind="buttonProps"/>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2" v-if="icon && iconPosition === 'after'">
            <component :is="icon"/>
      </span>
    </div>
  </div>
</template>