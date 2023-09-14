<template>
	<view class="search">
		<musichead title="搜索" :icon="true" :iconblack="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<!-- @confirm 点击完成按钮 回车键等时触发 -->
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch(searchWord)" @input="handleToSuggest">
					<text v-show="searchType != 1" class="iconfont iconguanbi" @tap="handleToClose"></text>
				</view>
				<block v-if="searchType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont iconlajitong" @tap="handleToClear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in searchHistory" :key="index" @tap="handleToWord(item)">{{item}}</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" @tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{index + 1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view>{{item.content}}</view>
							</view>
							<text class="search-hot-cout">{{item.score}}</text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 2">
					<view class="search-result">
						<view class="search-result-item" v-for="(item,index) in searchList" :key="index" @tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.artists[0].name}} - {{item.album.name}}</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 3">
					<view class="search-suggess">
						<view class="search-suggess-head">搜索“{{ searchWord }}”</view>
						<view class="search-suggess-item" v-for="(item,index) in searchSuggest" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont iconsearch"></text>{{item.keyword}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '@/common/iconfont.css'
	import { searchHot, searchWord, searchSuggest } from '../../common/api.js'
	export default {
		data() {
			return {
				searchHot: [],
				searchWord: '', // 输入框文字
				searchHistory: [], // 搜索历史记录
				searchType:1, // 控制显示页面
				searchList: [],
				searchSuggest: []
			}
		},
		onLoad() {
			searchHot().then((res)=>{
				if(res[1].data.code == '200'){
					this.searchHot = res[1].data.data
				}
			})
			// 获取本地存储搜索历史记录
			uni.getStorage({
				key:'searchHistory',
				success: (res) => {
					this.searchHistory = res.data
				}
			})
		},
		components:{
			musichead
		},
		methods: {
			// 点击热搜榜/历史记录 搜索框显示对应文字
			handleToWord(word){
				this.searchWord = word
				this.handleToSearch(word)
			},
			// 回车搜索跳转
			handleToSearch(word){
				this.searchHistory.unshift(word)
				// set去重
				this.searchHistory = [...new Set(this.searchHistory)]
				// 限制历史记录数量
				if(this.searchHistory.length > 10){
					this.searchHistory.length = 10
				}
				// 本地存储
				uni.setStorage({
					key: 'searchHistory',
					data: this.searchHistory
				})
				this.getSearchList(word)
			},
			// 删除本地搜索历史记录
			handleToClear(){
				uni.removeStorage({
					key: 'searchHistory',
					success: (res) => {
						this.searchHistory = []
					}
				})
			},
			// 搜索跳转搜索结果详情页
			getSearchList(word){
				searchWord(word).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchList = res[1].data.result.songs
						this.searchType = 2
					}
				})
			},
			// 搜索框点击×时 内容为空 显示搜索页 隐藏搜索结果页
			handleToClose(){
				this.searchWord = ''
				this.searchType = 1
			},
			// 搜索结果跳转歌曲详情页
			handleToDetail(songId){
				uni.navigateTo({
					url: `/pages/detail/detail?songId=${songId}`
				})
			},
			// 搜索框输入时提醒关键词
			handleToSuggest(evt){
				let value = evt.detail.value // evt 获取value
				// 为空时返回搜索页
				if(!value){
					this.searchType = 1;
					return
				}
				// 获取搜索建议数据
				searchSuggest(value).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchSuggest = res[1].data.result.allMatch
						this.searchType = 3
					}
				})
				
			}
		}
	}
</script>

<style scoped>
.search-search{
	display: flex;
	align-items: center;
	height: 70rpx;
	margin: 70rpx 30rpx 50rpx 30rpx;
	background-color: #f7f7f7;
	border-radius: 50rpx;
}
.search-search text{
	margin: 0 26rpx;
}
.search-search input{
	flex: 1;
	font-size: 26rpx;
}
.search-history{
	margin: 0 30rpx 50rpx 30rpx;
	font-size: 26rpx;
}
.search-history-head{
	display: flex;
	justify-content: space-between;
	margin-bottom: 36rpx;
}
.search-history-list{
	display: flex;
	flex-wrap: wrap;
	
}
.search-history-list view{
	padding: 16rpx 28rpx;
	border-radius: 40rpx;
	margin-right: 30rpx;
	margin-bottom: 30rpx;
	background-color: #f7f7f7;
}
.search-hot{
	margin: 0 30rpx;
	font-size: 26rpx;
}
.search-hot-head{
	margin-bottom: 36rpx;
}
.search-hot-item{
	display: flex;
	align-items: center;
	margin-bottom: 58rpx;
}
.search-hot-top{
	color: #fb2222;
	width: 60rpx;
	margin-left: 8rpx;
}
.search-hot-word{
	flex: 1;
}
.search-hot-word view:nth-child(1){
	font-size:30rpx;
	color: black;
}
.search-hot-word view:nth-child(2){
	font-size:24rpx;
	color: #878787;
}
.search-hot-word image{
	width: 48rpx;
	height: 22rpx;
}
.search-hot-cout{
	color: #878787;
}
.search-result{
	border-top: 2rpx solid #e4e4e4;
	padding: 30rpx;
}
.search-result-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 30rpx;
	margin-bottom: 30rpx;
	border-bottom: 2rpx solid #e4e4e4;
}
.search-result-word{
	
}
.search-result-word view:nth-child(1){
	font-size:28rpx;
	color: #235790;
	margin-bottom: 12rpx;
}
.search-result-word view:nth-child(2){
	font-size:22rpx;
	color: #898989;
}
.search-result-item text{
	font-size:50rpx;
}
.search-suggess{
	border-top: 2rpx solid #e4e4e4;
	padding: 30rpx;
	font-size:26rpx;
}
.search-suggess-head{
	color: #4574a5;
	margin-bottom: 74rpx;
}
.search-suggess-item{
	color: #5d5d5d;
	margin-bottom: 74rpx;
}
.search-suggess-item text{
	color: #bdbdbd;
	margin-right: 28rpx;
	position: relative;
	top: 2rpx;
}
</style>
