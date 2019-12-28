import { shallowMount, mount } from "@vue/test-utils";
import List from "@/components/List.vue";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

// テストデータ
const records: leadManagement.types.SavedFields[] = require("../../records.json");

describe("List コンポーネントのマウント", () => {
  // 確度 A だけを抽出しておく
  const aRecords = records.filter(r => r.確度.value === "A");

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
  // 確度 A だけを抽出しておく
  const aRecords = records.filter(r => r.確度.value === "A");

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
