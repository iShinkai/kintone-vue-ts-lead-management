/// <reference path="@/types/vuedraggable/index.d.ts" />
<template lang="pug">
  .list
    .list-title
      span.list-title-label 確度：
      span.list-title-value {{listTitle}}
    .list-body
      Draggable.draggable(
        :group="'list'"
        :data-group="group"
        @end="onDropEnd"
      )
        Card(
          v-for="r in records"
          :key="r.$id.value"
          :record="r"
          :data-record-id="r.$id.value"
        )
</template>

<script lang="ts">
// デコレーター
import { Component, Prop, Vue } from "vue-property-decorator";

// コンポーネント
import Card from "./Card.vue";
// eslint-disable-next-line no-unused-vars
import Draggable, { DropEvent } from "vuedraggable";
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
  @Prop({ default: "" })
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

  /**
   * ========================================
   *  イベント
   * ========================================
   */

  /**
   * カードのドラッグ＆ドロップ終了時処理
   */
  onDropEnd(e: DropEvent) {
    // 動かされたカードのレコード番号
    const recordId: string = (e.item as HTMLElement).dataset.recordId!;

    // 動かす前のリスト（確度）と動かされた先のリスト（確度）を確認し、同じだったら何もしない
    const fromGroup: string = (e.from as HTMLElement).dataset.group!;
    const toGroup: string = (e.to as HTMLElement).dataset.group!;
    if (fromGroup === toGroup) {
      return;
    }

    // 親コンポーネントのメソッドを emit
    this.$emit("card-moved", { id: recordId, group: toGroup });
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