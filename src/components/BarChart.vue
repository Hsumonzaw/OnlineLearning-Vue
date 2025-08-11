<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

const canvas = ref(null);
let chartInstance = null;

onMounted(() => {
  chartInstance = new Chart(canvas.value, {
    type: 'bar', // specify the chart type here
    data: props.chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

watch(
  () => props.chartData,
  (newData) => {
    if (chartInstance) {
      chartInstance.data = newData;
      chartInstance.update();
    }
  },
  { deep: true }
);

// Clean up chart instance when component unmounts
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>
