<template lang="pug">
  #app
    Board.board(:records="records" @card-moved="handleCardMoved")
</template>

<script lang="ts">
// デコレーター
import { Component, Vue } from "vue-property-decorator";

// kintone JS SDK
const kintoneJSSDK = require("@kintone/kintone-js-sdk");

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// コンポーネント
import Board from "./components/Board.vue";
@Component({
  components: {
    Board
  }
})

// クラス本体
export default class App extends Vue {
  /**
   * ========================================
   *  データ
   * ========================================
   */

  /**
   * 表示対象のレコード
   */
  recordData: leadManagement.types.SavedFields[] = [];

  /**
   * ========================================
   *  算出プロパティ
   * ========================================
   */

  /**
   * 表示対象のレコード
   */
  get records() {
    return this.recordData;
  }
  set records(value) {
    this.recordData = value;
  }

  /**
   * ========================================
   *  ライフサイクルフック
   * ========================================
   */

  /**
   * マウント時処理
   */
  mounted() {
    // アプリ部分の高さをウィンドウサイズに合わせる
    const el: HTMLElement = this.$el as HTMLElement;
    const rect = el.getBoundingClientRect();
    const height = rect.top + 36; // 36 は .contents-bottommenu-gaia の高さ
    el.style.height = `calc(100vh - ${height}px)`;
  }

  /**
   * ========================================
   *  メソッド
   * ========================================
   */

  /**
   * カード移動時処理（子コンポーネントから emit）
   */
  async handleCardMoved(r: { id: string; group: string }) {
    // レコード操作オブジェクトを作成
    const kintoneRecord = new kintoneJSSDK.Record();

    // 更新を実行
    const result = await kintoneRecord
      .updateRecordByID({
        app: kintone.app.getId(),
        id: r.id,
        record: {
          確度: { value: r.group }
        }
      })
      .catch((e: object) => {
        window.alert(e);
      });
  }
}
</script>

<style scoped lang="scss">
#app {
  display: grid;
  grid-template-rows: 1fr;
  position: relative;

  .board {
    grid-row: 1;
  }
}
</style>
