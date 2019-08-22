<template>
  <table class="color-table">
    <caption>
      太字 = 合計スキルレベルが同じ範囲での最大期待値
    </caption>
    <tr>
      <td></td>
      <td v-for="(label, index) in xlabels" :key="index">{{ label }}</td>
    </tr>
    <tr v-for="(row, index) in data" :key="index">
      <td>{{ ylabels[index] }}</td>
      <td
        v-for="(value, index2) in row"
        :key="index2"
        :style="getStyle(index, index2, value)"
      >
        {{ value }}
      </td>
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
  },
  data() {
    return {
      colors: ['#BBDEFB', '#F0F4C3', '#F8BBD0']
    }
  },
  computed: {
    maxValues() {
      const values = []
      for (let i = 0; i < this.xlabels.length + this.ylabels.length - 1; i++) {
        values.push([])
      }
      this.data.forEach((row, index) => {
        row.forEach((value, index2) => {
          values[index + index2].push(value)
        })
      })
      return values.map((subValues) => {
        return Math.max(...subValues)
      })
    }
  },
  methods: {
    getStyle(row, col, value) {
      let style = `background-color: ${this.colors[(row + col) % 3]};`
      if (this.maxValues[row + col] === Number(value)) {
        style += 'font-weight: bold;'
      }
      return style
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
