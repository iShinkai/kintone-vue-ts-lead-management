<template lang="pug">
  #app
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
    el.style.height = `calc(100vh - ${height}px)`
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
