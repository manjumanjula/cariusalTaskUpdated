document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { id: 1, imageUrl: "images/image6.png" },
        { id: 2, imageUrl: "images/image2.png" },
        { id: 3, imageUrl: "images/image3.png" },
        { id: 4, imageUrl: "images/image4.png" },
        { id: 5, imageUrl: "images/image5.png" }
    ];

    let activeIndex = 0;
    let visibleIndex = 0;
    const visibleCount = 3; // Number of visible images

    const carouselImagesContainer = document.getElementById('carousel-images');

    const renderImages = () => {
        carouselImagesContainer.innerHTML = '';
        const visibleImages = getVisibleImages();
        visibleImages.forEach((image, index) => {
            const imageCard = document.createElement('div');
            imageCard.className = `image-card ${activeIndex === visibleIndex + index ? 'enlarged' : ''}`;
            imageCard.innerHTML = `<img src="${image.imageUrl}" alt="Image ${image.id}" />`;
            imageCard.addEventListener('click', () => handleImageClick(visibleIndex + index));
            carouselImagesContainer.appendChild(imageCard);
        });

        // Move the carousel container to the correct position
        const cardWidth = 30; // Percentage width of each card
        carouselImagesContainer.style.transform = `translateX(-${visibleIndex * cardWidth}%)`;
    };

    const getVisibleImages = () => {
        const start = visibleIndex;
        const end = (visibleIndex + visibleCount) % images.length;
        if (start < end) {
            return images.slice(start, end);
        }
        return [...images.slice(start), ...images.slice(0, end)];
    };

    const handleImageClick = (index) => {
        activeIndex = index;
        // Check if the clicked image is the third one in the current view
        if (index === visibleIndex + 2) {
            visibleIndex = (visibleIndex + 1) % images.length;
        }
        renderImages();
    };

    const handleNext = () => {
        visibleIndex = (visibleIndex + 1) % images.length;
        renderImages();
    };

    const handlePrev = () => {
        visibleIndex = (visibleIndex - 1 + images.length) % images.length;
        renderImages();
    };

    // Initial render
    renderImages();
});
