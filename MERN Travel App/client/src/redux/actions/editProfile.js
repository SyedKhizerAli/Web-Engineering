export const EditProfile=(name,email)=>{
    return{
        type:'editProfile',
        payload:{
            name,
            email
        }
    }
}