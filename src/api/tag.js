import request from '@/utils/request.js'

// 查询账户所有标签
export function getAllTags() {
  return request({
    url: 'tags/tags',
    method: 'get',
  })
}
