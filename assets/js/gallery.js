// Gallery carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Replace these with your GitHub details
    const owner = 'oscarwika'; // Your GitHub username
    const repo = 'test';  // Your repository name
    const path = 'assets/images/gallery';   // Updated path to gallery images

    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
        .then(response => response.json())
        .then(data => {
            const images = data.filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name));
            const imageUrls = images.map(file => file.download_url);
            initializeCarousel(imageUrls);
        })
        .catch(error => console.error('Error fetching images:', error));

    function initializeCarousel(imageUrls) {
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.style.width = `${imageUrls.length * 100}%`;

        imageUrls.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Gallery image';
            img.style.width = `${100 / imageUrls.length}%`;
            carouselInner.appendChild(img);
            img.addEventListener('click', () => openFullscreen(index));
        });

        let isDragging = false;
        let startPosition = 0;
        let currentTranslate = 0;
        let initialTranslate = 0;
        let currentIndex = 0;
        const carousel = document.querySelector('.carousel');
        const carouselWidth = carousel.getBoundingClientRect().width;

        function setSliderPosition() {
            carouselInner.style.transform = `translateX(${currentTranslate}%)`;
        }

        function dragStart(event) {
            if (event.type === 'touchstart') {
                startPosition = event.touches[0].clientX;
            } else {
                startPosition = event.clientX;
            }
            initialTranslate = currentTranslate;
            isDragging = true;
            carouselInner.style.transition = 'none';
        }

        function drag(event) {
            if (!isDragging) return;
            let currentPosition;
            if (event.type === 'touchmove') {
                currentPosition = event.touches[0].clientX;
            } else {
                currentPosition = event.clientX;
            }
            const diff = currentPosition - startPosition;
            const translationDiff = (diff / carouselWidth) * (100 / imageUrls.length);
            currentTranslate = initialTranslate + translationDiff;
            setSliderPosition();
        }

        function dragEnd() {
            isDragging = false;
            carouselInner.style.transition = 'transform 0.5s ease';
            const dragDistance = currentTranslate - initialTranslate;
            const threshold = 50 / imageUrls.length;

            if (dragDistance < -threshold) {
                currentIndex = Math.min(currentIndex + 1, imageUrls.length - 1);
            } else if (dragDistance > threshold) {
                currentIndex = Math.max(currentIndex - 1, 0);
            }

            currentTranslate = - (currentIndex / imageUrls.length * 100);
            setSliderPosition();
        }

        carouselInner.addEventListener('mousedown', dragStart);
        carouselInner.addEventListener('mousemove', drag);
        carouselInner.addEventListener('mouseup', dragEnd);
        carouselInner.addEventListener('mouseleave', dragEnd);
        carouselInner.addEventListener('touchstart', dragStart);
        carouselInner.addEventListener('touchmove', drag);
        carouselInner.addEventListener('touchend', dragEnd);

        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                currentTranslate = - (currentIndex / imageUrls.length * 100);
                setSliderPosition();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < imageUrls.length - 1) {
                currentIndex++;
                currentTranslate = - (currentIndex / imageUrls.length * 100);
                setSliderPosition();
            }
        });

        // Fullscreen functionality
        const modal = document.querySelector('.fullscreen-modal');
        const fullscreenImage = document.querySelector('.fullscreen-image');
        const closeButton = document.querySelector('.close-button');
        const fullscreenPrev = document.querySelector('.fullscreen-prev');
        const fullscreenNext = document.querySelector('.fullscreen-next');
        let fullscreenIndex;

        function openFullscreen(index) {
            fullscreenIndex = index;
            fullscreenImage.src = imageUrls[index];
            modal.style.display = 'flex';
        }

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        fullscreenPrev.addEventListener('click', () => {
            if (fullscreenIndex > 0) {
                fullscreenIndex--;
                fullscreenImage.src = imageUrls[fullscreenIndex];
            }
        });

        fullscreenNext.addEventListener('click', () => {
            if (fullscreenIndex < imageUrls.length - 1) {
                fullscreenIndex++;
                fullscreenImage.src = imageUrls[fullscreenIndex];
            }
        });
    }
}); 