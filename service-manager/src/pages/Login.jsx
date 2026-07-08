import * as React from 'react'
import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
import App from '../App';

import GithubDarkIcon from '@iconify-react/selfhst/github-dark';
import GoogleIcon from '@iconify-react/selfhst/google';

export const DEFAULT_USERNAME="Admin";
export const DEFAULT_PASSWORD="root";


function Login({ onLogin } = {}) {

    const outlinedUsernameId = React.useId();
    const outlinedPasswordId = React.useId();
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
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false); // État pour gérer le spinner
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Récupérer le compte mis à jour depuis le localStorage (ou utiliser les valeurs par défaut)
        const saved = localStorage.getItem("service-manager-account");
        const account = saved 
            ? JSON.parse(saved) 
            : { username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD };

        // 2. Comparer avec les données du localStorage au lieu des constantes fixes
        const isLoginValid = username === account.username && password === account.password;
        
        console.log('isLoginValid:', isLoginValid, 'username:', username, 'password:', password);

        if (isLoginValid) {
            setError('');
            setSuccess('Login successfully, loading in progress...');
            setLoading(true); // On active le chargement plein écran
            
            setTimeout(() => {
                onLogin(); 
            }, 1500);
        } else {
            setSuccess('');
            setError('Invalid username or password !, Please try again.');
            setLoading(false); 
        }
    };

    return (
        <>
            {/* ÉCRAN DE CHARGEMENT PLEIN ÉCRAN (Style déconnexion) */}
            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050A24]/80 backdrop-blur-sm text-white">
                    <svg className="animate-spin h-14 w-14 text-[#0C8CE9] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xl font-semibold tracking-wide">Loading in progress...</p>
                </div>
            )}

            <div className="mx-auto overflow-hidden flex flex-col md:flex-row w-full h-screen">
                {/* Section Gauche */}
                <div className="w-full md:w-1/2 bg-gradient-to-r from-[#050A24] to-[#0F1D5A] flex justify-center items-center p-4">
                     <div className="flex md:shrink-0 justify-center items-center p-6 my-10 md:my-0 md:mt-30 md:mb-30 md:ml-[max(0px,calc(50vw-680px))] bg-gradient-to-tr from-[#007DFA]/[4%] via-[#0C8CE9]/[15%] to-[#007DFA]/[4%] text-white w-11/12 sm:w-auto md:w-170 md:h-[min(720px,85vh)] max-w-full" >
                        <div className="p-4 md:p-0">
                            <h2 className="text-[14px] font-bold">TRACKER TEAM©</h2>                            
                            <h1 className="mt-20 text-4xl font-bold">Service Manager</h1>
                            <p className="mt-10 text-2xl font-bold ">Service Manager is a web app that is used <br />to manage and oversee a <br />system's service.</p>
                        </div>
                      </div>
                </div>
                
                {/* Section Droite */}
                 <div className="md:w-1/2 bg-white w-full h-full flex justify-center items-center p-4">
                    <div className="flex text-black justify-center items-center p-4 my-10 md:my-0 md:mt-30 md:mb-30 md:mr-[max(0px,calc(50vw-680px))] bg-gradient-to-tr from-[#FFFFFF]/[4%] via-[#A3A3A3]/[15%] to-[#FFFFFF]/[4%] md:shrink-0 w-11/12 sm:w-auto md:w-170 md:h-[min(720px,85vh)] border border-[#E3E3E3] shadow-lg max-w-full">
                        <div className="p-6 md:pb-10 md:pr-20 md:pl-20 justify-center bg-white md:ml-25 md:mr-25 md:mb-10 md:mt-10 w-full md:w-[500px] md:h-[min(680px,78vh)] border border-white rounded-3xl flex flex-col items-center max-w-full">
                            
                            <div className="flex shrink-0 justify-center items-center w-20 h-20 mt-10 mx-auto border bg-[radial-gradient(circle,_#0F1D5A_0%,_#0C8CE9_100%)] rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
                                    <path fill="white" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path>
                                </svg>
                            </div> 
                            
                            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center"> 
                             <div id="LoginPory" className="mt-2 mb-2 text-center w-full flex flex-col items-center">
                                <p className="text-3xl font-bold mt-2">Welcome Back !</p>
                                <p className="text-lg font-bold mb-7">Sign into your account</p>

                                <FormControl sx={{ width: {xs: '100%', sm: '30ch'}, maxWidth: '100%', mb: 3 }} variant="outlined">
                                    <InputLabel htmlFor={`${outlinedUsernameId}-input`}>Username</InputLabel>
                                    <OutlinedInput
                                        id={`${outlinedUsernameId}-input`}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={loading}
                                        sx={{
                                            borderRadius: '30px',
                                            '& .MuiOutlinedInput-input': {
                                                color: '#000000',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '30px',
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                borderColor: 'rgba(0, 0, 0, 0.23)', 
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#000000',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#0C8CE9',
                                            },
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                            </InputAdornment>
                                        }
                                        label="Username"
                                    />
                                </FormControl>
                                
                                <FormControl sx={{ width: {xs: '100%', sm: '30ch'}, maxWidth: '100%', mb: 3 }} variant="outlined">
                                    <InputLabel htmlFor={`${outlinedPasswordId}-input`}>Password</InputLabel>
                                    <OutlinedInput
                                        id={`${outlinedPasswordId}-input`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPassword ? 'text' : 'password'}
                                        disabled={loading}
                                        sx={{
                                            borderRadius: '30px',
                                            '& .MuiOutlinedInput-input': {
                                                color: '#000000',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '30px',
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                borderColor: 'rgba(0, 0, 0, 0.23)',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#000000',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#0C8CE9',
                                            },
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end"> 
                                                <IconButton
                                                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                    disabled={loading}
                                                >
                                                    {showPassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                            <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                            <line x1="2" y1="2" x2="22" y2="22"></line>
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>

                                {error && (
                                <Typography color="error" variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    {error}
                                </Typography>
                                )}

                                <Button 
                                    variant='contained' 
                                    type='submit' 
                                    disabled={loading}
                                    className="w-full md:w-70 md:h-14" 
                                    sx={{ fontSize: '18px', borderRadius: '30px', backgroundColor: '#0C8CE9', textTransform: 'none', fontWeight: 'bold', mb: 2 }}
                                >
                                    Login
                                </Button>
                                
                                <p className="text-2sm font-bold mb-4">Continue with</p>
                                <div className="flex flex-wrap justify-center mb-4" style={{ display: 'flex', gap: '18px' }}>
                                    <Button variant="outlined" disabled={loading} className="h-12 w-full sm:w-auto md:h-12 md:w-30" color='black' sx={{ fontSize: '18px', borderRadius: '30px', border: "#ece7e7", backgroundColor: '#ece7e7', textTransform: 'none', fontWeight: 'bold' }} startIcon={<GoogleIcon height="1em" />} >Google</Button>
                                    <Button variant="outlined" disabled={loading} className="w-full sm:w-auto md:w-30 md:h-12" color='black' sx={{ fontSize: '18px', borderRadius: '30px', border: '#ece7e7', backgroundColor: '#ece7e7', textTransform: 'none', fontWeight: 'bold' }} startIcon={<GithubDarkIcon height="1em" />}>Github</Button>
                                </div>
                                
                                <p className="text-2sm font-bold mt-2">Forgot <a href="https://www.google.com" className='text-blue-600 underline hover:text-blue-800'>password?</a></p>

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
