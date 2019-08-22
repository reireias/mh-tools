<template>
  <table class="color-table">
    <tr>
      <td></td>
      <td v-for="(label, index) in xlabels" :key="index">{{ label }}</td>
    </tr>
    <tr v-for="(row, index) in data" :key="index">
      <td>{{ ylabels[index] }}</td>
      <td v-for="(value, index2) in row" :key="index2">{{ value }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    xlabels: {
      type: Array,
      required: true
    },
    ylabels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.color-table {
  border: solid 1px;
  border-collapse: collapse;
}
.color-table td {
  border: solid 1px;
  text-align: center;
  padding: 10px;
}
@media screen and (min-width: 0px) and (max-device-width: 640px) {
  .color-table td {
    font-size: 10px;
    padding: 2px;
  }
}
</style>
