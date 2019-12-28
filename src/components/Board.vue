<template lang="pug">
  .board
    List.list(
      v-for="g in listGroups"
      :key="g"
      :group="g"
      :records="getGroupRecords(g)"
      :data-group="g"
      @card-moved="handleCardMoved"
    )
</template>

<script lang="ts">
// デコレーター
import { Component, Prop, Vue } from "vue-property-decorator";

// コンポーネント
import List from "./List.vue";
@Component({
  components: {
    List
  }
})

// クラス本体
export default class Board extends Vue {
  /**
   * ========================================
   *  プロパティ
   * ========================================
   */

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
   * リストの配列（確度でグルーピング）
   */
  get listGroups(): string[] {
    let groups: string[] = ["A", "B", "C"];
    return groups;
  }

  /**
   * ========================================
   *  メソッド
   * ========================================
   */

  /**
   * グループ（確度）のレコードを抽出して返す
   */
  getGroupRecords(g: string): leadManagement.types.SavedFields[] {
    return this.records.filter(r => r.確度.value === g);
  }

  /**
   * カード移動時処理（子コンポーネントから emit）
   */
  handleCardMoved(r: { id: string; group: string }) {
    // 親コンポーネントのメソッドを emit
    this.$emit("card-moved", r);
  }
}
</script>

<style lang="scss" scoped>
.board {
  background-color: #3498db;
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 20px;
}
</style>