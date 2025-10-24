import request from '@/utils/request.js'

// 查询账户所有标签
export function getAllNotes() {
  return request({
    url: 'article/note',
    method: 'get',
  })
}
