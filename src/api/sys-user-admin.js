import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/user/admin/list',
    method: 'post',
    data
  })
}

export function getRoleList(name) {
  return request({
    url: '/user/sysRole/roleList',
    method: 'post',
    params: { roleName: name }
  })
}

export function fetchSysUserInfo(id) {
  return request({
    url: '/user/admin/' + id,
    method: 'get'
  })
}
