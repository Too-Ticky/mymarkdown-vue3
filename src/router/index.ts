import { createRouter, createWebHistory } from 'vue-router';

import Top from '@/pages/pageTop.vue';
import Terms from '@/pages/pageTerms.vue';
import Editor from '@/components/Editor.vue';
import NotFound from '@/components/The404.vue';

export const routes
  :Array<{
    path: string;
    name: string;
    showInNav: boolean;
    component: any;
    meta: { transition: string };
  }> 
  = [
    {
      path: "/",
      name: "top",
      showInNav: false,
      component: Top,
      meta: { transition: 'slide-top' },
    },
    {
      path: "/terms",
      name: "terms",
      showInNav: false,
      component: Terms,
      meta: { transition: 'slide-left' },
    },
    {
      path: "/editor",
      name: "editor",
      showInNav: false,
      component: Editor,
      meta: { transition: 'slide-right' },
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      showInNav: false,
      component: NotFound,
      meta: { transition: 'slide-bottom' },
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
