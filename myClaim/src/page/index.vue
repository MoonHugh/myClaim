<template>
	<div class="index_main">
		<!--顶部导航-->
		<div class="top_title">
			<div class="top_word">我的理赔</div>
		</div>
		<!--正文-->
		<div class="home_content">
			<div v-show="order1" class="order">
				<div class="title fix">
					<img class="titleimg fl" src="static/image/title01.png">
					<p class="titlep fl">理赔进度</p>
				</div>
				<div class="rows fix" v-for="item in plate1">
					<a :href="'/wxweb/claim/case/caseInfoPage?reportNo='+item.reportNo">
						<div class="con_bigRow fix">
							<div class="con_littitle fl">保险名称：</div>
							<div class="con_title fl">{{item.RISKNAME}}</div>
							<div class="ckdd">查看详情</div>
						</div>
						<div class="con_littleRow">
							<div class="con_littitle fl">报案/立案时间：</div>
							<div class="con_title fl">{{item.reportTime}}</div>
						</div>
					</a>
				</div>
				<div class="rows fix" v-for="item in plate2">
					<a :href="'/wxweb/report/case/caseClaimSelect?registNo='+item.registNo+'&userName='+item.userName" v-if="item.riskCode == '1116' && item.registNo !== ''">
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
					</a>
					<a :href="'/wxweb/my/claim/claimJump?registNo='+item.registNo+'&userName='+item.userName" v-if="item.riskCode !== '1116'">
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
					</a>
				</div>
			</div>
			<ul v-show="order2" class="secondList">
				<li>
					<router-link to="historyClaim" class="secondLitop fix">
						<p>历史理赔</p>
						<img class="secondLiimg fr" src="static/image/triangle.png">
					</router-link>
				</li>
			</ul>
			<div v-show="hint" class="hint">
				<span>您暂时还没有任何进行中的理赔</span>
				<div class="borderline">
					<h6>保险理赔流程</h6>
					<ul>
						<li class="fix"><img src="static/image/01.png"><p>1、报案并提及相关信息</p></li>
						<li class="fix"><img src="static/image/02.png"><p>2、跟踪理赔状态</p></li>
						<li class="fix"><img src="static/image/03.png"><p>3、查看理赔结果</p></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			order1: '',
			order2: '',
			plate1: '',
			plate2: '',
			hint: '',
			rreturn: '',
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
			// 初始接口，获取我的理赔
			this.$http.post(Util.ajaxPath.devProductUrl+'myClaim',{emulateJSON : true}).then(function (res){
				_this.rreturn = res.body;
				if(_this.rreturn.succ == true){
					if(_this.rreturn.data.carClaim == '' && _this.rreturn.data.noCarClaim == ''){
						this.order1 = false;
						this.order2 = false;
						this.hint = true;
					}else{
						this.order1 = true;
						this.order2 = true;
						this.hint = false;
						if(_this.rreturn.data.carClaim !== ''){
							this.order1 = true;
							this.order3 = true;
							this.hint = false;
							this.plate1 = _this.rreturn.data.carClaim;
						};
						if(_this.rreturn.data.noCarClaim !== ''){
							this.order2 = true;
							this.order2 = true;
							this.hint = false;
							this.plate2 = _this.rreturn.data.noCarClaim.claim;
						};
					}
				};
			});
		},
	}
}
</script>
<style lang="scss">
.index_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.home_content{
		padding-top: 1rem;
		.order{ padding: 0.4rem 0; }
		.title{ margin: 0 auto; width: 6.76rem; height: 0.8rem; background: #006cb7; border-radius: 0.16rem; }
		.titleimg{ display: block; padding: 0.2rem; width: 0.4rem; height: 0.4rem; }
		.titlep{ height: 0.8rem; line-height: 0.82rem; font-size: 0.28rem; color: #fff; }
		.rows{ padding-top: 0.28rem; }
		.con_bigRow{
			height: 0.6rem; border-left: 0.2rem solid #006cb7; position: relative;
			.con_littitle{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.4rem; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
			.ckdd{ display: block; width: 1.88rem; height: 0.48rem; line-height: 0.5rem; text-align: center; font-size: 0.3rem; color: #fff; background: #006cb7; border-radius: 0.1rem; position: absolute; left: 5rem; top: 0.04rem; }
		}
		.con_littleRow{
			 height: 0.6rem; margin: 0 0.2rem; position: relative;
			.con_littitle{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.4rem; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
			.blue{ color: #006cb7; }
		}
		.con_littleRow:last-child{ padding-bottom: 0.28rem; border-bottom: 1px dashed #adadad; }
		.secondList{
			margin-top: 0.2rem; padding-bottom: 0.6rem; width: 100%; border-top: 1px solid #cbcbcb;
			li{ border-bottom: 1px solid #cbcbcb; }
			.secondLitop{
				height: 0.8rem; line-height: 0.8rem;
				p{ float: left; text-indent: 0.2rem; font-size: 0.24rem; color: #797979; }
				img{ float: right; margin: 0.25rem 0.2rem 0 0; width: 0.3rem; height: 0.3rem; }
			}
		}
		.hint{
			span{ display: block; height: 1.6rem; line-height: 1.6rem; text-align: center; font-size: 0.32rem; color: #006cb7; }
			.borderline{ margin: 0 0.2rem; border: 1px solid #cbcbcb; }
			h6{ height: 1rem; line-height: 1rem; text-align: center; font-size: 0.24rem; font-weight: normal; }
			li{ padding: 0 0 0.6rem 1rem; }
			img{ float: left; width: 1rem; height: 1rem; }
			p{ float: left; padding-left: 0.6rem; height: 1rem; line-height: 1rem; font-size: 0.24rem; }
		}
	}
}
</style>