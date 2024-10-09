<template>

  <div class="space-y-4">

    <Input v-if="enableSearch" v-model="searchTerm" placeholder="Search Recipes..." :icon="Search"/>

    <Select
        id="sortKey"
        label="Sort by:"
        v-model="sortKey"
        :options="sortKeyOptions"
    />

    <Select
        id="sortOrder"
        label="Order:"
        v-model="sortOrder"
        :options="sortOrderOptions"
    />

    <Select
        id="style"
        label="Toggle between grid and table:"
        v-model="style"
        :options="styleOptions"
    />
  </div>


  <div class="grid grid-cols-1 gap-y-6 md:grid-cols-4 md:gap-10 mt-10" v-if="style==='grid'">
    <RecipeCard v-for="recipe in sortedAndFilteredData" :recipe="recipe" :key="recipe.id"/>
  </div>

  <div class="mt-12" v-if="style==='table'">
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full">
          <div class="overflow-hidden border rounded-lg">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
              <tr>
                <th class="px-5 py-3"><input type="checkbox"
                                             @change="selectAllRows"
                                             :checked="allRowsSelected"/></th>

                <th class="px-5 py-3 text-xs font-medium uppercase text-left" colspan="2">Recipe</th>
                <th class="px-5 py-3 text-xs font-medium uppercase text-left">Preparation Time</th>
                <th class="px-5 py-3 text-xs font-medium uppercase text-left">Servings</th>
                <th class="px-5 py-3 text-xs font-medium uppercase text-left">Calories</th>
                <th class="px-5 py-3 text-xs font-medium uppercase text-center">Actions</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200">
              <tr v-if="sortedAndFilteredData.length === 0">
                <td class="px-5 py-12 text-4xl font-medium text-center text-gray-500" colspan="7"> No results :(</td>
              </tr>
              <tr v-if="sortedAndFilteredData.length > 0" :class="[{'bg-blue-200' : selectedRows.includes(item.id)}]"
                  v-for="(item, index) in sortedAndFilteredData"
                  :key="index">
                <td class="px-5 py-4 text-center"><input type="checkbox" v-model="selectedRows" :value="item.id"/></td>
                <td class="py-4"> <img :alt="item.name" :src="item.image" class="w-24 rounded-md h-auto" loading="lazy"/></td>
                <td class="px-5 py-4 text-sm font-medium whitespace-nowrap">{{ item.name }}</td>
                <td class="px-5 py-4 text-sm whitespace-nowrap">{{ item.prepTimeMinutes }}</td>
                <td class="px-5 py-4 text-sm whitespace-nowrap">{{ item.servings }}</td>
                <td class="px-5 py-4 text-sm whitespace-nowrap">{{ item.caloriesPerServing }}</td>
                <td class="px-5 py-4 text-sm font-medium flex gap-4 whitespace-nowrap">
                  <Button button-variant="danger" :icon="Trash2"/>
                  <Button button-variant="primary" :icon="Pencil"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import RecipeCard from './RecipeCard.vue';
import Button from './Button.vue';
import {Trash2, Pencil, Search} from 'lucide-vue-next';
import {Recipe} from '../types/recipe.ts';
import Input from "./Input.vue";
import Select from "./Select.vue";

const props = defineProps<{
  data: Recipe[];
  enableSearch?: boolean;
}>();

const selectedRows = ref<number[]>([]);
const sortKey = ref('name');
const sortOrder = ref<'asc' | 'desc'>('asc');
const searchTerm = ref('');
const style = ref<'grid' | 'table'>('table');

const allRowsSelected = computed(() => {
  return props.data.length > 0 && selectedRows.value.length === props.data.length;
});

const selectAllRows = () => {
  if (allRowsSelected.value) {
    selectedRows.value = [];
  } else {
    selectedRows.value = props.data.map(item => item.id);
  }
};

const filteredData = computed(() => {
  if (!searchTerm.value) {
    return props.data;
  }
  return props.data.filter((item: Recipe) =>
      item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const sortedAndFilteredData = computed(() => {
  return [...filteredData.value].sort((a, b) => {
    let result = 0;

    switch (sortKey.value) {
      case 'name':
        result = a.name.localeCompare(b.name);
        break;
      case 'prepTimeMinutes':
        result = a.prepTimeMinutes - b.prepTimeMinutes;
        break;
      case 'caloriesPerServing':
        result = a.caloriesPerServing - b.caloriesPerServing;
        break;
      default:
        break;
    }

    if (sortOrder.value === 'desc') {
      result *= -1;
    }

    return result;
  });
});


const sortKeyOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Preparation Time', value: 'prepTimeMinutes' },
  { label: 'Calories per Serving', value: 'caloriesPerServing' },
  { label: 'Servings', value: 'servings' },
];

const sortOrderOptions = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

const styleOptions = [
  { label: 'Grid', value: 'grid' },
  { label: 'Table', value: 'table' },
];
</script>