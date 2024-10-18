<script setup>
import {computed, ref, watch} from "vue";

const props = defineProps({
  namesMeasure:{
    type: String,
    required: true,
  },
  converterFunctions: {
    type: Object,
    required: true,
    validator(value) {
      return typeof value.transformValue === 'function'
        && typeof value.inverseTransform === 'function'
    }
  }
});

const names = props.namesMeasure.split('|');

const inputName = ref(names[0]);
const outputName = ref(names[1]);

const inputValue = ref(null);
const measure = ref(null);

const outputValue = computed({
  get() {
    return measure.value;
  },
  set(input) {
    measure.value = convert(input);
  }
});

let convert = props.converterFunctions.transformValue;

let funcFlag = true;

function reverse() {
  funcFlag = !funcFlag;
  [inputName.value, outputName.value] = [outputName.value, inputName.value]
  convert = funcFlag ? props.converterFunctions.transformValue : props.converterFunctions.inverseTransform;
  inputValue.value = measure.value;
  outputValue.value = inputValue.value;
}

watch(inputValue, (value) => {
  outputValue.value = value;
})

</script>

<template>
  <div class="converter-block">
    <div class="mb-3">
      <label for="feets" class="form-label">{{ inputName }}</label>
      <input type="text" v-model="inputValue" class="form-control" id="feets" placeholder="Введите значение">
    </div>
    <div class="btn-convert">
      <button @click="reverse" type="button" class="btn btn-secondary" >⇆</button>
    </div>
    <div class="mb-3">
      <label for="meters" class="form-label">{{ outputName }}</label>
      <input type="text" :value="outputValue" class="form-control" id="meters" disabled>
    </div>
  </div>
</template>

<style scoped>
.converter-block {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 35rem;
  margin-inline: auto;
}

.btn-convert {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>