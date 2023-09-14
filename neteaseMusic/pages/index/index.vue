<template>
	<view class="index">
		<!-- 控制除首页外均显示icon -->
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				<view class="index-list">
					<view class="index-list-item" v-for="(item,index) in topList" :key="index" @tap="handleToList(item.id)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(item,index) in item.tracks" :key="index">{{index + 1}}.{{item.first}} - {{item.second}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue' // 自定义公共头部组件引入
	import '@/common/iconfont.css'
	import { topList } from '../../common/api.js' // 导入方法用对象
	export default {
		data() {
			return {
				topList: []
			}
		},
		components: {
			musichead
		},
		// 页面加载时
		onLoad() {
			topList().then((res)=>{
				if(res.length){
					this.topList = res;
				}
			})
		},
		methods: {
			handleToList(id){
				// console.log(id)
				uni.navigateTo({
					url: `/pages/list/list?Id=${id}`
				})
			},
			handleToSearch(){
				uni.navigateTo({
					url: `/pages/search/search`
				})
			}
		}
	}
</script>

<style scoped>
	.index{
		
	}
	.index-search{
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
	}
	.index-search text{
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}
	.index-search input{
		font-size: 28rpx;
		flex:1;
	}
	.index-list{
		margin: 0 30rpx;
	}
	.index-list-item{
		display: flex;
		margin-bottom: 34rpx;
	}
	.index-list-img{
		position: relative;
		width: 212rpx;
		height: 212rpx;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}
	.index-list-img image{
		width: 100%;
		height: 100%;
	}
	.index-list-img text{
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}
	.index-list-text{
		width: 55vw;
		font-size: 24rpx;
		line-height: 66rpx;
	}
	.index-list-text view{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
