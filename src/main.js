import Vue from "vue";
import {
  Input,
  Button,
  Card,
  List,
  Select,
  Spin,
  Pagination
} from "ant-design-vue";
import { createProvider } from "./vue-apollo";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.component(Input.name, Input);
Vue.component(Input.Group.name, Input.Group);
Vue.component(Button.name, Button);
Vue.component(Card.name, Card);
Vue.component(List.name, List);
Vue.component(List.Item.name, List.Item);
Vue.component(List.Item.Meta.name, List.Item.Meta);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Spin.name, Spin);
Vue.component(Pagination.name, Pagination);

Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
