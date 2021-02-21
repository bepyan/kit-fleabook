import Vue from 'vue';
import Router from 'vue-router';
import BookDetail from "./components/BookDetail";
import Home from "./components/Home";
import NonFound from "./components/NonFound";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/book_detail/', component: BookDetail, name: 'BookDetail' },
    { path: "*", component: NonFound }
  ]
});
