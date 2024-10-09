import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import {Recipe} from "./types/recipe.ts";

async function initApp(): Promise<void> {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data: { recipes: Recipe[] } = await response.json();
        const {recipes} = data;


        const app = createApp(App, { recipes });
        app.mount('#app');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

initApp();