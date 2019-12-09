const { loginCheck } = require('../controller/user')
const { successModel, errorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
	const method = req.method
	const url = req.url
	const path = url.split('?')[0]
	const body = req.body

	if (method === 'POST' && req.path === '/api/user/login') {
		const result = loginCheck(body.username, body.password)
		return result.then((data) => {
			if (data.username) {
				return new successModel()
			} else {
				return new errorModel('登陆失败')
			}
		})
	}

	return undefined
}

module.exports = handleUserRouter
