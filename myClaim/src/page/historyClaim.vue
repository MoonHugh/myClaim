<template>
	<div class="historyClaim_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">我的理赔</div>
		</div>
		<!--正文-->
		<div class="historyClaim_content">
			<div class="order">
				<div class="title fix">
					<img class="titleimg fl" src="static/image/title01.png">
					<p class="titlep fl">历史理赔</p>
				</div>
				<div class="rows fix" v-for="item in plate1">
					<div class="con_bigRow fix">
						<div class="con_littitle fl">保险名称：</div>
						<div class="con_title fl">{{item.RISKNAME}}</div>
						<div class="ckdd">查看详情</div>
					</div>
					<div class="con_littleRow">
						<div class="con_littitle fl">报案/立案时间：</div>
						<div class="con_title fl">{{item.reportTime}}</div>
					</div>
				</div>
				<div class="rows fix" v-for="item in plate2">
					<div class="con_bigRow fix">
						<div class="con_littitle fl">保险名称：</div>
						<div class="con_title fl">{{item.riskName}}</div>
						<div class="ckdd">查看详情</div>
					</div>
					<div class="con_littleRow">
						<div class="con_littitle fl">报案/立案时间：</div>
						<div class="con_title fl">{{item.openDate}}</div>
					</div>
					<div class="con_littleRow">
						<div class="con_littitle fl">最新进度：</div>
						<div class="con_title fl blue">{{item.recentStatus}}</div>
					</div>
				</div>
			</div>
			<div class="hint" v-show="hint">没有历史理赔！</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			rreturn: '',
			plate1: '',
			plate2: '',
			hint: '',
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取历史理赔
			this.$http.post(Util.ajaxPath.devProductUrl+'historyClaim',{emulateJSON : true}).then(function (res){
				_this.rreturn = res.body;
				if(_this.rreturn.succ == true){
					if(_this.rreturn.data.carClaim == '' && _this.rreturn.data.noCarClaim == ''){
						this.hint = true;
					}else{
						if(_this.rreturn.data.carClaim !== ''){
							this.hint = false;
							this.plate1 = _this.rreturn.data.carClaim;
						};
						if(_this.rreturn.data.noCarClaim !== ''){
							this.hint = false;
							this.plate2 = _this.rreturn.data.noCarClaim.claim;
						}
					};
				};
			});
		},
	}
}
</script>
<style lang="scss">
.historyClaim_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.historyClaim_content{
		padding-top: 1rem;
		.order{ padding-top: 0.4rem; }
		.title{ margin: 0 auto; width: 6.76rem; height: 0.8rem; background: #727070; border-radius: 0.16rem; }
		.titleimg{ display: block; padding: 0.2rem; width: 0.4rem; height: 0.4rem; }
		.titlep{ height: 0.8rem; line-height: 0.82rem; font-size: 0.28rem; color: #fff; }
		.rows{ padding-top: 0.28rem; }
		.con_bigRow{
			height: 0.6rem; border-left: 0.2rem solid #727070; position: relative;
			.con_littitle{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.4rem; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
			.ckdd{ display: block; width: 1.88rem; height: 0.48rem; line-height: 0.5rem; text-align: center; font-size: 0.3rem; color: #fff; background: #727070; border-radius: 0.1rem; position: absolute; left: 5rem; top: 0.04rem; }
		}
		.con_littleRow{
			 height: 0.6rem; margin: 0 0.2rem; position: relative;
			.con_littitle{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.4rem; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
			.blue{ color: #006cb7; }
		}
		.con_littleRow:last-child{ padding-bottom: 0.28rem; border-bottom: 1px dashed #adadad; }
		.hint{ padding: 0.2rem; height: 1.6rem; line-height: 1.6rem; text-align: center; font-size: 0.26rem; color: #000; }
	}
}
</style>