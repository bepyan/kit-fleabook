import Vue from 'vue';
import Router from 'vue-router';
import BookDetail from "./page/BookDetail";
import NonFound from "./page/NonFound";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: BookDetail },
    { path: '/book_detail/', component: BookDetail, name: 'BookDetail' },
    { path: "*", component: NonFound }
  ]
});
