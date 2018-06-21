import test from "ava";
import { mount } from "@vue/test-utils";
import VariantSelector from "../components/VariantSelector";

let option = {
  id: "test",
  name: "Color",
  values: [{ value: "Red" }, { value: "Green" }, { value: "Blue" }]
};

test.beforeEach(t => {
  t.context.wrapper = mount(VariantSelector, {
    propsData: { option }
  });
});

test("VariantSelector.vue shapshot", t => {
  t.snapshot({ html: t.context.wrapper.html() });
});

test("VariantSelector.vue emits value on input", t => {
  t.context.wrapper.find("select").trigger("input");

  t.truthy(t.context.wrapper.emitted());
});
