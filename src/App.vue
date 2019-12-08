<template lang="pug">
  #app(
    :style="appStyles"
  )
    Board.board(:records="records")
</template>

<script lang="ts">
// デコレーター
import { Component, Prop, Vue } from "vue-property-decorator";

// FontAwesome 
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { fas } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; 
library.add(fas); 
Vue.component('font-awesome-icon', FontAwesomeIcon);

// コンポーネント
import Board from "./components/Board.vue"
@Component({ 
  components: { 
    Board
  } 
}) 

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


  /**
   * ========================================
   *  算出プロパティ
   * ========================================
   */

  /**
   * スタイルを返却する
   */
  get appStyles() {
    // 高さをウィンドウサイズに合わせる
    if (this.$el) {
      return {
        height: `calc(100vh - ${this.getAppHeight(this.$el as HTMLElement)}px)`
      }
    }
    return {}
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
    // 高さをウィンドウサイズに合わせる
    const el: HTMLElement = this.$el as HTMLElement;
    el.style.height = `calc(100vh - ${this.getAppHeight(el)}px)`
  }


  /**
   * ========================================
   *  メソッド
   * ========================================
   */

  /**
   * アプリの高さを求める
   */
  getAppHeight(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return rect.top + 36; // .contents-bottommenu-gaia の高さ
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
