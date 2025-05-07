// Preloader for Salty Paws website
const preloadImages = async () => {
    // Replace these with your GitHub details
    const owner = 'oscarwika';
    const repo = 'test';
    const path = 'assets/images/gallery';

    try {
        // Fetch gallery images from GitHub
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
        const data = await response.json();
        const galleryImages = data
            .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name))
            .map(file => file.download_url);

        // Add any other images you want to preload here
        const imagesToPreload = [
            ...galleryImages,
            // Add about page images here
            // Example: '/assets/images/about/image1.jpg',
        ];

        // Create a function to preload a single image
        const preloadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        };

        // Preload all images
        await Promise.all(imagesToPreload.map(preloadImage));
        console.log('All images preloaded successfully');
    } catch (error) {
        console.warn('Error preloading images:', error);
    }
};

// Function to start preloading
const startPreloading = () => {
    // Start preloading after a small delay to not block initial page load
    setTimeout(() => {
        preloadImages();
    }, 1000);
};

// Start preloading when the script loads
startPreloading(); 