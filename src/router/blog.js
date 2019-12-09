const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { successModel, errorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
	const method = req.method
	const id = req.query.id
	const body = req.body

	if (method === 'GET' && req.path === '/api/blog/list') {
		const author = req.query.author || ''
		const keyword = req.query.keyword || ''
		const result = getList(author, keyword)
		return result.then((listData) => {
			return new successModel(listData)
		})
	}

	if (method === 'GET' && req.path === '/api/blog/detail') {
		const result = getDetail(id)
		return result.then((detailData) => {
			return new successModel(detailData)
		})
	}

	if (method === 'POST' && req.path === '/api/blog/new') {
		req.body.author = 'zhangsan'
		const result = newBlog(body)
		return result.then((data) => {
			return new successModel(data)
		})
	}

	if (method === 'POST' && req.path === '/api/blog/update') {
		const result = updateBlog(id, body)
		return result.then((data) => {
			if (data) {
				return new successModel()
			} else {
				return new errorModel('更新博客失败')
			}
		})
	}

	if (method === 'POST' && req.path === '/api/blog/delete') {
		req.body.author = 'zhangsan'
		const result = delBlog(id, body)
		return result.then((data) => {
			if (data) {
				return new successModel()
			} else {
				return new errorModel('删除博客失败')
			}
		})
	}
	return undefined
}

module.exports = handleBlogRouter
