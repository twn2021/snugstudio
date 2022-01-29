import Vue from 'vue';
import Router from 'vue-router';
import FindPlaceView from '../views/FindPlaceView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'findplace',
      component: FindPlaceView,
    },
  ],
});
