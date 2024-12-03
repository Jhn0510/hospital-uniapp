// 定义一个 HTTP 请求拦截器对象
const httpInterceptor = {
	// 拦截前触发的方法
	invoke(options : UniApp.RequestOptions) {
		// 设置通用的请求头
		options.header = {
			'source-client': 'miniapp', // 设置请求头中的 source-client 字段
			...options.header // 合并用户自定义的其他请求头
		};

		const token = "fa0232ffe3864e43b95ee623e509a7b4"; // 假设的固定 token
		if (token) {
			options.header['Authorization'] = token; // 如果有 token，则设置 Authorization 头
		}

		// 如果 URL 不是以 http 开头，则添加基础 URL
		if (!options.url.startsWith('http')) {
			options.url = "http://121.41.76.11:30002" + options.url; // 添加基础 URL
		}

		// 设置超时时间
		options.timeout = 10000; // 设置请求超时时间为 10 秒
	},
};

// 定义一个文件上传拦截器对象
const uploadInterceptor = {
	// 拦截前触发的方法
	invoke(options : UniApp.RequestOptions) {
		// 1. 非 http 开头需拼接地址
		if (!options.url.startsWith('http')) {
			options.url = "http://localhost:8080" + options.url; // 添加基础 URL
		}
		options.timeout = 10000; // 设置超时时间为 10 秒
		options.header.Authorization = "wechatRequestToken"; // 设置 Authorization 头
	}
};

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor); // 添加 HTTP 请求拦截器

// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', uploadInterceptor); // 添加文件上传拦截器

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */

// 定义返回的数据结构
type Data<T> = {
	code : string, // 错误码
	msg : string, // 错误信息
	result : T // 结果数据
}

// 2.2 添加类型，支持泛型

// 导出一个泛型请求函数
export const http = <T>(options : UniApp.RequestOptions) => {
	// 1. 返回 Promise 对象
	return new Promise<Data<T>>((resolve, reject) => {
		uni.request({
			...options, // 传递所有请求选项
			// 响应成功
			success(res) {
				// 状态码 2xx，参考 axios 的设计
				if (res.statusCode >= 200 && res.statusCode < 300) {
					// @ts-ignore
					if (res.data.code !== 0) {
						resolve(res.data); // 如果 data 中的 code 不是 0，直接解析数据
					} else {
						// 提取核心数据 res.data
						resolve(res.data as Data<T>); // 解析数据并转换为泛型类型
					}
				} else {
					// 其他错误 -> 根据后端错误信息轻提示
					uni.showToast({
						icon: 'none', // 显示无图标
						title: (res.data as Data<T>).msg || '请求错误' // 显示错误信息或默认提示
					});

					reject(res); // 拒绝 Promise
				}
			},

			// 响应失败
			fail(err) {
				// 网络错误 -> 提示用户换网络
				uni.showToast({
					icon: 'none', // 显示无图标
					title: '网络错误，换个网络试试' // 提示信息
				});

				reject(err); // 拒绝 Promise
			}
		});
	});
};