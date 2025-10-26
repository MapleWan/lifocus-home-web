import request from '@/utils/request.js'

// 查询账户所有文章
export function getAllNotes() {
  return request({
    url: 'article/note',
    method: 'get',
  })
}

// 添加 文章
export function addNote(data) {
  return request({
    url: 'article/note',
    method: 'post',
    data,
  })
}
