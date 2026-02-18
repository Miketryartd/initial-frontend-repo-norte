import { GoogleLogin } from "@react-oauth/google";
import { DynamicUrl } from "./DynamicUrl";

function GoogleBtn(){




      

    return (

        <>
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
    .then(data => console.log(data))
    .catch(err => console.error(err));
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>;
        </>
    )

}

export default GoogleBtn;