import db from '../../db'
const state = {
  collections: ["users", "orders"],
  currentCollectData: null,
  loading: null,
  currentCollection: '',
};
const mutations = {
  startFetch(){
    state.currentCollectData = null
    state.loading = true
  },
  setDataBaseData(state,{collect,data}){
    if(data){
      for(let key in data){
        data[key].id = key
      }
      state.currentCollectData = {...data}
      state.currentCollection = collect
    }
    state.loading = false
  }
};
const actions = {
  addNewDoc({state}, {currentCollect,count,formData}) {
    if(currentCollect){
      db.ref(`${currentCollect}/`).push().set(formData,
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("complete");
          }
        },
      );
    }
  },
  getDataBaseData({commit}, collect) {
    try{
      commit('startFetch')
      if(state.currentCollection){
        db.ref(state.currentCollection).off()
      }
      const dataBase = db.ref(collect);
      dataBase.on("value", (snapshot) => {
       const data = snapshot.val();
        commit('setDataBaseData', {collect, data})
      });
      return true
    }catch(e){
      return e
    }
  },
  removeDoc({},{doc, currentCollect }){
    db.ref(`${currentCollect}/` + doc.id).remove()
  }
};
const getters = {};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
