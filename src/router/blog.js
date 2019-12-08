const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { successModel, errorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
	const method = req.method
	const url = req.url
	const id = req.query.id
	const body = req.body

	if (method === 'GET' && req.path === '/api/blog/list') {
		const author = req.query.author || ''
		const keyword = req.query.keyword || ''

		const listData = getList(author, keyword)
		return new successModel(listData)
	}

	if (method === 'GET' && req.path === '/api/blog/detail') {
		const detailData = getDetail(id)
		return new successModel(detailData)
	}

	if (method === 'POST' && req.path === '/api/blog/new') {
		let result = newBlog(body)
		return new successModel(result)
	}

	if (method === 'POST' && req.path === '/api/blog/update') {
		const result = updateBlog(id, body)
		if (result) {
			return new successModel()
		} else {
			return new errorModel('更新博客失败')
		}
	}

	if (method === 'POST' && req.path === '/api/blog/delete') {
		const result = delBlog(id)
		if (result) {
			return new successModel()
		} else {
			return new errorModel('删除博客失败')
		}
	}
	return undefined
}

module.exports = handleBlogRouter
