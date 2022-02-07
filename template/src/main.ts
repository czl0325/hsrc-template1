import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import './registerServiceWorker'

import { Tabbar, TabbarItem, Tabs, Tab, Button, Swipe, SwipeItem, Col, Row, Form, Field, Image, CellGroup, Cell, List, Search, NavBar, NumberKeyboard, PullRefresh, Icon, Sticky, DropdownMenu, DropdownItem, Popup, RadioGroup, Radio, CheckboxGroup, Checkbox, TreeSelect, DatetimePicker, Cascader, Grid, GridItem, Uploader, Calendar, Picker, Tag, Rate, Empty, NoticeBar } from 'vant'
import './assets/css/reset.css'
import './assets/css/common.less'

const app = createApp(App)

app.use(Tabbar).use(TabbarItem).use(Tabs).use(Tab).use(Button).use(Swipe).use(SwipeItem).use(Col).use(Row).use(Form).use(Field).use(Image).use(CellGroup).use(Cell).use(List).use(Search).use(NavBar).use(NumberKeyboard).use(PullRefresh).use(Icon).use(Sticky).use(DropdownMenu).use(DropdownItem).use(Popup).use(RadioGroup).use(Radio).use(CheckboxGroup).use(Checkbox).use(TreeSelect).use(DatetimePicker).use(Cascader).use(Grid).use(GridItem).use(Uploader).use(Calendar).use(Picker).use(Tag).use(Rate).use(Empty).use(NoticeBar)

app.use(router)
app.use(store)
app.mount('#app')
