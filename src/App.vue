<template>
  <div class="space-y-8 my-12">
    <div>
      <h1 class="text-8xl font-extrabold mb-4">Vue Components Kitchen Sink</h1>
      <h2 class="text-5xl font-bold mb-4">Buttons</h2>
      <div class="grid grid-cols-3 gap-4">
        <h3 class="text-3xl font-extralight col-span-3">Variants</h3>
        <div>
          <h4>Default (using onClick)</h4>
          <Button button-variant="default" label="Default" :onClick="handleButtonClick"/>
        </div>
        <div>
          <h4>Primary (using href)</h4>
          <Button button-variant="primary" label="Primary" href="https://github.com/"/>
        </div>
        <div>
          <h4>Secondary</h4>
          <Button button-variant="secondary" label="Secondary"/>
        </div>
        <div>
          <h4>Success</h4>
          <Button button-variant="success" label="Success"/>
        </div>
        <div>
          <h4>Danger</h4>
          <Button button-variant="danger" label="Danger"/>
        </div>
        <div>
          <h4>Disabled</h4>
          <Button button-variant="disabled" label="Disabled"/>
        </div>
        <h3 class="text-3xl font-extralight col-span-3">Icon Variants</h3>
        <div>
          <h4>With Icon Before</h4>
          <Button label="Disabled" :icon="SendIcon" icon-position="before"/>
        </div>
        <div>
          <h4>With Icon After</h4>
          <Button label="Disabled" :icon="SendIcon" icon-position="after" button-variant="primary"/>
        </div>
        <div>
          <h4>Without label</h4>
          <Button :icon="X" button-variant="danger"/>
        </div>
        <h3 class="text-3xl font-extralight col-span-3">Custom styling</h3>
        <div>
          <Button label="Pink" additional-classes="bg-pink-600 rounded-3xl"/>
        </div>
        <div class="col-span-2">
          <Button label="Outline" additional-classes="border-slate-500 border-2 bg-transparent text-gray-900"/>
        </div>

      </div>

    </div>
    <div class="space-y-4">
      <h2 class="text-5xl font-bold mb-4">Input</h2>
      <h3 class="text-3xl font-extralight mb-4">Variants</h3>
      <Input placeholder="Input with placeholder"/>
      <h4 class="text-xl font-extralight mb-4">With Prefix</h4>
      <Input v-model.lazy="phone" label="Phone" prefix="+47"/>
      <p>Eagerly updated phone number: {{ phone }}</p>


      <h4 class="text-xl font-extralight mb-4">With Icon</h4>
      <Input v-model="email" label="Email" :icon="SendIcon" placeholder="ola@nordmann.no"/>


      <h4 class="text-xl font-extralight mb-4">With integrated button passed as prop</h4>
      <Input v-model="custom" :button="Button" :button-props="{
        label: 'Button',
        additionalClasses: 'w-max rounded-r-md rounded-l-none',
        buttonVariant: 'primary',
        onClick: handleButtonClick
      }"/>

    </div>


    <div>
      <h2 class="text-5xl font-bold mb-4">DataView</h2>
      <DataView :data="recipes" :enable-search="true" :is-grid="false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import DataView from "./components/DataView.vue";
import Button from "./components/Button.vue";
import Input from "./components/Input.vue";
import {SendIcon} from "lucide-vue-next";
import {X} from "lucide-vue-next";
import {Recipe} from "./types/recipe.ts";

defineProps<{
  recipes: Recipe[]
}>();


const phone = ref('');
const email = ref('');
const custom = ref('')

// Just a demo function to show @onClick
const handleButtonClick = () => {
  alert('Clicked!');
};


</script>