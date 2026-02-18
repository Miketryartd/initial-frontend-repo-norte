import { GoogleLogin } from "@react-oauth/google";
import { DynamicUrl } from "./DynamicUrl";
import { useNavigate } from "react-router-dom";

function GoogleBtn() {
  const navigate = useNavigate(); 

  return (
    <div className=""> 
      <GoogleLogin
        onSuccess={credentialResponse => {
          const token = credentialResponse?.credential;
          if (!token) return;

          fetch(`${DynamicUrl()}/api/auth/google`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token})
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
      
            if (data.token && data.user) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              navigate('/Feed'); 
            }
          })
          .catch(err => console.error(err));
          
          console.log(credentialResponse);
          console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </div>
  );
}

export default GoogleBtn;