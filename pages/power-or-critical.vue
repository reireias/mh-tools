<template>
  <div>
    <div class="title-text primary--text">MHW IB - 攻撃 or 見切り</div>
    <div class="description-text">
      スキル「攻撃」と「見切り」をどれくらい積むか悩んだときに用の期待値計算機です。
      <br />
      物理ダメージのみに対応しています。
    </div>

    <v-expansion-panels popout>
      <v-expansion-panel>
        <v-expansion-panel-header
          >基礎攻撃力の計算方法</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <p>基礎攻撃力 = 表示攻撃力 / 武器係数</p>
              <table>
                <caption>
                  武器係数
                </caption>
                <tr>
                  <td>大剣</td>
                  <td>4.8</td>
                </tr>
                <tr>
                  <td>太刀</td>
                  <td>3.3</td>
                </tr>
                <tr>
                  <td>片手剣</td>
                  <td>1.4</td>
                </tr>
                <tr>
                  <td>双剣</td>
                  <td>1.4</td>
                </tr>
                <tr>
                  <td>ハンマー</td>
                  <td>5.2</td>
                </tr>
                <tr>
                  <td>狩猟笛</td>
                  <td>4.2</td>
                </tr>
                <tr>
                  <td>ランス</td>
                  <td>2.3</td>
                </tr>
                <tr>
                  <td>ガンランス</td>
                  <td>2.3</td>
                </tr>
                <tr>
                  <td>スラッシュアックス</td>
                  <td>3.5</td>
                </tr>
                <tr>
                  <td>チャージアックス</td>
                  <td>3.6</td>
                </tr>
                <tr>
                  <td>操虫棍</td>
                  <td>3.1</td>
                </tr>
                <tr>
                  <td>ライトボウガン</td>
                  <td>1.3</td>
                </tr>
                <tr>
                  <td>ヘビィボウガン</td>
                  <td>1.5</td>
                </tr>
                <tr>
                  <td>弓</td>
                  <td>1.2</td>
                </tr>
              </table>
            </v-col>
            <v-col>
              <p>力の爪：+6</p>
              <p>力の護符：+9</p>
              <p>食事大：+15</p>
              <p>怪力の種：+10</p>
              <p>怪力の粉塵：+10</p>
              <p>フルチャージLv1：+5</p>
              <p>フルチャージLv2：+10</p>
              <p>フルチャージLv3：+20</p>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="base"
            type="number"
            label="基礎攻撃力"
            class="number-input"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="critical"
            type="number"
            label="会心率"
            suffix="%"
            class="number-input"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            v-model="criticalBoost"
            :items="criticalBoostSkills"
            item-text="name"
            item-value="value"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <center>
      <v-btn color="primary" @click="calculate">計算</v-btn>
    </center>

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
      criticalBoost: 1.25,
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
        { critical: 5 },
        { critical: 10 },
        { critical: 15 },
        { critical: 20 },
        { critical: 25 },
        { critical: 30 },
        { critical: 40 }
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
      criticalBoostSkills: [
        { name: '超会心Lv0', value: 1.25 },
        { name: '超会心Lv1', value: 1.3 },
        { name: '超会心Lv2', value: 1.35 },
        { name: '超会心Lv3', value: 1.4 }
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
          const expected = calculateExpectedValue(
            attack,
            critical,
            this.criticalBoost
          )
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
.number-input input {
  text-align: right;
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
