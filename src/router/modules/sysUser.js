import Layout from '@/layout'

const sysUserRouter = {
  path: '/sysUser',
  component: Layout,
  redirect: '/user-manager/sys-user-list',
  name: 'sysUser',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      path: 'sysUser-list',
      component: () => import('@/views/user-manager/sys-user-list'),
      name: 'sysUser-list',
      meta: { title: '用户列表' }
    },
    {
      path: 'sysUser-info',
      component: () => import('@/views/user-manager/sys-user-info'),
      name: 'sysUser-info',
      meta: { title: '用户详情' },
      hidden: true
    }
  ]

}
export default sysUserRouter

