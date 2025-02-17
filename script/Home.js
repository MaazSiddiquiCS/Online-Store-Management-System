function SlidesNavigation() {
    const slider = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slides > div");
    const dots = document.querySelectorAll(".slider-nav a");

    // Debugging logs
    console.log("Slider:", slider);
    console.log("Slides:", slides);
    console.log("Dots:", dots);

    let currentSlide = 0;
    let totalSlides = slides.length;

    // Handle edge cases
    if (totalSlides <= 1) {
        console.log("Not enough slides to start the slideshow.");
        return; // Exit the function
    }

    let slideWidth = slides[0].clientWidth;
    console.log("Slide Width:", slideWidth);

    let autoSlideInterval;

    // Update slide position and active dot
    const updateSlides = () => {
        let scrollPosition = currentSlide * slideWidth;
        slider.scrollLeft = scrollPosition;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.style.opacity = index === currentSlide ? 1 : 0.75;
        });

        // Increment or reset
        currentSlide = (currentSlide + 1) % totalSlides;
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = slides[0].clientWidth;
    });

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // Resume on mouse leave
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(updateSlides, 5000);
    });

    // Add click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            clearInterval(autoSlideInterval); // Pause auto-slide
            currentSlide = index; // Set current slide
            updateSlides(); // Update slide position
            autoSlideInterval = setInterval(updateSlides, 5000); // Restart auto-slide
        });
    });

    // Start the slideshow
    updateSlides(); // Show first slide immediately
    autoSlideInterval = setInterval(updateSlides, 5000); // Start auto-slide
}

// Start after full page load
window.addEventListener('load', SlidesNavigation);

async function ProductCard() {
    const base_url = "https://fakestoreapi.com/products/category";
    const categories = document.querySelectorAll(".Boxes");

    categories.forEach(async (category) => {
        let catName = category.id;
        console.log(`Fetching products for category: ${catName}`);

        try {
            let response = await fetch(`${base_url}/${catName}`);

            // ✅ Check if API call was successful
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            let data = await response.json();

            // ✅ Ensure the response contains data
            if (!data || data.length === 0) {
                console.error(`No products found for category: ${catName}`);
                return;
            }

            // Get elements inside the current category
            const cards = category.querySelectorAll(".product-img");
            const productNames = category.querySelectorAll(".p-name");
            const prices = category.querySelectorAll(".price");

            // ✅ Update UI with data (handling cases where there are fewer products)
            cards.forEach((card, index) => {
                if (data[index]) {
                    card.style.backgroundImage = `url('${data[index].image}')`;
                }
            });

            productNames.forEach((productName, index) => {
                if (data[index]) {
                    productName.innerText = `${data[index].title}`;
                }
            });

            prices.forEach((price, index) => {
                if (data[index]) {
                    price.innerText = `Rs. ${data[index].price}`;
                }
            });

        } catch (error) {
            console.error(`Error fetching products for ${catName}:`, error);
        }
    });
}

// Run function when the page loads
window.addEventListener("load", ProductCard);
