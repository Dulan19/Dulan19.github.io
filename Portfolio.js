// Get elements from the DOM 
const menuIcon = document.getElementById('menu-icon'); 
const navbar = document.querySelector('.navbar'); 
const navbarLinks = document.querySelectorAll('.navbar a');  
const logo = document.querySelector('.logo');
const homeLink = document.querySelector('.navbar a[href="#home"]');

// Toggle navbar visibility when the menu icon is clicked 
menuIcon.addEventListener('click', () => {     
    navbar.classList.toggle('active'); 
});  

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Update active state in navbar to home
    navbarLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add click event to logo to navigate to home section
logo.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
});

// Special handling for home link
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
    
    // Close mobile menu if open
    if (window.innerWidth <= 991) {             
        navbar.classList.remove('active');         
    }
});

// Close navbar when a link is clicked on mobile 
navbarLinks.forEach(link => {     
    link.addEventListener('click', (e) => {
        // Skip the home link as it's handled separately
        if (link.getAttribute('href') === '#home') {
            return;
        }
        
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Update active class
            navbarLinks.forEach(navLink => {
                if (navLink === link) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
        }
        
        // Close mobile menu if open
        if (window.innerWidth <= 991) {             
            navbar.classList.remove('active');         
        }
    }); 
});  

// Add active class to navbar links based on the scroll position 
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    // Get all sections
    const sections = [];
    navbarLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        if (sectionId.startsWith('#')) {
            const section = document.querySelector(sectionId);
            if (section) {
                sections.push({
                    id: sectionId,
                    element: section,
                    top: section.offsetTop,
                    bottom: section.offsetTop + section.offsetHeight
                });
            }
        }
    });
    
    // Sort sections by position (top to bottom)
    sections.sort((a, b) => a.top - b.top);
    
    // Remove active class from all links
    navbarLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find the active section based on scroll position
    let activeSection = null;
    for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top - 200) {
            activeSection = sections[i].id;
            break;
        }
    }
    
    // Add active class to the corresponding link
    if (activeSection) {
        document.querySelector(`.navbar a[href="${activeSection}"]`).classList.add('active');
    } else {
        // Default to home
        document.querySelector('.navbar a[href="#home"]').classList.add('active');
    }
});

// Parse the certification data from HTML structure
function parseCertificationData() {
    const certificationItems = document.querySelectorAll('.education-item');
    
    certificationItems.forEach(item => {
        const title = item.querySelector('h2').textContent;
        const description = item.querySelector('p').textContent;
        
        // Extract organization and year from the title if possible
        let organization = '';
        let year = '';
        
        // Clear the item's content
        item.innerHTML = '';
        
        // Create new structure
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        item.appendChild(titleElement);
        
        // Add organization info
        if (title.includes('JavaScript')) {
            organization = 'FreeCodeCamp';
            year = 'Present';
        }  else if (title.includes('Learning SQL')) {
            organization = 'LinkedIn Learning';
            year = '2025'; 
        }  else if (title.includes('Java')) {
            organization = 'LinkedIn Learning';
            year = '2024';
        }  else if (title.includes('HTML')) {
            organization = 'LinkedIn Learning';
            year = '2024';
        }  else if (title.includes('CSS')) {
            organization = 'LinkedIn Learning';
            year = '2024';
        } else if (title.includes('Python')) {
            organization = 'LinkedIn Learning';
            year = '2025';
        } else if (title.includes('Object-Oriented')) {
            organization = 'LinkedIn Learning';
            year = '2025';
        } else if (title.includes('Web APIs')) {
            organization = 'LinkedIn Learning';
            year = '2025';
        } else if (title.includes('Web Design')) {
            organization = 'LinkedIn Learning';
            year = '2024';
        } else if (title.includes('Management')) {
            organization = 'LinkedIn Learning';
            year = '2025';
        }
        
        const orgElement = document.createElement('div');
        orgElement.className = 'org-info';
        orgElement.textContent = organization;
        item.appendChild(orgElement);
        
        const yearElement = document.createElement('div');
        yearElement.className = 'year';
        yearElement.textContent = year;
        item.appendChild(yearElement);
        
        // Add description (hidden by default)
        const descElement = document.createElement('p');
        descElement.textContent = description;
        item.appendChild(descElement);
        
        // Add tags based on the certification content
        const tagContainer = document.createElement('div');
        tagContainer.className = 'tag-container';
        
        // Add relevant tags based on title
        const tags = [];
        if (title.includes('Algorithms')) {
            tags.push('JavaScript', 'Programming', 'Alogrithms and Data Structures'); 
        } else if (title.includes('Java')) {
            tags.push('Java', 'Programming');
        } else if (title.includes('Object-Oriented')) {
            tags.push('OOP', 'Design', 'Programming');
        } else if (title.includes('Learning SQL')) {
            tags.push('SQL', 'DataBase', 'Backend');
        } else if (title.includes('Web APIs')) {
            tags.push('API', 'Web Development', 'REST');
        } else if (title.includes('Management')) { 
            tags.push('Project Management', 'Leadership');
        } else if (title.includes('Web Design')) {
            tags.push('HTML', 'CSS', 'Web Design');
        }
        
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagContainer.appendChild(tagElement);
        });
        
        item.appendChild(tagContainer);
    });
}

// Call the certification setup when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    parseCertificationData();
    
    // Add click event to certification items
    const certItems = document.querySelectorAll('.education-item');
    certItems.forEach(item => {
        item.addEventListener('click', function() {
            const description = this.querySelector('p');
            description.style.display = description.style.display === 'block' ? 'none' : 'block';
        });
    });
});
