# options-vs-decorator

### 本项目是为了对比options语法以及decorator语法的性能问题


先说结论：
options, 和decorator在运行时的效率基本是一致的。但是我想说明的一点是decorator由于他本身有个runtime的“修饰”过程。无疑是会浪费一部分性能的(这部分会非常夸张)。

这是一些实验数据

1. 构建vnode

| 次数 | options | decorator |
| :--: | :--: | :--: |
| 1 | 213,757 | 211,340 |
| 2 | 218,714 | 218,073 |
| 3 | 195,690 | 205,335 |
| 4 | 216,385 | 220,515 |
| 5 | 213,917 | 228,336 |
| 6 | 206,875 | 201,941 |


2. 引入runtime

| 次数 | options | decorator |
| :--: | :--: | :--: |
| 1 | 857,252,273 | 46,484 |
| 2 | 889,291,608 | 52,765 |


#### options

```js

export default {
  props: {
    text: {
      require: true
    }
  }
}

```

类似这个代码片段是一个vue options对象。


#### decorator

```js
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

@Component
export default class LinkDecorator extends Vue {
  @Prop({
    type: String
  })
  text

  handleClick() {
    console.log('link-decorator', this.text)
  }
}
```

而这个代码片段是一个vue class。装饰器目前（2022年）仍是在提案中。这个特性我们需要一些compiler编译成。编译后的片段可能是这样。

```js
const PropCustom = Prop({
  type: String
})
PropCustom(LinkDecorator, 'text')
Component(LinkDecorator)

let LinkDecorator = (_dec = (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_3__.Prop)({
  type: String
}), (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_3__.Component)(_class = (_class2 = class LinkDecorator extends vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(...args) {
    super(...args);

    (0,_Users_bytedance_playground_options_vs_deccorator_node_modules_pnpm_babel_runtime_7_18_6_node_modules_babel_runtime_helpers_esm_initializerDefineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "text", _descriptor, this);
  }

  handleClick() {
    console.log('link-decorator', this.text);
  }

}, (_descriptor = (0,_Users_bytedance_playground_options_vs_deccorator_node_modules_pnpm_babel_runtime_7_18_6_node_modules_babel_runtime_helpers_esm_applyDecoratedDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_class2.prototype, "text", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
```
