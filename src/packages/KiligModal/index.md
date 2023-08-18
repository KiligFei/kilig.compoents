---
group: 反馈
category: Components
subtitle: 对话框
title: KiligModal
---

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

## API

**支持 ant design Modal 的属性**

| 参数     | 说明                                 | 类型                       | 默认值  |
| -------- | ------------------------------------ | -------------------------- | ------- |
| trigger  | 对话框标题                           | `React.ReactNode`          |         |
| size     | 对话框宽度                           | `small \| middle \| large` | `small` |
| onOk     | 点击确定回调                         | `() => Promise<any>`       |         |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | `() => Promise<any>`       |         |
