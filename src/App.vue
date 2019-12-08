<template lang="pug">
  #app
    table
      thead
        tr 
          th 会社名
          th 先方担当者
          th 見込み時期
          th 確度
          th 製品名
          th 単価
          th ユーザー数
          th 小計
      tbody
        tr(v-for="record in records")
          td {{record.会社名.value}}
          td {{record.先方担当者.value}}
          td {{record.見込み時期.value}}
          td {{record.確度.value}}
          td {{record.製品名.value}}
          td {{record.単価.value}}
          td {{record.ユーザー数.value}}
          td {{record.小計.value}}
</template>

<script lang="ts">
// デコレーター
import { Component, Prop, Vue } from "vue-property-decorator";

// コンポーネント
@Component

// クラス本体
export default class App extends Vue {
  /**
   * ========================================
   *  プロパティ
   * ========================================
   */

  // 表示対象のレコード
  @Prop({ default: [] })
  records!: leadManagement.types.SavedFields[];
}
</script>

<style scoped lang="scss">
#app {
  table {
    th,
    td {
      border: 1px solid #9cf;
      padding: 2px 10px;
    }
    thead {
      tr {
        background-color: #dfd;
      }
    }

    tbody {
      tr {
        background-color: #fff;
        &:nth-child(even) {
          background-color: #dff;
        }
      }
    }
  }
}
</style>
