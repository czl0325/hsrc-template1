<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <van-tabbar v-model="activityNum" active-color="#62b2b9" inactive-color="#000" v-show="showTab" safe-area-inset-bottom>
    <van-tabbar-item to="home" icon="wap-home-o" name="home">首页</van-tabbar-item>
    <van-tabbar-item to="message" icon="chat-o" name="message">消息</van-tabbar-item>
    <van-tabbar-item to="me" icon="manager-o" name="me">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup () {
    const route = useRoute()
    const store = useStore()
    const cachedViews = computed(() => {
      return store.getters.cachedViews.map((item: string) => {
        return item
      })
    })
    const activityNum = ref('home')
    const showTab = ref(false)
    watchEffect(() => {
      activityNum.value = ((route.name || 'home') as string).toLowerCase()
      showTab.value = (route.meta.showTab || false) as boolean
    })
    return {
      cachedViews,
      activityNum,
      showTab
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
