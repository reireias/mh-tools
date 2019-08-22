<template>
  <div>
    <div class="title-text">MHW - 攻撃 or 見切り</div>
    <div class="description-text">
      スキル「攻撃」と「見切り」をどれくらい積むか悩んだときに用の期待値計算機です。
      <br />
      物理ダメージのみに対応しています。
    </div>

    <v-text-field v-model="base" type="number" label="武器倍率"></v-text-field>
    <v-text-field
      v-model="critical"
      type="number"
      label="会心率"
      suffix="%"
    ></v-text-field>
    <v-btn color="primary" @click="calculate">計算</v-btn>
    <div class="result-box">
      <center>
        <color-table
          v-if="data"
          :xlabels="attackLabels"
          :ylabels="criticalLabels"
          :data="data"
        ></color-table>
      </center>
    </div>
  </div>
</template>

<script>
import ColorTable from '@/components/ColorTable'
import { calculateExpectedValue } from '@/utils/expected'
export default {
  components: {
    ColorTable
  },
  data() {
    return {
      base: 200,
      critical: 0,
      attackSkills: [
        { attack: 0, critical: 0 },
        { attack: 3, critical: 0 },
        { attack: 6, critical: 0 },
        { attack: 9, critical: 0 },
        { attack: 12, critical: 5 },
        { attack: 15, critical: 5 },
        { attack: 18, critical: 5 },
        { attack: 21, critical: 5 }
      ],
      attackLabels: [
        '攻撃Lv0',
        '攻撃Lv1',
        '攻撃Lv2',
        '攻撃Lv3',
        '攻撃Lv4',
        '攻撃Lv5',
        '攻撃Lv6',
        '攻撃Lv7'
      ],
      criticalSkills: [
        { critical: 0 },
        { critical: 3 },
        { critical: 6 },
        { critical: 10 },
        { critical: 15 },
        { critical: 20 },
        { critical: 25 },
        { critical: 30 }
      ],
      criticalLabels: [
        '見切りLv0',
        '見切りLv1',
        '見切りLv2',
        '見切りLv3',
        '見切りLv4',
        '見切りLv5',
        '見切りLv6',
        '見切りLv7'
      ],
      data: null
    }
  },
  methods: {
    calculate() {
      const data = []
      this.criticalSkills.forEach((criticalSkill) => {
        const row = []
        this.attackSkills.forEach((attackSkill) => {
          const attack = Number(this.base) + attackSkill.attack
          const critical =
            Number(this.critical) +
            attackSkill.critical +
            criticalSkill.critical
          const expected = calculateExpectedValue(attack, critical, 1.25)
          row.push((Math.round(expected * 100) / 100).toFixed(2))
        })
        data.push(row)
      })
      this.data = data
    }
  }
}
</script>

<style>
.title-text {
  font-size: 64px;
}
.description-text {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.result-box {
  margin-top: 10px;
}
@media screen and (min-width: 0px) and (max-device-width: 640px) {
  .title-text {
    font-size: 32px;
  }
  .description-text {
    font-size: 16px;
  }
}
</style>
