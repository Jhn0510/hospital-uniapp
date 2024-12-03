<template>
	<input v-model ="val" type="text" style="border: 1px solid black;margin-bottom: 20px;"></input>
	<input v-model ="val" type="text" style="border: 1px solid black;margin-bottom: 20px;"></input>
	{{val ? '我有值':'我没值'}}
	我：：：：：{{val}}
	<span v-if="val">1111</span>
	<span v-show="val">2222</span>
	<View>
		<button @click="changeVal('')">点击清空Val</button>
		<button @tap="changeVal('default value')">赋值默认值</button>
	</View>
    <view class="news-container">
        <view class="news-header">
            <view class="header-item" v-for="(item, index) in headerItems" :key="item.index"
                :class="{ active: item.index === activeHeaderIndex}" @click="changeHeader(item.index)">
                {{ item.name }}
            </view>
        </view>
        <view class="news-list">
            <!-- 静态数据渲染 -->
            <view class="news-item" v-for="(item,index) in doctorInfo" :key="index">
                <image src="https://img95.699pic.com/element/40032/0097.png_300.png" class="news-image" />
                <view class="news-content">
                    <text class="news-title">{{item.docName}}</text>
                    <view class="news-meta">
                        <text class="news-source">手机号:{{item.docPhone}}</text>
                                                <text class="news-source">身份证:{{item.docIdCard}}</text>
                                                <text class="news-source">性别:{{item.docSex == 0? '男':'女'}}</text>
                                                <text class="news-source" v-if="item.docSex == 0">性别:男</text>
                                                <text class="news-source" v-else-if="item.docSex == 3">性别:女</text>
                                                <text class="news-source" v-else>性别:未知</text>
                    </view>
                </view>
            </view>
            <!-- <view class="news-item">
                <image src="https://img95.699pic.com/element/40032/0097.png_300.png" class="news-image" />
                <view class="news-content">
                    <text class="news-title">医生2</text>
                    <view class="news-meta">
                        <text class="news-source">手机号:13659874589</text>
                        <text class="news-source">身份证:320922200304229819</text>
                        <text class="news-source">性别:男</text>
                    </view>
                </view>
            </view>
            <view class="news-item">
                <image src="https://img95.699pic.com/element/40032/0097.png_300.png" class="news-image" />
                <view class="news-content">
                    <text class="news-title">医生3</text>
                    <view class="news-meta">
                        <text class="news-source">手机号:13659874589</text>
                        <text class="news-source">身份证:320922200304229819</text>
                        <text class="news-source">性别:男</text>
                    </view>
                </view>
            </view>
            <view class="news-item" v-for="(item,index) in doctorInfo" :key="index">
                <image src="https://img95.699pic.com/element/40032/0097.png_300.png" class="news-image" />
                <view class="news-content">
                    <text class="news-title">医生4</text>
                    <view class="news-meta">
                        <text class="news-source">手机号:{{item.docPhone}}</text>
                        <text class="news-source">身份证:{{item.docIdCard}}</text>
                        <text class="news-source">性别:男</text>
                    </view>
                </view>
            </view> -->
        </view>
    </view>
</template>

<script setup>
	import{
		getDoctorInfo
	} from '@/api/doctor';
	import {
		ref,onMounted,reactive
	} from 'vue'; //ref是vue3中用于创建响应式数据的基本类型
	const val =ref('default value')
	console.log('ref val:',val.value)
	const obj =reactive({
		userrname:'zs',
		passward:'123'
	})
	console.log('reactive obj.username',obj.username)
	console.log('reactive obj.passward',obj.passward)
	console.log('ref not use value read:',val)
	const headerItems = ref([{
			index: 1,
			name: '第一页'
		},
		{
			index: 2,
			name: '第二页'
		},
		{
			index: 3,
			name: '第三页'
		},
		{
			index: 4,
			name: '第四页'
		}
	]);
	const doctorInfo=ref([])
	onMounted(()=>{
		getDoctor(1)
	})
	const getDoctor=async(page)=>{
		let data={
			page:page,
			limit:5
		}
		await getDoctorInfo(data).then(res=>{
			if(res.code===0){
				doctorInfo.value=res.data.list
			}else{
				uni.showToast({
					title:"接口响应失败",
					icon:"error"
				})
			}
			console.log("接口返回的数据",res)
		})
	}
	const activeHeaderIndex = ref(1);

	const changeHeader = (index) => {
		activeHeaderIndex.value = index;
		getDoctor(index)
	};
	const changeVal = (changedVal)=>{
		val.value =changedVal
	};
</script>

<style>
	.news-container {
		padding: 10px;
	}

	.news-header {
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
	}

	.header-item {
		padding: 5px;
		border-bottom: 2px solid transparent;
		cursor: pointer;
	}

	.header-item.active {
		border-bottom: 2px solid #007aff;
	}

	.news-list {
		margin-top: 10px;
	}

	.news-item {
		display: flex;
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
	}

	.news-image {
		width: 100px;
		height: 100px;
		margin-right: 10px;
	}

	.news-content {
		flex: 1;
	}

	.news-title {
		font-size: 18px;
		margin-bottom: 5px;
	}

	.news-meta {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		font-size: 14px;
		color: #888;
	}

	.news-source {
		margin-right: 10px;
	}

	.news-comments {
		margin-right: 10px;
	}

	.news-time {
		margin-right: 10px;
	}

	.news-close {
		background-color: transparent;
		border: none;
		color: #888;
		cursor: pointer;
	}
</style>