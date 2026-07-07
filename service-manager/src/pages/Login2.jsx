import * as React from 'react'
import { useState,useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person'; 
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import App from '../App';


import GithubDarkIcon from '@iconify-react/selfhst/github-dark';
import GoogleIcon from '@iconify-react/selfhst/google';

const STATIC_USERNAME="Admin";
const STATIC_PASSWORD="root";


function Login({ onLogin } = {}) {

    const outlinedUsernameId = React.useId();
    //const outlinedWeightId = React.useId();
    const outlinedPasswordId = React.useId();
    //const outlinedAmountId = React.useId();
    const filledUsernameId = React.useId();
    //const filledWeightId = React.useId();
    const filledPasswordId = React.useId();
    //const filledAmountId = React.useId();
    const standardUsernameId = React.useId();
    //const standardWeightId = React.useId();
    const standardPasswordId = React.useId();
    //const standardAmountId = React.useId();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // Identifiants statiques temporaires (à remplacer plus tard par un vrai appel API)
        const isLoginValid = username === STATIC_USERNAME && password === STATIC_PASSWORD;
        console.log('isLoginValid:', isLoginValid, 'username:', username, 'password:', password);

        if (isLoginValid) {
        onLogin(); // redirige vers App.jsx (route par défaut)
        } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect !!');
        }
    };

    return (
        <>
            <div className="mx-auto overflow-hidden flex flex-col md:flex-row w-full md:h-screen">
                <div className="w-1/2 bg-gradient-to-r from-[#050A24] to-[#0F1D5A] ">
                     <div className=" md:shrink-0 md:flex justify-center items-center mt-30 ml-70 mb-30 bg-gradient-to-tr from-[#007DFA]/[4%] via-[#0C8CE9]/[15%] to-[#007DFA]/[4%] text-white md:w-170 md:h-180" >
                        <div >
                            <h2 className="text-[14px] font-bold">TRACKER TEAM©</h2>                            
                            <h1 className="mt-20 text-4xl font-bold">Service Manager</h1>
                            <p className="mt-10 text-2xl font-bold ">Service Manager is a web app that is used <br />to manage and oversee a <br />system's service.</p>
                        </div>
                      </div>
                </div>
                 <div className="md:w-1/2 bg-white w-full h-full">
                    {/*<div className="w-16 h-16 bg-white rounded-full border border-[#0C8CE9] shadow-lg"></div> */}
                    <div className=" md:flex justify-center items-center mt-30 mr-70 mb-30 bg-gradient-to-tr from-[#FFFFFF]/[4%] via-[#A3A3A3]/[15%] to-[#FFFFFF]/[4%]  md:shrink-0 md:w-170 md:h-180 border border-[#E3E3E3] shadow-lg">
                        <div className=" pb-10 pr-20 pl-20 justify-center bg-white ml-25 mr-25 mb-10 mt-10 md:w-[500px] md:h-[680px] border border-white rounded-3xl">
                            <div className=" md:flex justify-center items-center md:w-20 md:h-20 mt-10 ml-30 mr-30 border bg-[radial-gradient(circle,_#0F1D5A_0%,_#0C8CE9_100%)] rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
                                  <path fill="white" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path>
                                </svg>
                            </div> 
                            <form onSubmit={handleSubmit}> 
                             <div id="LoginPory" className="mt-2 mb-2">
                                <p className="text-3xl font-bold mt-2">Welcome Back !</p>
                                <p className="text-lg font-bold mb-7">Sign into your account</p>

                                <FormControl sx={{  width: '30ch', height: '10' }} variant="outlined">
                                    <InputLabel  htmlFor={`${outlinedUsernameId}-input`} >Username</InputLabel>
                                    <OutlinedInput
                                        id={`${outlinedUsernameId}-input`}
                                        onChange={(e) =>setUsername(e.target.value)}
                                        sx={{
                                            borderRadius: '30px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                            borderRadius: '30px',
                                            },
                                        }}
                                        endAdornment={
                                        <InputAdornment position="end"> 
                                            <PersonIcon></PersonIcon>
                                        </InputAdornment>
                                        }
                                        label="Username"
                                    />
                                </FormControl>
                                
                                     <br /><br />
                                <FormControl sx={{ mt:'2ch', width: '30ch', height: '10ch' }} variant="outlined">
                                    <InputLabel  htmlFor={`${outlinedPasswordId}-input`} >Password</InputLabel>
                                    <OutlinedInput
                                        id={`${outlinedPasswordId}-input`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPassword ? 'text' : 'password'}
                                        sx={{
                                            borderRadius: '30px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                            borderRadius: '30px',
                                            
                                            },
                                        }}
                                        endAdornment={
                                        <InputAdornment position="end"> 
                                            <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword} /*Eto ny code ampidirana anle icon maso*/
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
                                {error && (
                                <Typography  color="error" variant="body2">
                                    {error}
                                </Typography>
                                )}
                                <Button variant='contained' type='submit' className="md:w-70 md:h-14" sx={{ fontSize: '18px',borderRadius: '30px', backgroundColor: '#0C8CE9', textTransform: 'none',fontWeight: 'bold'}}>Login</Button>
                                <p className="mt-4 text-lg font-bold">Contiue with</p><br />
                                <div className="md:flex justify-center" style={{ display: 'flex', gap: '18px' }}>
                                    {/* Bouton avec l'icône Google */}
                                    <Button variant="outlined" className="md:h-12 md:w-30" color='black' sx={{ fontSize: '18px',borderRadius: '30px',border: "#ece7e7", backgroundColor: '#ece7e7', textTransform: 'none',fontWeight: 'bold'}} startIcon={<GoogleIcon height="1em" />} >Google</Button>

                                    {/* Bouton avec l'icône GitHub */}
                                    
                                    <Button variant="outlined" className="md:w-30 md:h-12" color='black' sx={{fontSize: '18px', borderRadius: '30px',border: '#ece7e7', backgroundColor: '#ece7e7', textTransform: 'none', fontWeight: 'bold'}} startIcon={<GithubDarkIcon height="1em" />}>Github</Button>
                                </div><br />
                                <p className="text-lg font-bold mb-5">Forgot <a href="www.google.com">password?</a></p>

                            </div>
                            </form>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </>
    
    );
}

export default Login
