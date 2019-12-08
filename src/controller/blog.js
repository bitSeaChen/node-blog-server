const getList = (author, keybord) => {
	return [
		{
			id: 1,
			title: '标题A',
			content: '内容A',
			createTime: 1575781422859,
			author: '哈哈哈'
		},
		{
			id: 2,
			title: '标题B',
			content: '内容B',
			createTime: 1575781470772,
			author: '呵呵呵'
		},
		{
			id: 3,
			title: '标题C',
			content: '内容C',
			createTime: 1575781497291,
			author: '啊啊啊'
		}
	]
}

const getDetail = (id) => {
	return {
		content: '这是博客的详细内容'
	}
}

const newBlog = (blogData = {}) => {
	// blogData 是一个博客对象，包含 title content 属性
	return {
		id: 4
	}
}

const updateBlog = (id, blogData = {}) => {
	return true
}

const delBlog = (id) => {
	return true
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}
