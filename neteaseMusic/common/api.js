import { baseUrl } from './config.js'

export function topList(){
	return new Promise(function(resolve,reject){
		uni.request({
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			success: res => {
				let result = res.data.list
				result.length = 4 // 只取前4项
				resolve(result)
			}
		})
	})
}
// 列表页接口
export function list(id){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=${id}`,
		method: 'GET'
	})
}
// 列表页歌曲内容接口
export function songDetail(songId){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${songId}`,
		method: 'GET'
	})
}
// 相似音乐接口
export function songSimi(songId){
	return uni.request({
		url:`${baseUrl}/simi/song?id=${songId}`,
		method: 'GET'
	})
}
// 歌曲评论接口
export function songComment(songId){
	return uni.request({
		url:`${baseUrl}/comment/music?id=${songId}`,
		method: 'GET'
	})
}
// 歌词接口
export function songLyric(songId){
	return uni.request({
		url:`${baseUrl}/lyric?id=${songId}`,
		method: 'GET'
	})
}
// 歌曲音频
export function songUrl(songId){
	return uni.request({
		url:`${baseUrl}/song/url?id=${songId}`,
		method: 'GET'
	})
}

// 热搜列表(详细)
export function searchHot(){
	return uni.request({
		url:`${baseUrl}/search/hot/detail`,
		method: 'GET'
	})
}

// 搜索结果
export function searchWord(word){
	return uni.request({
		url:`${baseUrl}/search?keywords=${word}`,
		method: 'GET'
	})
}

// 下拉提示、搜索建议
export function searchSuggest(word){
	return uni.request({
		url:`${baseUrl}/search/suggest?keywords=${word}&type=mobile`,
		method: 'GET'
	})
}
