"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const headerItems = common_vendor.ref([
      {
        index: 1,
        name: "第一页"
      },
      {
        index: 2,
        name: "第二页"
      },
      {
        index: 3,
        name: "第三页"
      },
      {
        index: 4,
        name: "第四页"
      }
    ]);
    const activeHeaderIndex = common_vendor.ref(1);
    const changeHeader = (index) => {
      activeHeaderIndex.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(headerItems.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.index,
            c: item.index === activeHeaderIndex.value ? 1 : "",
            d: common_vendor.o(($event) => changeHeader(item.index), item.index)
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
