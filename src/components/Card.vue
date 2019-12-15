<template lang="pug">
  .card
    .card-title
      span {{recordTitleValue}}
      a.label-icon.record-icon(
        :href="externalLink"
        target="_blank"
      )
        font-awesome-icon(icon="external-link-alt")
    .card-body
      .card-line.line-charge
        .card-line-inner
          font-awesome-icon.label-icon(icon="user-tie")
          .value {{chargeValue}}
      .card-line.line-period
        .card-line-inner
          font-awesome-icon.label-icon(icon="calendar-alt")
          .value {{periodValue}}
      .card-line.line-product-name
        .card-line-inner
          font-awesome-icon.label-icon(icon="shopping-cart")
          .value {{productValue}}
      .card-line.line-unit
        .card-line-inner
          font-awesome-icon.label-icon(icon="yen-sign")
          .value {{unitValue}}
      .card-line.line-user-count-subtotal
        .card-line-inner.line-user-count
          font-awesome-icon.label-icon(icon="users")
          .value {{userCountValue}}
        .card-line-inner.line-subtotal
          .label 小計
          .value {{subtotalValue}}
</template>

<script lang="ts">
// デコレーター
import { Component, Prop, Vue } from "vue-property-decorator";

// コンポーネント
@Component

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
      return "--";
    }
    return this.record.案件担当者名.value.map(v => v.name).join(", ");
  }

  /**
   * 見込み時期の値
   */
  get periodValue(): string {
    if (!this.record.見込み時期.value) {
      return "--";
    }
    return this.record.見込み時期.value.replace(/-/g, "/");
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
    return this.record.単価.value
      ? `${Number(this.record.単価.value).toLocaleString()}`
      : "--";
  }

  /**
   * ユーザー数の値
   */
  get userCountValue(): string {
    return this.record.ユーザー数.value
      ? `${Number(this.record.ユーザー数.value).toLocaleString()} 人`
      : "--";
  }

  /**
   * 小計の値
   */
  get subtotalValue(): string {
    return this.record.小計.value
      ? `￥ ${Number(this.record.小計.value).toLocaleString()}`
      : "--";
  }

  /**
   * レコードのリンク先
   */
  get externalLink(): string {
    return `/k/${kintone.app.getId()}/show#record=${this.record.$id.value}`;
  }
}
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border: 1px solid #c0c0c0;
  border-radius: 3px;
  font-size: 12px;
  margin-bottom: 5px;
  padding: 5px;

  &:hover {
    box-shadow: 0 0 10px rgb(#000, 0.4);
    cursor: pointer;
  }

  .card-title {
    display: flex;
    font-size: 15px;
    font-weight: bold;
    justify-content: space-between;
    line-height: 30px;

    .record-icon {
      color: #ccc;
      margin-left: 10px;
      :hover {
        color: #217dbb;
        cursor: pointer;
      }
    }
  }

  .card-body {
    padding: 3px;

    .card-line {
      display: flex;
      line-height: 24px;
      justify-content: space-between;

      .label,
      .label-icon,
      .value {
        display: inline-block;
        line-height: 20px;
        padding-right: 5px;
      }

      .label {
        font-size: 12px;
        text-align: right;
        width: 80px;

        &::after {
          content: "：";
        }
      }

      .label-icon {
        color: #777;
        font-size: 16px;
        text-align: center;
        width: 20px;
      }

      .value {
        font-size: 13px;
      }

      .line-subtotal {
        .value {
          font-size: 16px;
        }
      }
    }
  }
}
</style>