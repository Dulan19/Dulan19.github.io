document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the DOM
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelectorAll('.navbar a');
    const logo = document.querySelector('.logo');
    const themeToggle = document.getElementById('theme-toggle');
    const scrollTopBtn = document.getElementById('scroll-top');
    const preloader = document.querySelector('.preloader');

    // Error handling for DOM elements
    if (!menuIcon || !navbar || !navbarLinks.length || !logo || !themeToggle || !scrollTopBtn || !preloader) {
        console.error('One or more DOM elements not found');
        return;
    }

    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });

    // Toggle navbar visibility when the menu icon is clicked
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Function to handle smooth scrolling and active state
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });

            // Update active class
            navbarLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === targetId);
            });
        }
    }

    // Function to scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Update active state in navbar to home
        navbarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#home');
        });
    }

    // Add click event to logo
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
        if (window.innerWidth <= 991) {
            navbar.classList.remove('active');
        }
    });

    // Add click events to navbar links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#home') {
                scrollToTop();
            } else {
                scrollToSection(targetId);
            }
            if (window.innerWidth <= 991) {
                navbar.classList.remove('active');
            }
        });
    });

    // Add active class to navbar links based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Define sections with their corresponding IDs
        const sections = [
            { id: '#home', element: document.querySelector('#home') },
            { id: '#projects', element: document.querySelector('#projects') },
            { id: '#education', element: document.querySelector('#education') },
            { id: '#contact', element: document.querySelector('#contact') }
        ].filter(section => section.element);

        // Find the current section based on scroll position
        let currentSection = { id: '#home' }; // Default to home
        sections.forEach(section => {
            const sectionTop = section.element.offsetTop - 120; // Adjust for navbar height
            const sectionBottom = sectionTop + section.element.offsetHeight;

            // Check if scroll position is within the section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
        });

        // Special case for the bottom of the page (Contact section)
        if (scrollPosition + windowHeight >= documentHeight - 50) {
            currentSection = sections.find(section => section.id === '#contact') || currentSection;
        }

        // Update active class
        navbarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentSection.id);
        });

        // Show/hide scroll-to-top button
        if (scrollPosition > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top button click event
    scrollTopBtn.addEventListener('click', scrollToTop);

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeToggle.querySelector('i').classList.toggle('bx-moon', !isLightMode);
        themeToggle.querySelector('i').classList.toggle('bx-sun', isLightMode);
    });

    // Parse certification data
    function parseCertificationData() {
        const certificationItems = document.querySelectorAll('.education-item');
        if (!certificationItems.length) return;

        certificationItems.forEach(item => {
            const titleElement = item.querySelector('h2');
            const descriptionElement = item.querySelector('p');
            if (!titleElement || !descriptionElement) return;

            const title = titleElement.textContent;
            const description = descriptionElement.textContent;

            // Clear the item's content
            item.innerHTML = '';

            // Create new structure
            const newTitleElement = document.createElement('h2');
            newTitleElement.textContent = title;
            item.appendChild(newTitleElement);

            // Add organization and year
            const certData = {
                'JavaScript Algorithms and Data Structures': { org: 'freeCodeCamp', year: 'Present' },
                'Programming Foundations: Object-Oriented Design': { org: 'LinkedIn Learning', year: '2025' },
                'Introduction to Web APIs': { org: 'LinkedIn Learning', year: '2025' },
                'Agile Foundations': { org: 'LinkedIn Learning', year: '2025' },
                'Learning SQL Programming': { org: 'LinkedIn Learning', year: '2025' },
                'Project Management Skills for Leaders': { org: 'LinkedIn Learning', year: '2025' },
                'Learning Java 11': { org: 'LinkedIn Learning', year: '2024' },
                'Introduction to Web Design and Development': { org: 'LinkedIn Learning', year: '2024' }
            };

            const { org = 'Unknown', year = 'Unknown' } = certData[title] || {};

            const orgElement = document.createElement('div');
            orgElement.className = 'org-info';
            orgElement.textContent = org;
            item.appendChild(orgElement);

            const yearElement = document.createElement('div');
            yearElement.className = 'year';
            yearElement.textContent = year;
            item.appendChild(yearElement);

            // Add description (hidden by default)
            const descElement = document.createElement('p');
            descElement.textContent = description;
            item.appendChild(descElement);

            // Add tags
            const tagContainer = document.createElement('div');
            tagContainer.className = 'tag-container';

            const tagData = {
                'JavaScript Algorithms and Data Structures': ['JavaScript', 'Programming', 'Algorithms', 'Data Structures'],
                'Programming Foundations: Object-Oriented Design': ['OOP', 'Design', 'Programming'],
                'Introduction to Web APIs': ['API', 'Web Development', 'REST'],
                'Agile Foundations': ['Agile', 'Project Management'],
                'Learning SQL Programming': ['SQL', 'Database', 'Programming'],
                'Project Management Skills for Leaders': ['Project Management', 'Leadership'],
                'Learning Java 11': ['Java', 'Programming'],
                'Introduction to Web Design and Development': ['HTML', 'CSS', 'JavaScript', 'Web Design']
            };

            (tagData[title] || ['Certification']).forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagContainer.appendChild(tagElement);
            });

            item.appendChild(tagContainer);
        });

        // Add click event to certification items
        certificationItems.forEach(item => {
            item.addEventListener('click', () => {
                const description = item.querySelector('p');
                if (description) {
                    description.style.display = description.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }

    // Initialize
    parseCertificationData();
    scrollToTop(); // Set initial active state
});