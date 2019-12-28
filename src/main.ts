import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// マウントポイント
const mountPount: string = "lead-management";

// VM の参照
let vm: Vue;

// インターフェイス
interface KintoneEvent {
  offset: Number;
  records: leadManagement.types.SavedFields[];
  size: Number;
  type: string;
  viewName: string;
  viewType: string;
}

/**
 * イベント処理
 */
kintone.events.on(["app.record.index.show"], (e: KintoneEvent) => {
  // カスタマイズビューでないなら何もしない
  if (e.viewType !== "custom") {
    return e;
  }
  console.log(JSON.stringify(e.records));

  // マウントポイントが存在するなら
  if (
    document.querySelector(`#${mountPount}`) ||
    document.querySelector("#app")
  ) {
    // 未マウントならマウント実行
    if (!document.querySelector("#app")) {
      vm = new Vue({
        render: h => h(App)
      }).$mount(`#${mountPount}`);
    }

    // レコードをセット
    Vue.set(vm.$children[0], "records", e.records);
  }
});
