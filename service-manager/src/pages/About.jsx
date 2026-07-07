import TypewriterTitle from "../components/TypewriterTitle";
import React, { useState, useEffect } from 'react';
// Importation des icônes Material UI
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Tableau regroupant les 4 personnes
const teamMembers = [
  {
    name: "RANDRIAMBOAVONJY",
    firstname: "Jean Aimé",
    im: "3561",
    email: "aimerandr16@gmail.com",
    phone: "+261 38 72 350 55",
    linkedin: "Jean Aimé RANDRIAMBOAVONJY",
    image: "src/images/Aime.jpeg"
  },
  {
    name: "MAHERINANDRASANA",
    firstname: "Arotiana Brad Florentin",
    im: "3495",
    email: "arotiana.brad@gmail.com", 
    phone: "+261 38 89 271 95",      
    linkedin: "Arotiana Brad MAHERINANDRASANA", 
    image: "src/images/Arotiana.jpeg"
  },
  {
    name: "LAHATRINIAVO",
    firstname: "Fy Mijoro",
    im: "3447", 
    email: "lfmijoro@gmail.com",
    phone: "+261 38 32 141 34",
    linkedin: "Fy Mijoro LAHATRINIAVO",
    image: "src/images/lahatra.jpeg" 
  },
  {
    name: "RATSIMBAZAFY",
    firstname: "Maminiony Fitiavana",
    im: "3532",
    email: "tsiresy.raza@gmail.com",
    phone: "+261 32 16 970 36",
    linkedin: "Tsiresy RAZAFINDRAHAJA",
    image: "src/images/Fitiavana.png"
  }
];

function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotate, setRotate] = useState(false); // Gère le basculement rotateY
  const [isPaused, setIsPaused] = useState(false); 

  const DISPLAY_DURATION = 5000; 
  const TRANSITION_DURATION = 500; // 500ms pour une rotation fluide

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // 1. Lance la rotation à 90 degrés (carte de profil)
      setRotate(true);
      
      // 2. À mi-chemin, change la personne et ramène la carte à 0 degré
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
        setRotate(false);
      }, TRANSITION_DURATION);

    }, DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]); 

  const currentPerson = teamMembers[currentIndex];

  return (
    <div className="p-8 text-white bg-[#050816] m-10 overflow-y-auto min-h-screen">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Section Textes descriptifs */}
        <div>
          <TypewriterTitle />
          <h1 className="mt-6 mb-6 text-3xl font-bold">What is SERVICE MANAGER?</h1>
          <p className="mt-4 mb-4 text-justify text-gray-300 leading-relaxed">
            Service Manager is a web interface that simplifies the supervision and control of system services (systemd) on your servers. No more juggling command lines: see at a glance the total number of services, which ones are active, and which are stopped, then start, stop, or restart each service directly from the dashboard. Filter by status, view the details of each daemon (description, load path, preset state), and keep a clear, centralized view of the infrastructure you manage.
          </p>
          <p className="mt-4 mb-4 text-justify text-gray-300 leading-relaxed">
            This project is currently in active development. The version presented here is a static mockup intended to illustrate the user experience and intended features; integration of a backend and database for real-time service management is in progress.
          </p>
          <h1 className="mt-6 mb-6 text-3xl font-bold">Who are us?</h1>
          <p className="mt-4 mb-4 text-justify text-gray-300 leading-relaxed">
            We are the Tracker Team, a team of IT students at the ENI passionate about system administration tools that save time for IT professionals. As part of our training, we design concrete solutions to better understand the real-world challenges of infrastructure management. Our goal: to turn repetitive technical tasks into a simple, visual, and reliable experience, accessible to both experienced administrators and teams in training.
          </p>
        </div>

        {/* Zone de la carte avec Perspective 3D */}
        <div className="mt-14 mb-10 flex justify-center items-center w-full [perspective:1200px]">
          <div 
            onMouseEnter={() => setIsPaused(true)}  
            onMouseLeave={() => setIsPaused(false)} 
            style={{ transformStyle: 'preserve-3d' }}
            className={`flex flex-col md:flex-row bg-[#03091e] border-2 border-[#1e40af] rounded-[2.5rem] p-6 max-w-7xl w-full shadow-2xl transition-all ease-in-out duration-500 ${
              rotate ? '[transform:rotateY(90deg)] opacity-0' : '[transform:rotateY(0deg)] opacity-100'
            }`}
          >
            
            {/* Section Gauche : Image de profil */}
            <div className="w-full md:w-2/5 flex justify-center items-center">
              <img 
                src={currentPerson.image} 
                alt={currentPerson.firstname} 
                className="w-full h-80 md:h-full object-cover rounded-[2rem] border-2 border-transparent"
              />
            </div>

            {/* Section Droite : Informations */}
            <div className="w-full md:w-3/5 md:pl-8 flex flex-col justify-center text-white mt-6 md:mt-0">
              <h1 className="text-3xl font-serif font-medium tracking-wide uppercase truncate">
                {currentPerson.name}
              </h1>
              <h2 className="text-2xl font-serif font-light tracking-wide mt-1 truncate">
                {currentPerson.firstname}
              </h2>

              <p className="text-xl font-mono mt-4 text-gray-300">
                IM : {currentPerson.im || "N/A"}
              </p>

              {/* Liste des réseaux / contacts */}
              <div className="mt-6 space-y-3">
                
                {/* Email */}
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-1.5 rounded-full flex items-center justify-center flex-shrink-0">
                    <EmailIcon className="text-red-600 text-sm" fontSize="small" />
                  </div>
                  <div className="flex-1 border border-gray-700 bg-[#061033] px-4 py-2 rounded-xl text-sm font-mono truncate">
                    {currentPerson.email || "Non renseigné"}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-1.5 rounded-full flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="text-green-500 text-sm" fontSize="small" />
                  </div>
                  <div className="flex-1 border border-gray-700 bg-[#061033] px-4 py-2 rounded-xl text-sm font-mono tracking-widest truncate">
                    {currentPerson.phone || "Non renseigné"}
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-1.5 rounded-full flex items-center justify-center flex-shrink-0">
                    <LinkedInIcon className="text-blue-700 text-sm" fontSize="small" />
                  </div>
                  <div className="flex-1 border border-gray-700 bg-[#061033] px-4 py-2 rounded-xl text-sm font-sans truncate">
                    {currentPerson.linkedin || "Non renseigné"}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default About;