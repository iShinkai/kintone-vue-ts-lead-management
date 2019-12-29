import { shallowMount, mount } from "@vue/test-utils";
import List from "@/components/List.vue";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

// テストデータ
const records: leadManagement.types.SavedFields[] = require("../../records.json");

// 確度 A だけを抽出しておく
const aRecords = records.filter(r => r.確度.value === "A");

describe("List コンポーネントのマウント", () => {
  // コンポーネントのマウントテスト
  it("正しくマウントできるか", () => {
    const wrapper = shallowMount(List, {
      propsData: { group: "A", records: aRecords }
    });

    // List コンポーネントがある
    expect(wrapper.is(List)).toBeTruthy();

    // ラベルが正しい
    expect(wrapper.find(".list-title-value").text()).toEqual("[A]");
  });
});

describe("カードの枚数", () => {
  // カードの枚数がレコードの数ぶん存在するかどうかのテスト
  it("カードの枚数がレコードの数ぶん存在するか", () => {
    const wrapper = mount(List, {
      propsData: { group: "A", records: aRecords },
      stubs: {
        FontAwesomeIcon
      }
    });
    expect(wrapper.findAll(".card").length).toBe(aRecords.length);
  });
});

describe("イベントのテスト", () => {
  it("ドラッグ終了イベントが emit されるか", () => {
    const wrapper = shallowMount(List, {
      propsData: { group: "A", records: aRecords },
      stubs: {
        FontAwesomeIcon
      }
    });
    wrapper.vm.$emit("card-moved", { id: aRecords[0].$id.value, group: "A" });
    expect(wrapper.emitted("card-moved")).toBeTruthy();
    expect(wrapper.emitted("card-moved")[0][0].id).toEqual(
      aRecords[0].$id.value
    );
    expect(wrapper.emitted("card-moved")[0][0].group).toEqual("A");
  });
});
