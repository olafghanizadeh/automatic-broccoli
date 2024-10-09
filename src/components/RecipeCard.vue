

<template>
  <div class="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-[380px]">
    <img :alt="recipe.name" :src="recipe.image" class="w-full h-auto" loading="lazy"/>
    <div class="p-4">

      <h2 class="mb-2 text-lg font-bold leading-none tracking-tight">{{ recipe.name }}</h2>
      <dl class="grid grid-cols-2 gap-y-2 my-8">
        <dt>Prep Time</dt>
        <dd>{{recipe.prepTimeMinutes}}</dd>
        <dt>Calories per serving</dt>
        <dd>{{recipe.caloriesPerServing}}</dd>
        <dt>Servings</dt>
        <dd>{{recipe.servings}}</dd>
      </dl>
      <div class="flex gap-2">
        <Button button-variant="danger" :icon="Trash2"/>
        <Button button-variant="primary" :icon="Pencil"/>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Recipe} from "../types/recipe.ts";
import Button from "./Button.vue";
import {Pencil, Trash2} from "lucide-vue-next";

export default defineComponent({
  name: 'RecipeCard',
  methods: {Pencil, Trash2},
  components: {Button},
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: true
    }
  },
  setup(props) {

    return {
      recipe: props.recipe,
    };
  }
});
</script>