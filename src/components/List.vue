<template lang="pug">
  .list
    .list-title
      span.list-title-label 確度：
      span.list-title-value {{listTitle}}
    .list-body
      Draggable.draggable(:options="{ group: 'list' }")
        Card(
          v-for="r in records"
          :key="r.$id.value"
          :record="r"
        )
</template>

<script lang="ts">
// デコレーター
import { Component, Prop, Vue } from "vue-property-decorator";

// コンポーネント
import Card from "./Card.vue"
import Draggable from "vuedraggable"
@Component({ 
  components: { 
    Card,
    Draggable
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
   * リストのタイトル（グループ名）
   */
  @Prop({ default: '' })
  group!: string;

  /**
   * 表示対象のレコード
   */
  @Prop({ default: [] })
  records!: leadManagement.types.SavedFields[];

  /**
   * ========================================
   *  算出プロパティ
   * ========================================
   */

  /**
   * リストタイトル
   */
  get listTitle(): string {
    return `[${this.group}]`;
  }
}
</script>

<style lang="scss" scoped>
.list {
  background-color: #e0e0e0;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 30px 1fr;
  margin-right: 5px;
  min-width: 300px;
  padding: 2px;

  .list-title {
    font-weight: bold;
    grid-row: 1;
    line-height: 30px;
    margin-bottom: 3px;
    padding-left: 5px;

    .list-title-label {
      font-size: 14px;
    }

    .list-title-value {
      font-size: 18px;
    }
  }
  
  .list-body {
    grid-row: 2;
    overflow-y: auto;
    padding: 5px;

    .draggable {
      height: 100%;
    }
  }
}
</style>