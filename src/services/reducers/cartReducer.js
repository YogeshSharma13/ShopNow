
const reducer = (state=0,action) =>{
    if(action.type=='addtoCart'){
        return state + 1
    }
    else{
        return state
    }
}

export default reducer