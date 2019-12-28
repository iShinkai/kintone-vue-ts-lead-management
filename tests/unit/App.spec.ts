import { shallowMount, mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App コンポーネントのマウント", () => {
  // コンポーネントのマウントテスト
  it("正しくマウントできるか", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.is(App)).toBeTruthy();
  });
});
