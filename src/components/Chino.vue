<template lang="pug">
  .card
    font-awesome-icon.card-icon(icon="coffee")
    .card-title カプチーノ
</template>

<script lang="ts">
// デコレーター
import { Component, Prop, Vue } from "vue-property-decorator";

// コンポーネント
import Card from "./Card.vue"
@Component({ 
  components: { 
    Card
  } 
}) 

// クラス本体
export default class List extends Vue {
  /**
   * ========================================
   *  プロパティ
   * ========================================
   */

  /**
   * 表示対象のレコード
   */
  @Prop()
  record!: leadManagement.types.SavedFields;

  /**
   * ========================================
   *  算出プロパティ
   * ========================================
   */

  /**
   * カードのタイトル
   */
  get recordTitleValue(): string {
    return this.record.会社名.value;
  }

  /**
   * 担当者の値
   */
  get chargeValue(): string {
    if (!this.record.案件担当者名.value.length) {
      return "--"
    }
    return this.record.案件担当者名.value.map(v => v.name).join(', ');
  }

  /**
   * 見込み時期の値
   */
  get periodValue(): string {
    if (!this.record.見込み時期.value) {
      return "--"
    }
    return this.record.見込み時期.value.replace(/-/g, '/');
  }

  /**
   * 製品名の値
   */
  get productValue(): string {
    return this.record.製品名.value;
  }

  /**
   * 単価の値
   */
  get unitValue(): string {
    return this.record.単価.value ? `￥ ${Number(this.record.単価.value).toLocaleString()}` : '--';
  }

  /**
   * ユーザー数の値
   */
  get userCountValue(): string {
    return this.record.ユーザー数.value ? `${Number(this.record.ユーザー数.value).toLocaleString()} 人` : '--';
  }

  /**
   * 小計の値
   */
  get subtotalValue(): string {
    return this.record.小計.value ? `￥ ${Number(this.record.小計.value).toLocaleString()}` : '--';
  }

  /** 
   * ======================================== 
   *  メソッド
   * ======================================== 
   */ 
}
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border: 1px solid #c0c0c0;
  border-radius: 3px;
  display: flex;
  font-size: 12px;
  margin-bottom: 5px;
  padding: 50px;

  .card-icon {
    font-size: 24px;
    padding-right: 16px;
  }

  .card-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
}
</style>