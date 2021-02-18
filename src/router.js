import Vue from 'vue';
import Router from 'vue-router';
import Home from "./pages/Home";
import Reserve from './pages/Reserve'
import NonFound from "./pages/NonFound";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/reserve', component: Reserve },
    { path: "*", component: NonFound }
  ]
});
