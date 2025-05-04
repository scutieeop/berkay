document.addEventListener('DOMContentLoaded', () => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-heart">❤</div>';
    document.body.appendChild(loadingOverlay);

    // Mobile detection with more reliable methods
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                    || window.innerWidth <= 768;
                    
    // Set mobile class on body for CSS targeting
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Set specific type of mobile
        if (window.innerWidth <= 480) {
            document.body.classList.add('small-mobile');
        }
        
        if (window.matchMedia("(orientation: landscape)").matches) {
            document.body.classList.add('landscape');
        }
    }
    
    // Simple feature detection for touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Add animation to stanzas on scroll
    const stanzas = document.querySelectorAll('.stanza');
    
    // Initially set stanzas to be invisible
    stanzas.forEach(stanza => {
        stanza.style.opacity = '0';
        stanza.style.transform = 'translateY(30px)';
        stanza.style.transition = 'opacity 1s ease, transform 1s ease';
    });
    
    // Function to reveal stanzas when they come into view
    function revealStanzas() {
        stanzas.forEach((stanza, index) => {
            // Get element position relative to viewport
            const rect = stanza.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Check if element is in viewport
            if (rect.top <= windowHeight * 0.85) {
                // Add delay based on index for cascade effect
                // Shorter delay on mobile for better responsiveness
                const delay = isMobile ? index * 150 : index * 300;
                setTimeout(() => {
                    stanza.style.opacity = '1';
                    stanza.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }
    
    // Call once when page loads
    revealStanzas();
    
    // Then on scroll - throttled for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                revealStanzas();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Add text highlight effect when clicking on lines
    const poemLines = document.querySelectorAll('.stanza p');
    
    poemLines.forEach(line => {
        const eventType = isTouchDevice ? 'touchend' : 'click';
        
        line.addEventListener(eventType, (e) => {
            if (isTouchDevice) {
                e.preventDefault(); // Prevent double-tap zoom on mobile
            }
            
            // Remove active class from all lines
            poemLines.forEach(p => p.classList.remove('active-line'));
            
            // Add active class to clicked line
            line.classList.add('active-line');
            
            // Add highlight style for active line
            document.head.insertAdjacentHTML('beforeend', `
                <style>
                    .active-line {
                        font-weight: bold;
                        color: var(--primary-color);
                        transform: translateX(10px) !important;
                        text-shadow: 1px 1px 1px rgba(0,0,0,0.05);
                    }
                </style>
            `);
            
            // Create small burst of petals - fewer on mobile
            const petalCount = isMobile ? 3 : 5;
            createPetalBurst(petalCount, line.getBoundingClientRect());
        });
    });
    
    // Add dynamic color based on time of day
    function updateColors() {
        const hour = new Date().getHours();
        let primaryColor, secondaryColor, bgColor;
        
        if (hour >= 5 && hour < 8) {
            // Dawn
            primaryColor = '#ff9e7a';
            secondaryColor = '#e76f51';
            bgColor = '#fef1ed';
        } else if (hour >= 8 && hour < 16) {
            // Day
            primaryColor = '#d23669';
            secondaryColor = '#a61e4d';
            bgColor = '#fef8f9';
        } else if (hour >= 16 && hour < 19) {
            // Dusk
            primaryColor = '#e76f51';
            secondaryColor = '#bc4b29';
            bgColor = '#fff0eb';
        } else {
            // Night
            primaryColor = '#7b2cbf';
            secondaryColor = '#5a189a';
            bgColor = '#f8f9fe';
        }
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--background-color', bgColor);
    }
    
    updateColors();
    
    // Flower box and image modal functionality
    const flowerBox = document.getElementById('flowerBox');
    const imageModal = document.getElementById('imageModal');
    const closeModal = document.getElementById('closeModal');
    
    // Open modal when flower box is clicked/tapped
    flowerBox.addEventListener(isTouchDevice ? 'touchend' : 'click', (e) => {
        if (isTouchDevice) {
            e.preventDefault(); // Prevent double-tap zoom
        }
        
        imageModal.classList.add('active');
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        
        // Add floating effect to the flowers when box is clicked
        document.querySelectorAll('.flower').forEach(flower => {
            flower.style.animation = 'float 3s infinite ease-in-out';
        });
        
        // Create burst of petals - reduced on mobile
        const petalCount = isMobile ? 10 : 30;
        createPetalBurst(petalCount, flowerBox.getBoundingClientRect());
    });
    
    // Close modal when close button is clicked
    closeModal.addEventListener(isTouchDevice ? 'touchend' : 'click', (e) => {
        if (isTouchDevice) {
            e.preventDefault();
        }
        
        imageModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        setTimeout(() => {
            imageModal.style.display = 'none';
        }, 400);
    });
    
    // Also close modal when clicking outside the image
    imageModal.addEventListener(isTouchDevice ? 'touchend' : 'click', (e) => {
        if (e.target === imageModal) {
            if (isTouchDevice) {
                e.preventDefault();
            }
            
            imageModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            setTimeout(() => {
                imageModal.style.display = 'none';
            }, 400);
        }
    });
    
    // Create falling petals animation
    function createFallingPetals() {
        const petalContainer = document.querySelector('.falling-petals');
        const petalColors = [
            'var(--flower-color-1)',
            'var(--flower-color-2)',
            'var(--flower-color-3)',
            'var(--flower-color-4)',
            'var(--primary-color)',
            'var(--secondary-color)'
        ];
        
        const petalShapes = ['❀', '✿', '❁', '✾', '❃', '✽', '❋', '❊', '♥'];
        
        // Create fewer petals on mobile
        const petalCount = isMobile ? 15 : 25;
        
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            const randomShape = petalShapes[Math.floor(Math.random() * petalShapes.length)];
            const randomColor = petalColors[Math.floor(Math.random() * petalColors.length)];
            
            petal.innerHTML = randomShape;
            petal.style.color = randomColor;
            petal.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
            petal.style.position = 'absolute';
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.top = '0';
            petal.style.opacity = '0';
            petal.style.animation = `fall ${Math.random() * 15 + 15}s linear forwards`;
            petal.style.animationDelay = `${Math.random() * 30}s`;
            petal.style.transform = 'rotate(0deg)';
            petal.style.zIndex = '-1';
            petal.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
            
            petalContainer.appendChild(petal);
        }
    }
    
    // Create a burst of petals from a specific position
    function createPetalBurst(count, rect = null) {
        const petalContainer = document.querySelector('.falling-petals');
        const petalColors = [
            'var(--flower-color-1)',
            'var(--flower-color-2)',
            'var(--flower-color-3)',
            'var(--flower-color-4)'
        ];
        
        const petalShapes = ['❀', '✿', '❁', '✾', '♥'];
        
        // Get the position - either from provided rect or use center of screen
        let centerX, centerY;
        
        if (rect) {
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
        } else {
            centerX = window.innerWidth / 2;
            centerY = window.innerHeight / 2;
        }
        
        // Create petals
        for (let i = 0; i < count; i++) {
            const petal = document.createElement('div');
            const randomShape = petalShapes[Math.floor(Math.random() * petalShapes.length)];
            const randomColor = petalColors[Math.floor(Math.random() * petalColors.length)];
            
            // Random position near the center point
            const randomAngle = Math.random() * Math.PI * 2;
            const randomDistance = Math.random() * 100;
            const x = centerX + Math.cos(randomAngle) * randomDistance;
            const y = centerY + Math.sin(randomAngle) * randomDistance;
            
            petal.innerHTML = randomShape;
            petal.style.color = randomColor;
            petal.style.position = 'absolute';
            petal.style.left = `${x}px`;
            petal.style.top = `${y}px`;
            petal.style.fontSize = `${Math.random() * 1 + 1}rem`;
            petal.style.opacity = '0';
            petal.style.zIndex = '100';
            petal.style.transform = 'scale(0.2)';
            petal.style.transition = 'all 0.5s ease-out';
            petal.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
            
            petalContainer.appendChild(petal);
            
            // Animate outward - shorter animations on mobile
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const duration = isMobile ? 0.8 + Math.random() : 1 + Math.random() * 2;
                
                petal.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1) rotate(${Math.random() * 360}deg)`;
                petal.style.opacity = '0.8';
                petal.style.transition = `all ${duration}s ease-out`;
                
                // Remove after animation
                setTimeout(() => {
                    petal.style.opacity = '0';
                    setTimeout(() => {
                        petal.remove();
                    }, 500);
                }, duration * 500);
            }, 10);
        }
    }
    
    // Create sparkling cursor effect - desktop only
    if (!isMobile) {
        const sparkle = document.querySelector('.sparkling-cursor');
        let lastX = 0;
        let lastY = 0;
        let sparkleTimeout;
        
        document.addEventListener('mousemove', (e) => {
            const distanceMoved = Math.sqrt(
                Math.pow(e.clientX - lastX, 2) + 
                Math.pow(e.clientY - lastY, 2)
            );
            
            // Only update sparkle if mouse moved significantly
            if (distanceMoved > 5) {
                lastX = e.clientX;
                lastY = e.clientY;
                
                // Position sparkle at cursor
                sparkle.style.left = `${e.clientX - 10}px`;
                sparkle.style.top = `${e.clientY - 10}px`;
                sparkle.style.opacity = '1';
                
                // Create size based on movement speed (capped)
                const size = Math.min(distanceMoved / 2, 30);
                sparkle.style.width = `${size}px`;
                sparkle.style.height = `${size}px`;
                
                // Clear previous timeout
                clearTimeout(sparkleTimeout);
                
                // Fade out after a while
                sparkleTimeout = setTimeout(() => {
                    sparkle.style.opacity = '0';
                }, 100);
                
                // Add trailing particles for faster movements
                if (distanceMoved > 20 && Math.random() > 0.7) {
                    createGlitter(e.clientX, e.clientY, 1);
                }
            }
        });
    }
    
    // Create glitter effect - desktop only
    function createGlitter(x, y, count = 1) {
        if (isMobile) return; // Skip on mobile
        
        const glitterContainer = document.querySelector('.glitter-effect');
        
        for (let i = 0; i < count; i++) {
            const glitter = document.createElement('div');
            glitter.className = 'glitter';
            
            // Randomize position slightly around the given coordinates
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;
            
            glitter.style.left = `${x + offsetX}px`;
            glitter.style.top = `${y + offsetY}px`;
            
            // Randomize size
            const size = Math.random() * 5 + 3;
            glitter.style.width = `${size}px`;
            glitter.style.height = `${size}px`;
            
            // Randomize color
            const colors = ['rgba(255,255,255,0.9)', 'rgba(255,183,197,0.9)', 'rgba(210,54,105,0.8)'];
            glitter.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            glitterContainer.appendChild(glitter);
            
            // Self-destruct after animation completes
            setTimeout(() => {
                glitter.remove();
            }, 3000);
        }
    }
    
    // Add glitter effect for poem container on hover/scroll - desktop only
    if (!isMobile) {
        const poemContainer = document.querySelector('.poem-container');
        
        // Generate random glitter throughout the poem container 
        function addRandomGlitter() {
            const rect = poemContainer.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            createGlitter(x, y, 1);
        }
        
        // Add glitter when scrolling through poem
        window.addEventListener('scroll', () => {
            if (Math.random() > 0.9) {
                addRandomGlitter();
            }
        });
        
        // Add random glitter every few seconds
        setInterval(() => {
            if (Math.random() > 0.7) {
                addRandomGlitter();
            }
        }, 2000);
        
        // Add hover glitter to flower box
        flowerBox.addEventListener('mouseover', () => {
            const rect = flowerBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            createGlitter(centerX, centerY, 3);
        });
    }
    
    // Animated floating hearts
    function initFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts-container');
        
        // Keep the number of hearts reasonable on mobile
        const maxHearts = isMobile ? 5 : 15;
        
        // Add more hearts dynamically
        for (let i = 0; i < maxHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤';
            heart.style.fontSize = `${Math.random() * 1 + 0.8}rem`;
            heart.style.left = `${Math.random() * 90 + 5}%`;
            heart.style.top = `${Math.random() * 90 + 5}%`;
            heart.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            
            // Slower animations on mobile for better performance
            if (isMobile) {
                heart.style.animationDelay = `${Math.random() * 6}s`;
                heart.style.animationDuration = `${Math.random() * 3 + 12}s`;
            } else {
                heart.style.animationDelay = `${Math.random() * 12}s`;
                heart.style.animationDuration = `${Math.random() * 6 + 12}s`;
            }
            
            heartsContainer.appendChild(heart);
        }
    }
    
    // Initialize effects
    initFloatingHearts();
    createFallingPetals();
    
    // Double tap protection for mobile
    if (isTouchDevice) {
        // Fix for 300ms delay on mobile devices
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = new Date().getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', () => {
        // Update orientation classes
        if (window.matchMedia("(orientation: landscape)").matches) {
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        } else {
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        }
        
        // Wait for orientation change to complete
        setTimeout(() => {
            // Refresh layout calculations
            revealStanzas();
            
            // Re-center modal if open
            if (imageModal.classList.contains('active')) {
                const modalImage = document.querySelector('.modal-image');
                if (modalImage) {
                    modalImage.style.maxHeight = window.innerHeight * 0.8 + 'px';
                }
            }
        }, 300);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Check if mobile status changed
        const nowMobile = window.innerWidth <= 768;
        if (nowMobile !== isMobile) {
            location.reload(); // Reload page if switching between mobile/desktop
        }
        
        // Throttle the resize event
        if (!window.resizeThrottled) {
            window.resizeThrottled = true;
            setTimeout(() => {
                // Refresh layout calculations
                revealStanzas();
                window.resizeThrottled = false;
            }, 200);
        }
    });
    
    // Check if image is loaded
    const zumraImage = document.getElementById('zumraImage');
    
    // Function to remove loading overlay
    const removeLoading = () => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    };
    
    // Remove loading overlay when everything is ready
    if (zumraImage.complete) {
        removeLoading();
    } else {
        zumraImage.addEventListener('load', removeLoading);
        
        // Fallback in case image fails to load
        setTimeout(removeLoading, 3000);
    }
    
    // Add swipe gesture support for mobile gallery
    if (isTouchDevice) {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        imageModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, false);
        
        imageModal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Detect swipe direction with higher threshold for vertical swipes
            if (Math.abs(deltaY) > 100 && Math.abs(deltaY) > Math.abs(deltaX)) {
                // Vertical swipe - close the modal
                imageModal.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => {
                    imageModal.style.display = 'none';
                }, 400);
            }
        }
    }
}); 