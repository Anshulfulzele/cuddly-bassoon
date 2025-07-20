document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const overlayMenu = document.getElementById('overlay-menu');
    const contentOverlay = document.getElementById('content-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const photoShowcase = document.getElementById('photo-showcase');
    const photoItems = document.querySelectorAll('.photo-item'); // Get all photo items

    // Intersection Observer for photo reveal animation
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.3 // 30% of item visible to trigger
    };

    const photoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: If you only want it to animate once, uncomment the line below:
                // observer.unobserve(entry.target);
            } else {
                // Optional: If you want it to hide again when out of view
                // entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    // Observe each photo item
    photoItems.forEach(item => {
        photoObserver.observe(item);
    });

    // Hamburger Menu Toggle
    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.toggle('active'); // Toggle 'active' class on menu icon
        overlayMenu.classList.toggle('active'); // Toggle 'active' class on overlay menu

        if (isActive) {
            // Menu is opening
            contentOverlay.classList.remove('active'); // Ensure content overlay is hidden
            document.body.style.overflow = 'hidden'; // Prevent main body scroll
            photoShowcase.style.overflowY = 'hidden'; // Stop photo showcase scroll
        } else {
            // Menu is closing
            // If content overlay is NOT active, re-enable photo showcase scrolling
            if (!contentOverlay.classList.contains('active')) {
                document.body.style.overflow = 'auto'; // Re-enable body scroll
                photoShowcase.style.overflowY = 'scroll'; // Re-enable photo showcase scroll
            }
        }
    });

    // Handle menu link clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Get section ID from href

            // Close overlay menu
            menuToggle.classList.remove('active');
            overlayMenu.classList.remove('active');

            // Manage content overlay visibility and section display
            if (targetId === 'home-section') {
                contentOverlay.classList.remove('active');
                document.body.style.overflow = 'auto'; // Allow body to scroll the photo showcase
                photoShowcase.style.overflowY = 'scroll'; // Enable photo showcase scroll
                photoShowcase.scrollTo({ top: 0, behavior: 'smooth' }); // Go to top of showcase
            } else {
                contentOverlay.classList.add('active'); // Show the content overlay
                document.body.style.overflow = 'hidden'; // Prevent body from scrolling main showcase
                photoShowcase.style.overflowY = 'hidden'; // Stop photo showcase scroll
            }

            // Hide all content sections and show the active one
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active-section'); // Hide all
                section.style.display = 'none'; // Ensure it's hidden from layout
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section'); // Show active
                targetSection.style.display = 'block'; // Make it visible
            }

            // Scroll content overlay to the top for the new section
            contentOverlay.scrollTo({ top: 0, behavior: 'smooth' });

            // Specific unique reveal for contact details
            if (targetId === 'contact-section') {
                const contactDetails = document.getElementById('contact-details');
                contactDetails.classList.remove('revealed'); // Reset animation state
                void contactDetails.offsetWidth; // Trigger reflow to restart animation
                contactDetails.classList.add('revealed');
            }
        });
    });

    // Initial check for section if loaded directly with hash
    if (window.location.hash) {
        const initialSectionId = window.location.hash.substring(1);
        const initialSection = document.getElementById(initialSectionId);
        if (initialSection && initialSectionId !== 'home-section') {
            contentOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            initialSection.classList.add('active-section');
            initialSection.style.display = 'block';
            contentOverlay.scrollTo({ top: 0, behavior: 'auto' });
        } else {
             // If navigating to home, ensure photo showcase is scrollable
            photoShowcase.style.overflowY = 'scroll';
            document.body.style.overflow = 'auto';
        }
    } else {
        // Default to showing photo showcase scroll on initial load
        photoShowcase.style.overflowY = 'scroll';
        document.body.style.overflow = 'auto';
    }
});
