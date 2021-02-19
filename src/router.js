import Vue from 'vue';
import Router from 'vue-router';
import UserMain from "./components/UserMain";
import BookInfo from "./components/BookInfo";
import Home from "./components/Home";
import NonFound from "./components/NonFound";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: UserMain },
    { path: '/book_info/', component: BookInfo },
    { path: '/reservation/', component: Home },
    { path: "*", component: NonFound }
  ]
});
