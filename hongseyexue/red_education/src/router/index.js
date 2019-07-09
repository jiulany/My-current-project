import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: resolve => require(['../views/Index.vue'], resolve),
    children: [{
        path: '/',
        component: resolve => require(['../components/Main.vue'], resolve)
      }, {
        path: 'new_center',
        component: resolve => require(['../components/ChangeContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        }),
        children: [{
            path: '',
            component: resolve => require(['../components/NewList.vue'], resolve)
          },
          {
            path: '/new_list/new_content',
            component: resolve => require(['../components/NewContent.vue'], resolve)
          }
        ]
      },
      {
        path: 'policy_center',
        component: resolve => require(['../components/ChangeContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        }),
        children: [{
            path: '',
            component: resolve => require(['../components/NewList.vue'], resolve)
          },
          {
            path: '/policy_list/policy_content',
            component: resolve => require(['../components/NewContent.vue'], resolve)
          }
        ]
      },
      {
        path: 'camp',
        component: resolve => require(['../components/CampContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        })
      },
      {
        path: 'contact',
        component: resolve => require(['../components/ContactContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        })
      },
      {
        path: 'curriculum',
        component: resolve => require(['../components/ChangeContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        }),
        children: [{
            path: '',
            component: resolve => require(['../components/CurriculumList.vue'], resolve)
          },
          {
            path: '/curriculum/curriculum_content',
            component: resolve => require(['../components/NewContent.vue'], resolve)
          }
        ]
      },
      {
        path: 'train',
        component: resolve => require(['../components/ChangeContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        }),
        children: [{
            path: '',
            component: resolve => require(['../components/CurriculumList.vue'], resolve)
          },
          {
            path: '/train/train_content',
            component: resolve => require(['../components/NewContent.vue'], resolve)
          }
        ]
      },
      {
        path: 'stu',
        component: resolve => require(['../components/ChangeContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        }),
        children: [{
            path: '',
            component: resolve => require(['../components/CurriculumList.vue'], resolve)
          },
          {
            path: '/stu/stu_content',
            component: resolve => require(['../components/NewContent.vue'], resolve)
          }
        ]
      },
      {
        path: 'class',
        component: resolve => require(['../components/ChangeContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        }),
        children: [{
            path: '',
            component: resolve => require(['../components/CurriculumList.vue'], resolve)
          },
          {
            path: '/class/class_content',
            component: resolve => require(['../components/NewContent.vue'], resolve)
          }
        ]
      },
      {
        path: 'line',
        component: resolve => require(['../components/ChangeContent.vue'], resolve),
        props: (route) => ({
          crumb: route.query
        }),
        children: [{
            path: '',
            component: resolve => require(['../components/CurriculumList.vue'], resolve)
          },
          {
            path: '/line/line_content',
            component: resolve => require(['../components/NewContent.vue'], resolve)
          }
        ]
      }
    ]
  }]
})
