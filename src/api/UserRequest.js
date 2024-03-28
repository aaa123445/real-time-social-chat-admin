import request from "@/utils/axios";

export async function login(params){
    return await request.post('api/auth/login',params);
}

export async function logout(){
    return await request.post('api/auth/logout');
}
