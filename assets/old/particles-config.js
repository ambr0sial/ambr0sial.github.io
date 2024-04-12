// particles-config.js
particlesJS('particles', {
    particles: {
        number: {
            value: 100, // Increase the number of particles
            density: {
                enable: true,
                value_area: 1000 // Increase the density
            }
        },
        color: {
            value: '#c89efc'
        },
        shape: {
            type: 'star', // Change the shape of the particles
            stroke: {
                width: 0, // Remove the stroke
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            },
        },
        opacity: {
            value: 0.5, // Decrease the opacity
            random: true, // Make the opacity random
            anim: {
                enable: true, // Enable opacity animation
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3, // Increase the size of the particles
            random: true,
            anim: {
                enable: true,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: false, // Disable the lines between particles
        },
        move: {
            enable: true,
            speed: 2, // Decrease the speed of the particles
            direction: 'none',
            random: true, // Make the movement of the particles random
            straight: false,
            out_mode: 'out',
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'bubble' // Change the hover effect to 'bubble'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            bubble: { // Add bubble effect settings
                distance: 250,
                size: 8,
                duration: 2,
                opacity: 0.3,
                speed: 3
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

function redirectToAsh() {
    window.location.href = 'https://ash.ambrosial.fun';
}

const text = 'ambrosial';
let index = 0;

function writeText() {
    const typedText = document.getElementById('typed-text');
    typedText.innerText = text.slice(0, index);

    if (index < text.length) {
        index++;
        setTimeout(writeText, 100); // Call writeText every 100ms until the text is finished
    } else {
        typedText.classList.add('underline');
        document.getElementById('cursor').style.display = 'none'; // Hide the cursor when the text is finished
    }
}

writeText(); // Start the typewriter effect
