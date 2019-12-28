import { shallowMount, mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

// テストデータ
const records: leadManagement.types.SavedFields[] = require("../../records.json");

describe("Card コンポーネントのマウントと値", () => {
  const record = JSON.parse(JSON.stringify(records[0]));
  const wrapper = shallowMount(Card, {
    propsData: { record },
    stubs: {
      FontAwesomeIcon
    }
  });

  // コンポーネントのマウントテスト
  it("正しくマウントできるか", () => {
    expect(wrapper.is(Card)).toBeTruthy();
  });

  // 値のテスト

  it("ラベルが正しいかどうか", () => {
    expect(wrapper.find(".card-title").text()).toEqual(record.会社名.value);
  });

  it("案件担当者が正しいかどうか", () => {
    expect(wrapper.find(".line-charge .value").text()).toEqual(
      record.案件担当者名.value.map((v: { name: string }) => v.name).join(", ")
    );
  });

  it("見込み時期が正しいかどうか", () => {
    expect(wrapper.find(".line-period .value").text()).toEqual(
      record.見込み時期.value.replace(/-/g, "/")
    );
  });

  it("製品名が正しいかどうか", () => {
    expect(wrapper.find(".line-product-name .value").text()).toEqual(
      record.製品名.value
    );
  });

  it("単価が正しいかどうか", () => {
    expect(wrapper.find(".line-unit .value").text()).toEqual(
      Number(record.単価.value).toLocaleString()
    );
  });

  it("ユーザー数が正しいかどうか", () => {
    expect(wrapper.find(".line-user-count .value").text()).toEqual(
      `${Number(record.ユーザー数.value).toLocaleString()} 人`
    );
  });

  it("小計が正しいかどうか", () => {
    expect(wrapper.find(".line-subtotal .value").text()).toEqual(
      `￥ ${Number(record.小計.value).toLocaleString()}`
    );
  });
});

describe("異常値処理", () => {
  // 異常値を差し込んでおく
  const record = JSON.parse(JSON.stringify(records[0]));
  record.案件担当者名.value = [];
  record.見込み時期.value = "";
  record.単価.value = "";
  record.ユーザー数.value = "";
  record.小計.value = "";

  const wrapper = shallowMount(Card, {
    propsData: { record },
    stubs: {
      FontAwesomeIcon
    }
  });

  // 値のテスト

  it("案件担当者が正しいかどうか", () => {
    expect(wrapper.find(".line-charge .value").text()).toEqual("--");
  });

  it("見込み時期が正しいかどうか", () => {
    expect(wrapper.find(".line-period .value").text()).toEqual("--");
  });

  it("単価が正しいかどうか", () => {
    expect(wrapper.find(".line-unit .value").text()).toEqual("--");
  });

  it("ユーザー数が正しいかどうか", () => {
    expect(wrapper.find(".line-user-count .value").text()).toEqual("--");
  });

  it("小計が正しいかどうか", () => {
    expect(wrapper.find(".line-subtotal .value").text()).toEqual("--");
  });
});
