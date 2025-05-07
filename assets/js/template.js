// Function to load the common elements
function loadCommonElements() {
    // Create header and navigation
    const header = `
        <header class="header">
            <div class="brand">
                <h1>Salty Paws</h1>
                <div class="logo"></div>
            </div>
            <nav class="nav-menu">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="gallery.html">Gallery</a>
                <a href="services.html">Services</a>
                <a href="reviews.html">Reviews</a>
                <a href="faqs.html">FAQs</a>
                <a href="contact.html">Contact</a>
                <a href="location.html">Location</a>
            </nav>
        </header>
    `;

    // Insert the header
    const container = document.querySelector('.container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', header);
    }

    // Add the console log script
    const script = document.createElement('script');
    script.textContent = `
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Salty Paws - ${document.title} page loaded');
        });
    `;
    document.body.appendChild(script);
}

// Run when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadCommonElements);

// Template system for common HTML elements
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page name for the title
    const pageName = document.title.split(' - ')[1] || 'Home';
    
    // Common head elements
    const commonHead = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/css/styles.css">
    `;
    
    // Create header and navigation
    const header = `
        <header class="header">
            <div class="brand">
                <h1>Salty Paws</h1>
                <div class="logo"></div>
            </div>
            <nav class="nav-menu">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="gallery.html">Gallery</a>
                <a href="services.html">Services</a>
                <a href="reviews.html">Reviews</a>
                <a href="faqs.html">FAQs</a>
                <a href="contact.html">Contact</a>
                <a href="location.html">Location</a>
            </nav>
        </header>
    `;
    
    // Common body structure
    const commonBody = `
        <div class="container">
            ${header}
            <main>
                ${document.querySelector('main')?.innerHTML || ''}
            </main>
        </div>
    `;
    
    // Inject common head elements
    const head = document.head;
    const existingMeta = head.querySelectorAll('meta, link');
    existingMeta.forEach(el => el.remove());
    head.innerHTML = commonHead + head.innerHTML;
    
    // Inject common body structure
    const body = document.body;
    const mainContent = body.innerHTML;
    body.innerHTML = commonBody;
    
    // Restore any page-specific classes
    const pageClass = document.body.className;
    if (pageClass) {
        document.body.className = pageClass;
    }

    // Add the console log script
    const script = document.createElement('script');
    script.textContent = `
        console.log('Salty Paws - ${document.title} page loaded');
    `;
    document.body.appendChild(script);
}); 