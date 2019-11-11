<template>
	<div v-show="true" class="user-info" :class="{ show: displayUserInfo }">
		<div class="return-btn" @click="HIDE_USER_INFO">
			<span class="btn-icon"></span>
		</div>
		<a
			class="user-login"
			href="https://wappass.baidu.com/passport/?login#/insert_account"
		>
			<img src="/baidu/images/user.png" alt="" class="user-icon" />
			<span class="user-text">登录</span>
		</a>
		<div class="user-menu">
			<a href="" class="menu-item"
				><span class="menu-icon"></span
				><span class="menu-text">我的关注</span></a
			>
			<a href="" class="menu-item"
				><span class="menu-icon"></span
				><span class="menu-text">我的收藏</span></a
			>
			<a href="" class="menu-item"
				><span class="menu-icon"></span
				><span class="menu-text">我的订单</span></a
			>
			<a href="" class="menu-item"
				><span class="menu-icon"></span
				><span class="menu-text">皮肤中心</span></a
			>
			<a href="" class="menu-item"
				><span class="menu-icon"></span
				><span class="menu-text">用户反馈</span></a
			>
		</div>
		<div class="bottom-bar">
			<div class="upper-part">
				<div class="setting">
					<i class="setting-icon"></i>
					<span class="setting-text">设置</span>
				</div>
				<div class="temperature">
					<span class="number">11°</span>
					<span class="city">北京</span>
				</div>
			</div>
			<div class="below-part">
				©2019 Baidu 使用百度前必读
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState, mapMutations } from "vuex";
import { HIDE_USER_INFO } from "../store/mutation-types";
@Component({
	computed: mapState(["displayUserInfo"]),
	methods: mapMutations(["HIDE_USER_INFO"])
})
export default class UserInfo extends Vue {}
</script>

<style lang="scss" scoped>
.user-info {
	position: fixed;
	top: 0;
	bottom: 0;
	left: -250px;
	width: 250px;
	background-color: #fff;
	transition: transform 0.4s;
	z-index: 20;
	&.show {
		transform: translateX(100%);
	}
}
.return-btn {
	width: 44px;
	height: 52px;
	display: flex;
	align-items: center;
	justify-content: center;
	.btn-icon {
		width: 20px;
		height: 20px;
		background-image: url(/baidu/images/btn_icon_1.png);
		background-size: contain;
	}
}
.user-login {
	height: 78px;
	padding-top: 18px;
	padding-left: 30px;
	display: flex;
	overflow: hidden;
	white-space: nowrap;
	.user-icon {
		width: 60px;
		height: 60px;
	}
	.user-text {
		margin-left: 15px;
		align-self: center;
		overflow: hidden;
		white-space: nowrap;
		font-size: 18px;
		color: #000;
	}
}
.user-menu {
	margin-top: 30px;
	border-top: 1px solid #e8e8e8;
	padding-top: 20px;
	.menu-item {
		display: flex;
		align-items: center;
		height: 50px;
		padding-left: 30px;
		color: #333333;
		font-size: 16px;
		&:nth-of-type(1) {
			.menu-icon {
				background-image: url(/baidu/images/user_menu_1.png);
			}
		}
		&:nth-of-type(2) {
			.menu-icon {
				background-image: url(/baidu/images/user_menu_2.png);
			}
		}
		&:nth-of-type(3) {
			.menu-icon {
				background-image: url(/baidu/images/user_menu_3.png);
			}
		}
		&:nth-of-type(4) {
			.menu-icon {
				background-image: url(/baidu/images/user_menu_4.png);
			}
		}
		&:nth-of-type(5) {
			.menu-icon {
				background-image: url(/baidu/images/user_menu_5.png);
			}
		}
	}
	.menu-icon {
		width: 20px;
		height: 20px;
		background-size: contain;
		margin-right: 15px;
	}
}

.bottom-bar {
	position: absolute;
	width: 100%;
	bottom: 0;
	.upper-part {
		display: flex;
	}
	.setting {
		display: flex;
		width: 24px;
		flex-direction: column;
		align-items: center;
		margin-left: 30px;
		margin-right: 30px;
		&-icon {
			width: 19px;
			height: 20px;
			background-image: url(/baidu/images/user_bottom_bar.png);
			background-size: 200px 100px;
			background-position: -1px -80px;
		}
		&-text {
			font-size: 12px;
			color: #666;
			margin-top: 4px;
		}
	}
	.temperature {
		display: flex;
		width: 30px;
		flex-direction: column;
		align-items: center;
		.number {
			font-size: 19px;
			color: #666c82;
			height: 20px;
			line-height: 25px;
			width: 100%;
			text-align: center;
		}
		.city {
			font-size: 12px;
			color: #666;
			margin-top: 4px;
			width: 100%;
		}
	}
	.below-part {
		margin-top: 12px;
		height: 34px;
		display: flex;
		align-items: center;
		color: #cccccc;
		border-top: 0.01rem solid #e8e8e8;
		font-size: 12px;
		padding-left: 30px;
	}
}
</style>
