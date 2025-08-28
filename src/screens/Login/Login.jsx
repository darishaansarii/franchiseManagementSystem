import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../slices/authSlice";
import img from "../../assets/login2.jpg"
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import styles from "./Login.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const buttonRef = useRef(null);

  const handleKeyDown = (e, nextRef, isSubmit) => {
    if (e.key === "Enter") {
      e.preventDefault();
      isSubmit ? nextRef.current.click() : nextRef.current.focus();
    }
  };

  const getToastPosition = () => {
    return window.innerWidth <= 800 ? "bottom-center" : "bottom-right";
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields!", {
        position: getToastPosition(),
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    dispatch(loginStart());

    // signInWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user);

    //     const getData = await getDoc(doc(db, "Users", user.uid));

    //     const finalUser = {
    //       uid: user.uid,
    //       email: user.email,
    //       ...getData.data(),
    //     };

    //     dispatch(loginSuccess(finalUser));

    //     toast.success("Login successfully!", {
    //       position: getToastPosition(),
    //       autoClose: 2500,
    //       hideProgressBar: false,
    //       closeOnClick: false,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });

    //     setTimeout(() => {
    //       navigate("/dashboard");
    //     }, 1500);
    //   })
    //   .catch((error) => {
    //     const errorMessage = error.message;
    //     dispatch(loginFailure(errorMessage));

    //     console.log(errorMessage);
    //     toast.error("Email or password is incorrect!", {
    //       position: getToastPosition(),
    //       autoClose: 2500,
    //       hideProgressBar: false,
    //       closeOnClick: false,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   });

    signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;
    const getData = await getDoc(doc(db, "Users", user.uid));

    if (!getData.exists()) {
      toast.error("User data not found!", { position: getToastPosition() });
      return;
    }

    const userData = getData.data();

    if (userData.role !== role) {
      toast.error("Role mismatch! Please select the correct role.", {
        position: getToastPosition(),
      });
      return;
    }

    const finalUser = {
      uid: user.uid,
      email: user.email,
      ...userData,
    };

    dispatch(loginSuccess(finalUser));

    toast.success("Login successfully!", {
      position: getToastPosition(),
      autoClose: 2500,
    });

    setTimeout(() => {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "branchManager") {
        navigate("/branch-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }, 1500);
  })
  .catch((error) => {
    dispatch(loginFailure(error.message));
    toast.error("Email or password is incorrect!", {
      position: getToastPosition(),
    });
  });

  };
  return (
    <>
      <Box className={`${styles.container} ${styles.slideIn}`}>
        <img className={styles.img} src={img} alt="img" />
        <form onSubmit={login} className={styles.form} action="">
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", color: "#780606" }}
          >
            Welcome Back!
          </Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            inputRef={input1Ref}
            onKeyDown={(e) => handleKeyDown(e, input2Ref)}
            sx={{
              "& label.Mui-focused": {
                color: "#780606",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "#780606",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#780606",
                },
              },
            }}
            label="Enter Email"
            variant="outlined"
            fullWidth
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel
              sx={{
                "&.Mui-focused": {
                  color: "#780606",
                },
              }}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              inputRef={input2Ref}
              onKeyDown={(e) => handleKeyDown(e, buttonRef, true)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#780606",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#780606",
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="role-label"
              sx={{
                "&.Mui-focused": {
                  color: "#780606",
                },
              }}
            >
              Role
            </InputLabel>
            <Select
              inputRef={input3Ref}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  buttonRef.current.click();
                }
              }}
              labelId="role-label"
              id="role"
              value={role}
              label="Role"
              onChange={handleRoleChange}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#780606",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#780606",
                },
              }}
            >
              <MenuItem value="" disabled>
                First Select a role
              </MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="branchManager">Branch Manager</MenuItem>
            </Select>
          </FormControl>

          <Button
            ref={buttonRef}
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#780606", textTransform: "capitalize" }}
          >
            Sign in
          </Button>
          <p>
            Don't have an account?{" "}
            <Link style={{ color: "#780606" }} to="/signup">
              Register now
            </Link>
          </p>
        </form>
      </Box>
    </>
  );
};

export default Login;
