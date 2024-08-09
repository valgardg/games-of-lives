import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameOfLifeView from '../views/GameOfLifeView.vue';

const router = createRouter({
    history: createWebHistory(''),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/game-of-life',
            name: 'game-of-life',
            component: GameOfLifeView
        }
    ]
});

export default router;