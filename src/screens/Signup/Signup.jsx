import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import img from "../../assets/login2.jpg"
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../Login/Login.module.css";
import stylessheet from "./Signup.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from "../../slices/authSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = React.useState("");

  const navigate = useNavigate();
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const getToastPosition = () => {
    return window.innerWidth <= 800 ? "bottom-center" : "bottom-right";
  };

  const handleKeyDown = (e, nextRef, isSubmit) => {
    if (e.key === "Enter") {
      e.preventDefault();
      isSubmit ? nextRef.current.click() : nextRef.current.focus();
    }
  };

  const signup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
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

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);

        let userObj = {
          name,
          email,
          role
        };

        await setDoc(doc(db, "Users", user.uid), userObj);

        toast.success("Signup successfully!", {
          position: getToastPosition(),
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);

        dispatch(loginSuccess(userObj));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(loginFailure(errorMessage));

        console.log(errorMessage);

        toast.error(errorMessage, {
          position: getToastPosition(),
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
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

  return (
    <>
      <Box className={`${stylessheet.container} ${styles.slideIn}`}>
      <img className={styles.img} src={img} alt="img" />
        
        <form
          onSubmit={signup}
          className={`${styles.form} ${stylessheet.formContainer}`}
          action=""
        >
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", color: "#780606" }}
          >
            Join Our LMS!
          </Typography>
          <TextField
            inputRef={input1Ref}
            onKeyDown={(e) => handleKeyDown(e, input2Ref)}
            onChange={(e) => setName(e.target.value)}
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
            label="Enter Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            inputRef={input2Ref}
            onKeyDown={(e) => handleKeyDown(e, input3Ref)}
            onChange={(e) => setEmail(e.target.value)}
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
              inputRef={input3Ref}
              onKeyDown={(e) => handleKeyDown(e, input4Ref)}
              onChange={(e) => setPassword(e.target.value)}
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
            inputRef={input4Ref}
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
            Sign up
          </Button>
          <p>
            Already have an account?{" "}
            <Link style={{ color: "#780606" }} to="/">
              Login now
            </Link>
          </p>
        </form>
      </Box>
    </>
  );
};

export default Signup;
