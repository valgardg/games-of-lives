<template>
    <div class="container d-flex flex-column justify-content-center">
        <div class="mt-5 text-center">
            <p class="fs-1">Home View!</p>
            <div class="mt-5">
                <button class="btn btn-dark" @click="() => router.push('/game-of-life')">Conways game of life</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '../router';
</script>