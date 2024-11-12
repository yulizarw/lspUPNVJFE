/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, resetRegister } from "../../../store/action/userAction";


// react-router-dom components
import { Link, Redirect, useHistory } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import pictureSignIn from "assets/images/signIn.jpg"

function SignIn(props) {

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect (()=> {
    dispatch(resetRegister ())
  },[])

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      history.push("/dashboard");
    }
  }, [history, localStorage.getItem("access_token")]);
  
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const user = useSelector((state) => state.userReducers.userLogin);
  const { loginFunction } = props;

  const [formInput, setFormInput] = useState({
    userName: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(formInput));
    loginFunction();
  };
  const userNameInput = (input) => {
    const userName = formInput.userName;
    setFormInput({ ...formInput, userName: input.target.value });
  };

  const passwordInput = (input) => {
    const password = formInput.password;
    setFormInput({ ...formInput, password: input.target.value });
  };

  const registerUser = () => {
    history.push("/authentication/sign-up")
  }

   // Use effect to watch access token and push to dashboard
   
   
  return (
    <CoverLayout
      title="Hallo Insan Inovasi !"
      color="white"
      description="Silahkan Masuk dengan email dan password anda"
      premotto="Lembaga Sertifikasi Profesi UPN Veteran Jakarta"
      motto="Bela Negara"
      image={pictureSignIn}
    >
      <VuiBox component="form" role="form" onSubmit={onSubmit}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              User Name
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput type="input" placeholder="Your username..." fontWeight="500" onChange={userNameInput} />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium" >
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Your password..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              onChange={passwordInput}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="submit">
            SIGN IN
          </VuiButton>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <VuiTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
          
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;


