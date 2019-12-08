const { loginCheck } = require('../controller/user')
const { successModel, errorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
	const method = req.method
	const url = req.url
	const path = url.split('?')[0]
	const body = req.body

	if (method === 'POST' && req.path === '/api/user/login') {
		const result = loginCheck(body.username, body.password)
		if (result) {
			return new successModel()
		} else {
			return new errorModel('登录失败')
		}
	}

	return undefined
}

module.exports = handleUserRouter
