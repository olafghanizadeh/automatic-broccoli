<template>
  <component
      :is="href ? 'a' : 'button'"
      :class="computedClasses"
      :href="href"
      @click="handleClick"
  >
    <component :is="icon" v-if="icon && iconPosition === 'before'"/>
    <span v-if="label"> {{ label }} </span>
    <component :is="icon" v-if="icon && iconPosition === 'after'"/>
  </component>
</template>

<script setup lang="ts">
import {computed, PropType} from 'vue';

const variantClassMap: Record<string, string> = {
  default: 'bg-black',
  primary: 'bg-blue-500 hover:bg-blue-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
  success: 'bg-green-500 hover:bg-green-600',
  danger: 'bg-red-500 hover:bg-red-600',
  disabled: 'bg-gray-500 text-gray-900 cursor-not-allowed',
};

const props = defineProps({
  href: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false
  },
  icon: {
    required: false
  },
  iconPosition: {
    type: String as PropType<'before' | 'after'>,
    required: false,
    default: 'after'
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: false,
  },
  buttonVariant: {
    type: String as PropType< 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'disabled'>,
    default: 'default',
  },
  additionalClasses: {
    type: String,
    required: false,
  },
});

const baseButtonStyles: string =
    'inline-flex gap-3 items-center justify-center w-full h-10 px-4 py-2 ' +
    'text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ' +
    'cursor-pointer';

const computedClasses = computed(() => {
  return `${baseButtonStyles} ${variantClassMap[props.buttonVariant]} ${props.additionalClasses || ''}`;
});

const handleClick = (event: MouseEvent) => {
  if (props.onClick) {
    props.onClick(event);
  }
};
</script>