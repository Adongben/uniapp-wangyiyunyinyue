import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		topListIds: [], // 当前列表页所有歌曲id
		nextId: '' // 下一首歌曲id
	},
	mutations:{
		// state公共状态 payload提交的数据
		INIT_TOPLISTIDS(state, payload){
			state.topListIds = payload;
		},
		NEXI_ID(state, payload){
			for (var i=0; i<state.topListIds.length;i++) {
				if(state.topListIds[i].id == payload){
					state.nextId = state.topListIds[i+1].id
				}
			}
		}
	}
})
