import request from '@/utils/request.js'

// 查询账户所有文章
export function getAllNotes() {
  return request({
    url: 'article/note',
    method: 'get',
  })
}

// 按条件查询文章
export function getNotesByCondition(data) {
  return request({
    url: 'article/note-detail',
    method: 'post',
    data,
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
