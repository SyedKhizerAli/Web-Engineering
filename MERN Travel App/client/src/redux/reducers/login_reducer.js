const login_reducer = (state={login:false},action) => {
  switch(action.type){
    case 'login':
        return {
            login:true,
            name:action.payload.name,
            email:action.payload.email,
            userid:action.payload.userid,
            token:action.payload.token
        };
    case 'logout':
        return{
            login:false,
            name:null,
            email:null,
            userid:null,
            token:null
        }
    case 'editProfile':
        return{
            ...state,
            name:action.payload.name,
            email:action.payload.email
        }
    default:
        return state;
  }
}

export default login_reducer
