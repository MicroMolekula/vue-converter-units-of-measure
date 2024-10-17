<script setup>
import ConverterComponent from "@/components/ConverterComponent.vue";
import {reactive, ref} from "vue";

const measureTransforms = ref([
  {
    name: ref("Футы|Метры"),
    funcs: reactive({
      transformValue: (value) => {
        return value ? (value * 3.28).toFixed(4) : null;
      },
      inverseTransform: (value) => {
        return value && value > 0 ? (value / 3.28).toFixed(4) : null;
      }
    }),
  },
  {
    name: ref("Морские мили|Километры"),
    funcs: reactive({
      transformValue: (value) => {
        return value ? (value * 1.852).toFixed(4) : null;
      },
      inverseTransform: (value) => {
        return  value && value > 0 ? (value / 1.852).toFixed(4) : null;
      }
    }),
  },
  {
    name: ref("Градусы|Радианы"),
    funcs: reactive({
      transformValue: (value) => {
        return value ? (value * (Math.PI/180)).toFixed(6) : null;
      },
      inverseTransform: (value) => {
        return  value ? (value * (180/Math.PI).toFixed(6)) : null;
      }
    }),
  },
  {
    name: ref("Градусы Цельсия|Градусы Фаренгейта"),
    funcs: reactive({
      transformValue: (value) => {
        return value ? (value * (9/5) + 32).toFixed(2) : null;
      },
      inverseTransform: (value) => {
        return value ? ((value - 32) * (5/9).toFixed(2)) : null;
      }
    }),
  }
]);

</script>

<template>
  <div class="main">
    <converter-component
        v-for="item in measureTransforms"
        :converter-functions="item.funcs"
        :names-measure="item.name"
    >
    </converter-component>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>