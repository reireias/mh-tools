<template>
  <div>
    <v-text-field v-model="base" type="number" label="武器倍率"></v-text-field>
    <v-text-field
      v-model="critical"
      type="number"
      label="会心率"
      suffix="%"
    ></v-text-field>
    <v-btn color="primary" @click="calculate">計算</v-btn>
    <heat-map v-if="series" :series="series" :min="min" :max="max"></heat-map>
  </div>
</template>

<script>
import HeatMap from '@/components/HeatMap'
export default {
  components: {
    HeatMap
  },
  data() {
    return {
      base: 200,
      critical: 0,
      attackSkills: [
        { name: '攻撃Lv0', attack: 0, critical: 0 },
        { name: '攻撃Lv1', attack: 3, critical: 0 },
        { name: '攻撃Lv2', attack: 6, critical: 0 },
        { name: '攻撃Lv3', attack: 9, critical: 0 },
        { name: '攻撃Lv4', attack: 12, critical: 5 },
        { name: '攻撃Lv5', attack: 15, critical: 5 },
        { name: '攻撃Lv6', attack: 18, critical: 5 },
        { name: '攻撃Lv7', attack: 21, critical: 5 }
      ],
      criticalSkills: [
        { name: '見切りLv0', critical: 0 },
        { name: '見切りLv1', critical: 3 },
        { name: '見切りLv2', critical: 6 },
        { name: '見切りLv3', critical: 10 },
        { name: '見切りLv4', critical: 15 },
        { name: '見切りLv5', critical: 20 },
        { name: '見切りLv6', critical: 25 },
        { name: '見切りLv7', critical: 30 }
      ],
      series: null,
      min: 0,
      max: 999
    }
  },
  methods: {
    calculate() {
      this.setSeries()
    },
    setSeries() {
      this.series = null
      this.base = Number(this.base)
      const series = this.criticalSkills.map((criticalSkill) => {
        const obj = { name: criticalSkill.name }
        obj.data = this.attackSkills.map((attackSkill) => {
          const currentCritical =
            this.critical + criticalSkill.critical + attackSkill.critical
          const currentAttack = this.base + attackSkill.attack
          const expect =
            (currentAttack *
              (1.25 * currentCritical + (100 - currentCritical))) /
            100
          return {
            x: attackSkill.name,
            y: expect
          }
        })
        return obj
      })
      this.min = series[0].data[0].y
      this.max = series[7].data[7].y
      this.series = series
    }
  }
}
</script>
