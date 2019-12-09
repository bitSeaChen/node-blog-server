const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

const serverHandle = (req, res) => {
	res.setHeader('Content-Type', 'application/json')

	// 处理 path 和 query
	const url = req.url
	req.path = url.split('?')[0]
	req.query = querystring.parse(url.split('?')[1])

	getPostData(req).then((postData) => {
		// 在获取 postData 之后，再处理路由。
		req.body = postData

		// 处理 blog 路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then((data) => {
				res.end(JSON.stringify(data))
			})
			return
		}

		// 处理 user 路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then((data) => {
				res.end(JSON.stringify(data))
			})
			return
		}

		// 处理未匹配路由
		res.writeHead(404, { 'Content-Type': 'text/plain' })
		res.write('404 not found\n')
		res.end()
	})
}
// helper
const getPostData = (req) => {
	return new Promise((resolve, reject) => {
		if (req.method === 'GET') {
			resolve({})
			return
		}

		if (req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}

		let bodyData = ''
		req.on('data', (chunk) => {
			bodyData += chunk.toString()
		})
		req.on('end', (chunk) => {
			if (!bodyData) {
				resolve({})
				return
			}
			resolve(JSON.parse(bodyData))
		})
	})
}

module.exports = serverHandle
