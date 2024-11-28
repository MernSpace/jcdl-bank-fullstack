class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
        document.cookie = `token=${token}; path=/; secure; samesite=strict`;
    }
    getToken(){
        return localStorage.getItem("token")
    }
    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }
    getUserDetails(){
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }
    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }
    removeSessions=()=>{
        localStorage.clear();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        window.location.href="/login-user"
    }
}
export const {setEmail,getEmail,setOTP,getOTP,setToken,getToken,setUserDetails,getUserDetails,removeSessions}=new SessionHelper();