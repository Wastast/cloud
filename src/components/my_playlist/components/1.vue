<template>
	<view>
		<view class="likeimg" @tap="like">
			<image v-if="isClick==0" class="likeimage" style="color: #30D4F5;" src="../../static/like.png"></image>
			<image v-if="isClick==1" class="likeimage" style="color: #30D4F5;" src=""></image>
		</view>
		<view class="clicknum">
			{{clickNum}}
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				clickNum:12,
				isClick:''
			}
			},
			methods:{
				like:function(){
							if(this.isClick==0){
								this.isClick=1
								this.clickNum=this.clickNum+1
							}else{
								this.isClick=0
								this.clickNum=this.clickNum-1
							}
				}
				
				
			}
	}
	
</script>