document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');

    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('custom-cursor-follower');

    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    let mouseIsDown = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    const interactiveElements = document.querySelectorAll('button, a, .hover-glow, .clickable');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover');
        });
    });
    const animateCursor = () => {
        if (document.visibilityState === 'hidden') {
            requestAnimationFrame(animateCursor);
            return;
        }

        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        const fdx = mouseX - followerX;
        const fdy = mouseY - followerY;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        if (Math.abs(fdx) > 0.1 || Math.abs(fdy) > 0.1) {
            followerX += fdx * 0.1;
            followerY += fdy * 0.1;
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }

        requestAnimationFrame(animateCursor);
    };

    animateCursor();
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#9333ea", "#a855f7", "#ffffff", "#c084fc"]
            },
            shape: {
                type: ["circle"],
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#9333ea",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "bubble"
                },
                onclick: {
                    enable: false,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.6
                    }
                },
                bubble: {
                    distance: 200,
                    size: 5,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: false
    });
    const enterButton = document.getElementById('enter-button');
    const entryScreen = document.getElementById('entry-screen');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggle-music');
    const musicStatus = document.getElementById('music-status');
    const musicIcon = document.getElementById('music-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const musicVisualizer = document.getElementById('music-visualizer');
    const lyricElement = document.getElementById('current-lyric');
    if (!enterButton || !entryScreen || !mainContent) {
        console.error('critical elements not found');
        if (mainContent) {
            mainContent.classList.remove('hidden');
        }
        return;
    }
    enterButton.addEventListener('click', () => {
        entryScreen.style.opacity = '0';
        setTimeout(() => {
            entryScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.display = 'flex';
            mainContent.classList.add('fade-in');
            if (backgroundMusic) {
                backgroundMusic.volume = 0.25;
                backgroundMusic.play().catch(err => {
                    console.warn('Music could not be played automatically:', err);
                });
                if (typeof initializeLyrics === 'function') {
                    initializeLyrics();
                }
            }

            if (toggleMusicBtn) {
                updateMusicUI(true);
            }
            const leftPanel = document.querySelector('#main-content > div > div:first-child');
            const rightPanel = document.querySelector('#main-content > div > div:last-child');

            if (leftPanel) {
                leftPanel.style.opacity = '0';
                leftPanel.style.transform = 'translateY(20px)';
                leftPanel.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                setTimeout(() => {
                    leftPanel.style.opacity = '1';
                    leftPanel.style.transform = 'translateY(0)';
                }, 100);
            }

            if (rightPanel) {
                const rightPanelChildren = rightPanel.children;
                Array.from(rightPanelChildren).forEach((panel, index) => {
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(20px)';
                    panel.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                    setTimeout(() => {
                        panel.style.opacity = '1';
                        panel.style.transform = 'translateY(0)';
                    }, 200 + (index * 150));
                });
            }
            setTimeout(() => {
                if (typeof initializeParticles === 'function') initializeParticles();
                if (typeof initializeMusic === 'function') initializeMusic();
                if (typeof initSkillIconEffects === 'function') initSkillIconEffects();
                if (typeof initTextAnimations === 'function') initTextAnimations();
            }, 500);
        }, 500);
    });
    toggleMusicBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            updateMusicUI(true);
        } else {
            backgroundMusic.pause();
            updateMusicUI(false);
        }
    });

    function updateMusicUI(isPlaying) {
        if (isPlaying) {
            musicStatus.textContent = 'playing';
            pauseIcon.classList.remove('hidden');
            musicIcon.classList.add('hidden');
            musicVisualizer.classList.add('playing');
        } else {
            musicStatus.textContent = 'paused';
            pauseIcon.classList.add('hidden');
            musicIcon.classList.remove('hidden');
            musicVisualizer.classList.remove('playing');
        }
    }
    const createRandomMovement = () => {
        const particles = document.querySelectorAll('#particles-js canvas');
        if (particles.length > 0) {
            const canvas = particles[0];
            canvas.style.transform = 'translateY(0)';
            canvas.style.transition = 'transform 10s ease-in-out';

            setInterval(() => {
                const randomY = Math.random() * 10 - 5;
                canvas.style.transform = `translateY(${randomY}px)`;
            }, 10000);
        }
    };
    setTimeout(createRandomMovement, 1000);

    function addFloatingEffect() {
        const panels = document.querySelectorAll('.bg-black\\/40');

        panels.forEach((panel, index) => {
            const delay = index * 2;
            const duration = 10 + Math.random() * 10;

            panel.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
    }

    function addSkillIconsGlow() {
        const skillIcons = document.querySelectorAll('img[src*="skillicons.dev"]');

        skillIcons.forEach((icon, index) => {
            icon.addEventListener('mouseenter', () => {
                const randomColor = `rgb(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 100 + 155)})`;
                icon.style.filter = `drop-shadow(0 0 8px ${randomColor})`;
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.filter = 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))';
            });
        });
    }

    function createBackgroundShift() {
        const body = document.body;
        let hue = 270;
        let isVisible = true;

        document.addEventListener('visibilitychange', () => {
            isVisible = document.visibilityState === 'visible';
        });

        setInterval(() => {
            if (isVisible) {
                hue = (hue + 0.5) % 360;
                const subtle = `radial-gradient(circle at 50% 50%, rgba(${Math.sin(hue/30) * 20 + 10}, 0, ${Math.cos(hue/30) * 20 + 20}, 0.03), rgba(0, 0, 0, 0))`;
                body.style.backgroundImage = subtle;
            }
        }, 500);
    }

    createBackgroundShift();
    initializeParticles();
    initializeMusic();
    initSkillIconEffects();
    initTextAnimations();

    function initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ["#9333ea", "#a855f7", "#ffffff", "#c084fc"]
                    },
                    shape: {
                        type: ["circle"],
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.5,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 30,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#a855f7",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: false,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.8
                            }
                        }
                    }
                },
                retina_detect: false
            });
        }
    }

    function initSkillIconEffects() {
        const skillIcons = document.querySelectorAll('.skills-grid i');

        skillIcons.forEach((icon, index) => {
            icon.style.animationName = 'subtlePulse';
            icon.style.animationDuration = '3s';
            icon.style.animationIterationCount = 'infinite';
            icon.style.animationDelay = `${index * 0.3}s`;
            icon.addEventListener('mouseenter', () => {
                icon.style.textShadow = '0 0 10px currentColor';
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.textShadow = '';
                icon.style.transform = '';
            });
        });
    }

    function initTextAnimations() {
        const headings = document.querySelectorAll('h2');
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.style.transition = 'all 0.5s ease';
            p.style.transitionDelay = `${index * 0.1}s`;
            p.addEventListener('mouseenter', () => {
                p.style.transform = 'translateX(5px)';
                p.style.color = '#a855f7';
            });

            p.addEventListener('mouseleave', () => {
                p.style.transform = '';
                p.style.color = '';
            });
        });
    }

    function initializeMusic() {
        const music = document.getElementById('background-music');
        const toggleBtn = document.getElementById('toggle-music');
        const musicStatus = document.getElementById('music-status');
        const musicVisualizer = document.getElementById('music-visualizer');
        const musicIcon = document.getElementById('music-icon');
        const pauseIcon = document.getElementById('pause-icon');
        while (musicVisualizer.firstChild) {
            musicVisualizer.removeChild(musicVisualizer.firstChild);
        }
        for (let i = 0; i < 3; i++) {
            const bar = document.createElement('div');
            bar.className = 'music-bar';
            musicVisualizer.appendChild(bar);
        }
        if (music.paused) {
            musicIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        } else {
            musicIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }
        toggleBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play()
                    .then(() => {
                        updateMusicUI(true);
                        if (!window.lyricsInitialized && typeof initializeLyrics === 'function') {
                            initializeLyrics();
                            window.lyricsInitialized = true;
                        } else {
                            const lyricElement = document.getElementById('current-lyric');
                            if (lyricElement) {
                                lyricElement.style.opacity = 1;
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error playing music:', error);
                    });
            } else {
                music.pause();
                updateMusicUI(false);
                const lyricElement = document.getElementById('current-lyric');
                if (lyricElement) {
                    lyricElement.style.opacity = 0.5;
                }
            }
        });

        function updateMusicUI(isPlaying) {
            if (isPlaying) {
                musicStatus.textContent = 'playing';
                musicVisualizer.classList.add('playing');
                musicIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                musicStatus.textContent = 'paused';
                musicVisualizer.classList.remove('playing');
                musicIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        }
        music.addEventListener('play', () => {
            updateMusicUI(true);
        });

        music.addEventListener('pause', () => {
            updateMusicUI(false);
        });
    }

    function initializeLyrics() {
        console.log("initializing lyrics");
        const lyricsText = `[00:00.00]swear to god by twikipedia
  [00:03.26]going through my bands, i swear, i swear, i swear to god
  [00:05.89]i can't tell the even from the odd, it's gettin' hard
  [00:08.51]lookin' at the stars, i take the ceiling off my car
  [00:11.09]one that's makin' fun of me, they drive a push to start
  [00:13.39](c-c-c-c-c-cuff your chick, it's the gang)
  [00:15.88](yeah, pl-pl-plugg, yeah, yeah, yeah)
  [00:21.05]i been tryna get out of the picture
  [00:23.36]i heard you mad, because my pockets getting bigger (yeah)
  [00:26.98]and you can't stick to the scripture (ha)
  [00:29.41]but i guess that we can't all be winners
  [00:32.13]i'll—i'll bring a bag home before dinner (yeah)
  [00:34.76]if they're watchin', then i swear i'm not a sinner
  [00:37.39]bitch, i'm not a babysitter, i can't listen to these kids
  [00:40.17]you complain about my voice, so we gon' put him in the mix
  [00:42.94]and they up in my dms 'cause they ain't heard no shit like this
  [00:45.89]before, i guess they want some more
  [00:48.60]i'm tryna have a chat
  [00:51.36]to the people that be copyin', you can't run away with that
  [00:53.99]i, i can't double back
  [00:57.17]say that i might get you, but it's not like that
  [00:59.28]what you do in seven days (ho-ho-holy shit)
  [01:00.68]i'ma do in twenty-four (pl-plugg) hours in a fuckin' day
  [01:03.45]i can't waste time any more
  [01:04.85]if you hear a fuckin' noise, know we knockin' down your door
  [01:07.62]yeah, i'm tryna see some brains (spreaded all around the floor)
  [01:10.75]and i heard you like to talk about some shit that didn't happen
  [01:13.71]y-y-you say you love action, but you're really passive
  [01:16.48]yeah, not good at math, but know a lot about substraction
  [01:19.58]i'm the one that's adding though-ough, today
  [01:22.22]going through my bands, i swear, i swear, i swear to god
  [01:24.95]i can't tell the even from the odd, it's gettin' hard
  [01:27.77]lookin' at the stars, i take the ceiling off my car
  [01:30.59]one that's makin' fun of me, they drive a push to start
  [01:32.65]go-go-going through my bands, i swear, i swear, i swear to god
  [01:36.17]i can't tell the even from the odd, it's gettin' hard
  [01:38.89]lookin' at the stars, i take the ceiling off my car
  [01:41.65]one that's makin' fun of me, they drive a push to start
  [01:44.39](yeah)
  [01:45.19]had to turn it up (okay, go)
  [01:47.30]walk in with my family in the club
  [01:50.41]no, we don't give a fuck (yuh)
  [01:52.19]we're too busy gettin' money up
  [01:55.99]and they tryna fuck it up
  [01:57.68]i know lots of people that be tryna fuck it up
  [02:01.86]i don't want your love
  [02:03.40]hop up on the stage and they all go nuts
  [02:06.53]tryna see it, i'm just tryna see it
  [02:08.97]i'm just tryna see you, make sure that we're even
  [02:11.69]got a lot up on my mind, i want you to see it
  [02:14.37]double text me every time, swear to god y'all geekin'
  [02:16.96]okay, like, go, go, go, go
  [02:18.22]i don't wanna take no photos
  [02:19.68]i'm wearin' chrome to the face though
  [02:21.00]i'm takin' four, four, four, fours
  [02:22.40]talking that shit, know he gon' miss
  [02:23.76]i hit up saks, bitch, i'm with lei
  [02:25.21]going out sad, go out sad for a bitch
  [02:26.57]can't go out sad, walk with a stick (okay, yeah)
  [02:29.20]i could never lack right now
  [02:31.64]do it all to leave this town
  [02:34.28]i keep walkin' upside down
  [02:36.87]eyes on me when you're around
  [02:39.36]because i can't tell the difference between fake and real
  [02:41.88]if you tryna fuck me up, you lose your appeal
  [02:44.89]bro, don't tell me how to feel
  [02:47.57]tell apart the fake from you`;
        const lyrics = [];
        const lines = lyricsText.split('\n');

        lines.forEach(line => {
            const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
            if (match) {
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const milliseconds = parseInt(match[3]);
                const text = match[4].trim();

                const timeInSeconds = minutes * 60 + seconds + milliseconds / 100;
                lyrics.push({
                    time: timeInSeconds,
                    text: text
                });
            }
        });
        lyrics.sort((a, b) => a.time - b.time);

        const music = document.getElementById('background-music');
        const lyricElement = document.getElementById('current-lyric');

        if (!lyricElement) {
            console.error("lyrics element not found");
            return;
        }
        const lyricsContainer = document.getElementById('lyrics-container');
        if (lyricsContainer) {
            lyricsContainer.style.display = 'block';
        }

        let currentLyricIndex = 0;
        let hasUpdatedInitialLyric = false;

        function setInitialLyric() {
            if (music) {
                const currentTime = music.currentTime;
                for (let i = lyrics.length - 1; i >= 0; i--) {
                    if (currentTime >= lyrics[i].time) {
                        currentLyricIndex = i;
                        lyricElement.textContent = lyrics[i].text;
                        lyricElement.style.opacity = music.paused ? 0.5 : 1;
                        hasUpdatedInitialLyric = true;
                        break;
                    }
                }
                if (!hasUpdatedInitialLyric && lyrics.length > 0) {
                    lyricElement.textContent = lyrics[0].text;
                    lyricElement.style.opacity = music.paused ? 0.5 : 1;
                    hasUpdatedInitialLyric = true;
                }
            }
        }
        setInitialLyric();

        function updateLyrics() {
            if (music) {
                const currentTime = music.currentTime;
                for (let i = lyrics.length - 1; i >= 0; i--) {
                    if (currentTime >= lyrics[i].time) {
                        if (currentLyricIndex !== i) {
                            currentLyricIndex = i;
                            lyricElement.textContent = lyrics[i].text;
                            lyricElement.style.opacity = music.paused ? 0.5 : 1;
                        }
                        break;
                    }
                }
            }

            requestAnimationFrame(updateLyrics);
        }
        updateLyrics();
        music.addEventListener('play', () => {
            lyricElement.style.opacity = 1;
            if (!hasUpdatedInitialLyric) {
                setInitialLyric();
            }
        });

        music.addEventListener('pause', () => {
            lyricElement.style.opacity = 0.5;
            if (!hasUpdatedInitialLyric) {
                setInitialLyric();
            }
        });
        music.addEventListener('seeked', () => {
            setInitialLyric();
        });

        console.log("lyrics initialized successfully");
    }
});

let canvas = document.getElementById('playground-canvas');
let ctx;
let animationId = null;
let currentEffect = null;
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseVelX = 0;
let mouseVelY = 0;

function togglePlayground() {
    console.log('toggled playground', window.playgroundActive, '→', !window.playgroundActive);
    window.playgroundActive = !window.playgroundActive;

    const shutdownBtn = document.getElementById('shutdown-btn');
    if (window.playgroundActive) {
        shutdownBtn.className = '';
        shutdownBtn.className = 'absolute top-2 left-2 z-20 p-2 text-purple-400 hover:text-purple-300 transition-all';
        document.querySelectorAll('.playground-btn').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
        });
        if (currentEffect) {
            if (window[currentEffect + 'Effect']) {
                window[currentEffect + 'Effect']();
            }
        } else {
            const placeholder = document.getElementById('playground-placeholder');
            if (placeholder) placeholder.classList.remove('hidden');
        }
    } else {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        shutdownBtn.className = '';
        shutdownBtn.className = 'absolute top-2 left-2 z-20 p-2 text-red-400 hover:text-purple-300 transition-all';
        document.querySelectorAll('.playground-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const placeholder = document.getElementById('playground-placeholder');
        if (placeholder) placeholder.classList.add('hidden');
        this.flowParticles = null;
        this.nebulaParticles = null;
    }
}

function initPlayground() {
    canvas = document.getElementById('playground-canvas');
    if (!canvas) {
        console.error('Playground canvas not found');
        return;
    }

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        mouseVelX = mouseX - lastMouseX;
        mouseVelY = mouseY - lastMouseY;
    });
    canvas.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
        mouseVelX = 0;
        mouseVelY = 0;
        lastMouseX = -1000;
        lastMouseY = -1000;
    });
    
    canvas.addEventListener('mousedown', () => {
        mouseIsDown = true;
    });
    
    canvas.addEventListener('mouseup', () => {
        mouseIsDown = false;
    });
    
    canvas.addEventListener('mouseout', () => {
        mouseIsDown = false;
    });
    
    const placeholder = document.getElementById('playground-placeholder');
    if (placeholder) {
        placeholder.classList.remove('hidden');
    }
    window.playgroundActive = true;

    if (!window.shutdownButtonInitialized) {
        const shutdownBtn = document.getElementById('shutdown-btn');
        if (shutdownBtn) {
            shutdownBtn.addEventListener('click', togglePlayground);
            window.shutdownButtonInitialized = true;
        }
    }

    document.querySelectorAll('.playground-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!window.playgroundActive) return;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            currentEffect = btn.dataset.effect;
            document.querySelectorAll('.playground-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (placeholder) placeholder.classList.add('hidden');
            window[currentEffect + 'Effect']();
        });
    });
}

let playgroundInitialized = false;
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    if (window.getComputedStyle(mainContent).display === 'flex' && !playgroundInitialized) {
        initPlayground();
        playgroundInitialized = true;
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (window.getComputedStyle(mutation.target).display === 'flex' && !playgroundInitialized) {
                setTimeout(() => {
                    initPlayground();
                    playgroundInitialized = true;
                }, 100);
                observer.disconnect();
            }
        });
    });

    observer.observe(mainContent, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });
});

function resizeCanvas() {
    if (!canvas) return;

    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    if (currentEffect && window[currentEffect + 'Effect']) {
        window[currentEffect + 'Effect']();
    }
}

const effectSettings = {
    noise: {
        cellSize: {
            min: 1,
            max: 30,
            value: 8,
            step: 0.5,
            label: 'cell size'
        },
        fadeSpeed: {
            min: 0.01,
            max: 0.3,
            value: 0.1,
            step: 0.01,
            label: 'fade speed'
        },
        colorSpeed: {
            min: 50,
            max: 200,
            value: 100,
            step: 10,
            label: 'color speed'
        }
    },
    flow: {
        particleCount: {
            min: 100,
            max: 2000,
            value: 1000,
            step: 100,
            label: 'particle count'
        },
        forceRadius: {
            min: 50,
            max: 300,
            value: 200,
            step: 10,
            label: 'force radius'
        },
        particleSpeed: {
            min: 0.1,
            max: 1,
            value: 0.2,
            step: 0.1,
            label: 'particle speed'
        }
    },
    nebula: {
        particleCount: {
            min: 20,
            max: 200,
            value: 100,
            step: 10,
            label: 'cloud count'
        },
        cloudSize: {
            min: 20,
            max: 100,
            value: 50,
            step: 5,
            label: 'cloud size'
        },
        moveSpeed: {
            min: 0.1,
            max: 2,
            value: 0.5,
            step: 0.1,
            label: 'movement speed'
        }
    },
    magnetic: {
        particleCount: {
            min: 50,
            max: 500,
            value: 200,
            step: 10,
            label: 'particle count'
        },
        attractionForce: {
            min: 0.1,
            max: 2,
            value: 0.5,
            step: 0.1,
            label: 'attraction force'
        },
        repulsionForce: {
            min: 1,
            max: 10,
            value: 5,
            step: 0.5,
            label: 'repulsion force'
        },
        repulsionRange: {
            min: 50,
            max: 300,
            value: 150,
            step: 10,
            label: 'repulsion range'
        },
        particleSize: {
            min: 1,
            max: 8,
            value: 3,
            step: 0.5,
            label: 'particle size'
        }
    },
    esp: {
        boxSize: {
            min: 20,
            max: 100,
            value: 40,
            step: 5,
            label: 'target box size'
        },
        lineWidth: {
            min: 0.5,
            max: 3,
            value: 1.5,
            step: 0.5,
            label: 'line thickness'
        },
        opacity: {
            min: 0.2,
            max: 1,
            value: 0.8,
            step: 0.1,
            label: 'overlay opacity'
        },
        tracers: {
            min: 0,
            max: 1,
            value: 0,
            step: 1,
            label: 'show tracers'
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const effectSettingsDiv = document.getElementById('effect-settings');
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
        updateSettingsPanel(currentEffect);
    });
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsPanel.classList.add('hidden');
        }
    });

    function updateSettingsPanel(effect) {
        if (!effect || !effectSettings[effect]) return;

        effectSettingsDiv.innerHTML = '';
        Object.entries(effectSettings[effect]).forEach(([key, setting]) => {
            const settingContainer = document.createElement('div');
            settingContainer.className = 'mb-4';

            const label = document.createElement('label');
            label.className = 'block text-sm text-purple-400 mb-2';
            label.textContent = setting.label;

            const valueDisplay = document.createElement('div');
            valueDisplay.className = 'text-xs text-gray-400 mb-1';
            valueDisplay.textContent = setting.value;

            const input = document.createElement('input');
            input.type = 'range';
            input.min = setting.min;
            input.max = setting.max;
            input.step = setting.step;
            input.value = setting.value;
            input.className = 'w-full h-2 bg-purple-900/30 rounded-lg appearance-none cursor-pointer';

            input.addEventListener('input', (e) => {
                setting.value = parseFloat(e.target.value);
                valueDisplay.textContent = setting.value;
                if (currentEffect === effect) {
                    restartEffect();
                }
            });

            settingContainer.appendChild(label);
            settingContainer.appendChild(valueDisplay);
            settingContainer.appendChild(input);
            effectSettingsDiv.appendChild(settingContainer);
        });
    }

    function restartEffect() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (currentEffect && window[currentEffect + 'Effect']) {
            window[currentEffect + 'Effect']();
        }
    }
    document.querySelectorAll('.playground-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentEffect = btn.dataset.effect;
            updateSettingsPanel(currentEffect);
        });
    });
});

function noiseEffect() {
    window.currentEffect = 'noise';

    const time = Date.now() * 0.001;
    const settings = effectSettings.noise;
    ctx.fillStyle = `rgba(0, 0, 0, ${settings.fadeSpeed.value})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellSize = settings.cellSize.value;
    const skipFactor = 2;
    const cols = Math.ceil(canvas.width / cellSize);
    const rows = Math.ceil(canvas.height / cellSize);

    const velocityInfluence = (Math.abs(mouseVelX) + Math.abs(mouseVelY)) * 0.1;

    for (let i = 0; i < cols; i += skipFactor) {
        for (let j = 0; j < rows; j += skipFactor) {
            const x = i * cellSize;
            const y = j * cellSize;

            const dx = x - mouseX;
            const dy = y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const noise = Math.sin(x * 0.02 + time + velocityInfluence) +
                Math.cos(y * 0.02 - time + velocityInfluence);
            const mouseInfluence = Math.max(0, 1 - distance / 200) * Math.sin(time * 5) * 20;

            const value = (noise + mouseInfluence + velocityInfluence) * 0.5;
            const hue = (value * 50 + time * settings.colorSpeed.value) % 360;

            ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.5)`;
            ctx.fillRect(x, y, cellSize * skipFactor - 1, cellSize * skipFactor - 1);
        }
    }

    if (currentEffect === 'noise' && window.playgroundActive) {
        animationId = requestAnimationFrame(noiseEffect);
    }
}

function flowEffect() {
    window.currentEffect = 'flow';

    if (!window.playgroundActive || document.visibilityState === 'hidden') {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        return;
    }

    const time = Date.now() * 0.001;
    const settings = effectSettings.flow;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const maxParticles = Math.min(settings.particleCount.value, 1000);

    if (!this.flowParticles || this.flowParticles.length !== maxParticles) {
        this.flowParticles = Array.from({
            length: maxParticles
        }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: 0,
            vy: 0,
            uniqueOffset: Math.random() * Math.PI * 2
        }));
    }

    const forceRadius = settings.forceRadius.value;
    const maxForce = settings.particleSpeed.value * 10;
    const updateRate = 2;

    for (let i = 0; i < this.flowParticles.length; i += updateRate) {
        const particle = this.flowParticles[i];

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < forceRadius) {
            const force = (1 - dist / forceRadius) * maxForce;
            particle.vx += (dx / dist) * force + mouseVelX * 0.1;
            particle.vy += (dy / dist) * force + mouseVelY * 0.1;
        }

        const randomJitter = (Math.random() - 0.5) * 0.2;

        const angle = Math.sin(particle.x * 0.01 + time + particle.uniqueOffset) *
            Math.cos(particle.y * 0.01 + particle.uniqueOffset);

        particle.vx += Math.cos(angle) * settings.particleSpeed.value + randomJitter;
        particle.vy += Math.sin(angle) * settings.particleSpeed.value + randomJitter;

        particle.vx *= 0.95;
        particle.vy *= 0.95;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const hue = (time * 50 + speed * 50) % 360;
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${0.3 + speed * 0.1})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1 + speed * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }

    if (currentEffect === 'flow' && window.playgroundActive) {
        animationId = requestAnimationFrame(flowEffect);
    }
}

function nebulaEffect() {
    window.currentEffect = 'nebula';

    if (!window.playgroundActive || document.visibilityState === 'hidden') {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        return;
    }

    const time = Date.now() * 0.001;
    const settings = effectSettings.nebula;
    const maxParticles = settings.particleCount.value;

    if (!this.lastCloudSize) {
        this.lastCloudSize = settings.cloudSize.value;
    }

    const cloudSizeChanged = this.lastCloudSize !== settings.cloudSize.value;

    if (!this.nebulaParticles || this.nebulaParticles.length !== maxParticles || cloudSizeChanged) {
        this.nebulaParticles = Array.from({
            length: maxParticles
        }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + settings.cloudSize.value,
            hue: Math.random() * 60 + 240,
            offset: Math.random() * Math.PI * 2
        }));

        this.lastCloudSize = settings.cloudSize.value;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mouseRadius = 200;

    for (let i = 0; i < this.nebulaParticles.length; i++) {
        const particle = this.nebulaParticles[i];

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        particle.x += Math.sin(time + particle.offset) * settings.moveSpeed.value;
        particle.y += Math.cos(time + particle.offset) * settings.moveSpeed.value;

        if (dist < mouseRadius) {
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * (mouseRadius - dist) * 0.01;
            particle.y += Math.sin(angle) * (mouseRadius - dist) * 0.01;
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        const grd = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
        );

        const hueShift = Math.sin(time + particle.offset) * 20;
        grd.addColorStop(0, `hsla(${particle.hue + hueShift}, 100%, 60%, 0.2)`);
        grd.addColorStop(1, 'transparent');

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }

    if (currentEffect === 'nebula' && window.playgroundActive) {
        animationId = requestAnimationFrame(nebulaEffect);
    }
}

function magneticEffect() {
    window.currentEffect = 'magnetic';
    
    if (!window.playgroundActive || document.visibilityState === 'hidden') {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        return;
    }
    
    const time = Date.now() * 0.001;
    const settings = effectSettings.magnetic;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (!this.magneticParticles || this.magneticParticles.length !== settings.particleCount.value) {
        this.magneticParticles = Array.from({ length: settings.particleCount.value }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + settings.particleSize.value,
            color: Math.random() * 360,
            pulsePhase: Math.random() * Math.PI * 2
        }));
    }
    
    const isClicking = (typeof mouseIsDown !== 'undefined') ? mouseIsDown : false;
    
    this.magneticParticles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (isClicking && distance < settings.repulsionRange.value) {
            const repulsionForce = settings.repulsionForce.value * (1 - distance / settings.repulsionRange.value);
            particle.vx -= dx / distance * repulsionForce;
            particle.vy -= dy / distance * repulsionForce;
            
            particle.vx += (Math.random() - 0.5) * 0.5;
            particle.vy += (Math.random() - 0.5) * 0.5;
        } else if (distance > 10) {
            const attractionForce = settings.attractionForce.value * 0.1;
            particle.vx += dx / distance * attractionForce;
            particle.vy += dy / distance * attractionForce;
        }
        
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const hue = (particle.color + time * 20) % 360;
        const saturation = 80 + Math.sin(time + particle.pulsePhase) * 20;
        const luminance = 40 + Math.sin(time * 0.5 + particle.pulsePhase) * 10;
        const alpha = Math.min(0.8, 0.3 + speed * 0.5);
        
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${luminance}%, ${alpha})`;
        ctx.beginPath();
        
        if (particle.size > settings.particleSize.value + 1) {
            const outerRadius = particle.size;
            const innerRadius = particle.size * 0.4;
            const spikes = 5;
            let rot = (time + particle.pulsePhase) * 0.5;
            let x = particle.x;
            let y = particle.y;
            let step = Math.PI / spikes;
            
            for (let i = 0; i < spikes * 2; i++) {
                let radius = i % 2 === 0 ? outerRadius : innerRadius;
                let x2 = x + Math.cos(rot) * radius;
                let y2 = y + Math.sin(rot) * radius;
                if (i === 0) {
                    ctx.moveTo(x2, y2);
                } else {
                    ctx.lineTo(x2, y2);
                }
                rot += step;
            }
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        if (isClicking && distance < settings.repulsionRange.value) {
            const glowSize = particle.size * 2;
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, glowSize
            );
            gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${luminance}%, 0.5)`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    if (isClicking) {
        const pulseSize = settings.repulsionRange.value * (0.8 + Math.sin(time * 5) * 0.2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 + Math.sin(time * 10) * 0.1})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, pulseSize, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    if (currentEffect === 'magnetic' && window.playgroundActive) {
        animationId = requestAnimationFrame(magneticEffect);
    }
}

function espEffect() {
    window.currentEffect = 'esp';

    if (!window.playgroundActive || document.visibilityState === 'hidden') {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        return;
    }

    const settings = effectSettings.esp;
    let frameCount = 0;
    let lastFrameTime = performance.now();
    let fps = 0;
    let isMoving = false;
    let lastX = mouseX;
    let lastY = mouseY;
    let movementTimer = null;
    const ipAddress = "192.168.1.1";
    const GREEN_COLOR = "rgb(0, 255, 0)";
    const GREEN_COLOR_TRANSPARENT = "rgba(0, 255, 0, 0.8)";

    function animate() {
        if (!window.playgroundActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frameCount++;
        const now = performance.now();
        if (now - lastFrameTime >= 1000) {
            fps = Math.round((frameCount * 1000) / (now - lastFrameTime));
            frameCount = 0;
            lastFrameTime = now;
        }
        if (Math.abs(mouseX - lastX) > 0.5 || Math.abs(mouseY - lastY) > 0.5) {
            isMoving = true;
            clearTimeout(movementTimer);
            movementTimer = setTimeout(() => {
                isMoving = false;
            }, 500);
        }
        lastX = mouseX;
        lastY = mouseY;
        const boxSize = settings.boxSize.value;
        const lineWidth = settings.lineWidth.value;
        const opacity = settings.opacity.value;
        const showTracers = settings.tracers.value === 1;
        const espColor = `rgba(0, 255, 0, ${opacity})`;
        if (showTracers) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = GREEN_COLOR_TRANSPARENT;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
        ctx.strokeStyle = espColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.rect(mouseX - boxSize / 2, mouseY - boxSize / 2, boxSize, boxSize);
        ctx.stroke();
        const panelWidth = 150;
        const panelHeight = 110;
        let panelX, panelY;
        if (mouseX + boxSize / 2 + 10 + panelWidth < canvas.width) {
            panelX = mouseX + boxSize / 2 + 10;
        } else {
            panelX = mouseX - boxSize / 2 - 10 - panelWidth;
        }

        if (mouseY + panelHeight < canvas.height) {
            panelY = mouseY;
        } else {
            panelY = canvas.height - panelHeight;
        }
        ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
        ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
        ctx.strokeStyle = GREEN_COLOR_TRANSPARENT;
        ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
        ctx.fillStyle = GREEN_COLOR;
        ctx.font = '12px monospace';
        ctx.fillText(`TARGET: cursor`, panelX + 10, panelY + 20);
        ctx.fillText(`POS: ${Math.round(mouseX)}, ${Math.round(mouseY)}`, panelX + 10, panelY + 40);
        ctx.fillText(`FPS: ${fps}`, panelX + 10, panelY + 60);
        ctx.fillText(`IP: ${ipAddress}`, panelX + 10, panelY + 80);
        ctx.fillText(`STATUS: ${isMoving ? 'active' : 'inactive'}`, panelX + 10, panelY + 100);
        if (window.playgroundActive && currentEffect === 'esp') {
            animationId = requestAnimationFrame(animate);
        }
    }
    animate();
}

document.addEventListener('visibilitychange', () => {
    const isVisible = document.visibilityState === 'visible';

    if (!isVisible && window.playgroundActive && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    } else if (isVisible && window.playgroundActive && currentEffect) {
        if (window[currentEffect + 'Effect']) {
            window[currentEffect + 'Effect']();
        }
    }
});