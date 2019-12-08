import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// マウントポイント
const mountPount: string = "lead-management";

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
  // カスタマイズビューでないか既にマウント済みなら何もしない
  if (e.viewType !== "custom" || document.querySelector("#app")) {
    return e;
  }

  // マウントポイントにマウント実行
  if (document.querySelector(`#${mountPount}`)) {
    new Vue({
      render: h =>
        h(App, {
          props: {
            records: e.records
          }
        })
    }).$mount(`#${mountPount}`);
  }
});
