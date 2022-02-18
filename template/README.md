# 海晟移动端开发模板

> 项目ui库采用vant-ui，文档地址：https://vant-contrib.gitee.io/vant/v3/#/zh-CN/home

#### 路由配置

配置路由注意：一级页面有一个/，二级页面两个/，三级页面三个/，如一级页面/a，二级页面/a/b，三级页面/a/b/c，这样递增，在一级页面进入二级页面后，会缓存一级页面，二级页面进入三级页面后，会缓存二级页面，三级页面退回二级页面，会把三级页面的缓存清掉，二级页面退回一级页面，会把二级页面的缓存清掉

#### 网络请求

写在http文件夹内，api.ts文件内，也可以自己创建文件夹分类，引用http1为api路径，http2为文件路径，这两个路径在config.ts里面配置


#### 覆盖vant默认样式

在文件/src/assets/css/vantui.less下复写vant的默认样式覆盖。具体可复写的参数值参考vantui的文档


#### 列表的下拉刷新和上拉加载更多

html固定写法
```html
<van-pull-refresh style="width: 100%;min-height: calc(100vh - 50px);" v-model="state.refreshing" @refresh="getOrderList(true)">
  <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多数据" :immediate-check="false" @load="getOrderList(false)">
    <order-item v-for="order in orderList" :key="order.orderId" :order="order"/>
  </van-list>
</van-pull-refresh>
```

固定写法：定义一个响应式对象
```ts
const state = reactive({ refreshing: false, loading: false, finished: true })
```

请求方法只需要调用getList方法即可，第三四个参数传入是否是刷新(refresh)和你定义的state<br>
getList,getList2,getList3三个方法都是请求列表的，只是后端返回的参数不同。
```ts
http1.getList2<OrderInfo>('', {
    _method: 'bf.mobile.fuj.coop.send',
    methodName: '/user/coop/service/order/query',
    userId: sessionStorage.getItem('userId') || '',
    orderState,
    pageNum,
    pageSize: PAGE_SIZE
  }, refresh, state)
```
