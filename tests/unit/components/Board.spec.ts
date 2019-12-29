import { shallowMount, mount } from "@vue/test-utils";
import Board from "@/components/Board.vue";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

// テストデータ
const records: leadManagement.types.SavedFields[] = require("../../records.json");

describe("Board コンポーネントのマウント", () => {
  // コンポーネントのマウントテスト
  it("正しくマウントできるか", () => {
    const wrapper = shallowMount(Board, {
      propsData: { records }
    });
    expect(wrapper.is(Board)).toBeTruthy();
  });

  // リストが3つ存在するかどうかのテスト
  it("リストが3つ存在するか", () => {
    const wrapper = shallowMount(Board, {
      propsData: { records }
    });
    expect(wrapper.findAll(".list").length).toBe(3);
  });
});

describe("レコードのリスト分類のテスト", () => {
  // テストデータのレコードを確度で分類して数を算出しておく
  let cards: {
    [key: string]: any;
    A: number;
    B: number;
    C: number;
  } = { A: 0, B: 0, C: 0 };
  records.forEach(r => {
    cards[r.確度.value]++;
  });

  // 確度のリストのカードの枚数がテストデータの通りかのテスト
  it("確度のリストのカードの枚数が指定通りかどうか", () => {
    const wrapper = mount(Board, {
      propsData: { records },
      stubs: {
        FontAwesomeIcon
      }
    });
    expect(wrapper.findAll(".list[data-group='A'] .card").length).toBe(
      cards["A"]
    );
    expect(wrapper.findAll(".list[data-group='B'] .card").length).toBe(
      cards["B"]
    );
    expect(wrapper.findAll(".list[data-group='C'] .card").length).toBe(
      cards["C"]
    );
  });
});

describe("イベントのテスト", () => {
  it("ドラッグ終了イベントが emit されるか", () => {
    const wrapper = shallowMount(Board, {
      propsData: { records },
      stubs: {
        FontAwesomeIcon
      }
    });
    wrapper.vm.$emit("card-moved", {
      id: records[0].$id.value,
      group: records[0].確度.value
    });
    expect(wrapper.emitted("card-moved")).toBeTruthy();
    expect(wrapper.emitted("card-moved")[0][0].id).toEqual(
      records[0].$id.value
    );
    expect(wrapper.emitted("card-moved")[0][0].group).toEqual(
      records[0].確度.value
    );
  });
});
