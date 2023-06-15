export const Login=(name,email,userid,token)=>{
    return{
        type:'login',
        payload:{
            name,
            email,
            userid,
            token
        }
    }
}