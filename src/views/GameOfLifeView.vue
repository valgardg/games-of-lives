<template>
  <div class="game-container">
    <h1>Conway's Game of Life</h1>
    <div class="grid">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        :class="['cell', cell.alive ? 'alive' : '']"
        @click="toggleCell(index)"
        @mouseover="toggleCell(index)"
      ></div>
    </div>
    <div class="controls">
      <button @click="startGame">Start</button>
      <button @click="stopGame">Stop</button>
      <button @click="resetGame">Reset</button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const rows = 20;
const cols = 20;
const cells = ref<{ alive: boolean }[]>([]);
const intervalId = ref<number | null>(null);

const resetGame = () => {
  cells.value = Array(rows * cols)
    .fill(0)
    .map(() => ({ alive: false }));
  stopGame();
};

const startGame = () => {
  if (intervalId.value) return;
  intervalId.value = setInterval(() => {
    const newCells = cells.value.map((cell, index) => {
      const neighbors = countAliveNeighbors(index);
      return {
        alive:
          (cell.alive && neighbors === 2) || neighbors === 3
            ? true
            : false,
      };
    });
    cells.value = newCells;
  }, 100);
};

const stopGame = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

const toggleCell = (index: number) => {
  cells.value[index].alive = !cells.value[index].alive;
};

const countAliveNeighbors = (index: number) => {
  const x = index % cols;
  const y = Math.floor(index / cols);
  let aliveNeighbors = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const ni = y + i;
      const nj = x + j;
      if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
        const neighborIndex = ni * cols + nj;
        if (cells.value[neighborIndex].alive) {
          aliveNeighbors++;
        }
      }
    }
  }
  return aliveNeighbors;
};

onMounted(() => {
  resetGame();
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  gap: 1px;
}

.cell {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.cell.alive {
  background-color: #000;
}

.controls {
  margin-top: 10px;
}
</style>