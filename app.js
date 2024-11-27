const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
const prevButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeButton = document.querySelector(".close-btn");

let currentIndex = 0;

// Update the carousel display
function updateCarousel() {
  carouselItems.forEach((item, index) => {
    item.classList.remove(
      "center",
      "left",
      "right",
      "far-left",
      "far-right",
      "hidden"
    );

    if (index === currentIndex) {
      item.classList.add("center");
    } else if (
      index ===
      (currentIndex - 1 + carouselItems.length) % carouselItems.length
    ) {
      item.classList.add("left");
    } else if (index === (currentIndex + 1) % carouselItems.length) {
      item.classList.add("right");
    } else if (
      index ===
      (currentIndex - 2 + carouselItems.length) % carouselItems.length
    ) {
      item.classList.add("far-left");
    } else if (index === (currentIndex + 2) % carouselItems.length) {
      item.classList.add("far-right");
    } else {
      item.classList.add("hidden");
    }
  });
}

// Move to the previous image
prevButton.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

// Move to the next image
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

// Initialize the carousel
updateCarousel();

// Handle clicking on carousel item to enlarge the image
carouselItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    modal.style.display = "flex"; // Show the modal
    modalImage.src = item.src; // Set the clicked image to the modal
    currentIndex = index; // Update current index for modal navigation
    updateModalImage(); // Update the modal image based on index
  });
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
});

// Update the modal image based on the current index
function updateModalImage() {
  modalImage.src = carouselItems[currentIndex].src;
}

// Show the next image in modal
function showNextImage() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateModalImage();
}

// Show the previous image in modal
function showPrevImage() {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateModalImage();
}

// Add swipe functionality for the modal
let startX = 0;

modalImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modalImage.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    showNextImage(); // Swipe left
  } else if (endX - startX > 50) {
    showPrevImage(); // Swipe right
  }
});

// Get references to the modal navigation buttons
const modalPrevButton = document.querySelector("#modal-prev-btn");
const modalNextButton = document.querySelector("#modal-next-btn");

// Move to the previous image in modal
modalPrevButton.addEventListener("click", () => {
  showPrevImage();
});

// Move to the next image in modal
modalNextButton.addEventListener("click", () => {
  showNextImage();
});

// Gallery Animation

const gallerySection =
  document.querySelector(".carousel-wrapper").parentElement; // Select the parent container of carousel-wrapper

// Select the specific elements inside that container
const galleryHr = gallerySection.querySelector("hr");
const galleryTitle = gallerySection.querySelector("h3");
const galleryParagraph = gallerySection.querySelector("p");
const carouselWrapper = gallerySection.querySelector(".carousel-wrapper");

// Updated Intersection Observer callback for gallery animation
const galleryObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Animation for hr, h3, and p elements inside the gallery section
      if (
        entry.target === galleryHr ||
        entry.target === galleryTitle ||
        entry.target === galleryParagraph
      ) {
        entry.target.classList.add("tracking-in-expand");
      }

      // Animate the carousel wrapper after the above elements
      if (entry.target === galleryParagraph) {
        carouselWrapper.classList.add("scale-in-hor-center");
      }

      // Stop observing after animation is added
      observer.unobserve(entry.target);
    }
  });
};

// Create the observer instance for the gallery
const galleryObserver = new IntersectionObserver(
  galleryObserverCallback,
  { root: null, rootMargin: "0px", threshold: 0.3 } // Trigger when 30% of the element is in view
);

// Observe the gallery elements
galleryObserver.observe(galleryHr);
galleryObserver.observe(galleryTitle);
galleryObserver.observe(galleryParagraph);
galleryObserver.observe(carouselWrapper);

// Adjust the h1 size on page load and on resize
window.onload = () => {
  changeH1size();
};

window.addEventListener("resize", () => {
  changeH1size();
});

function changeH1size() {
  const h1 = document.querySelector("#main-title");
  const titleParagraph = document.getElementById("paragraph-title");
  const journeryTitle = document.getElementById("start-journey-title");

  const screenWidth = window.innerWidth;
  // Check window width and update the h1 text
  if (screenWidth < 500) {
    h1.textContent = "Villa Jure";
    titleParagraph.textContent = "Tranquility made timeless";
    galleryTitle.textContent = "Villa's Gallery";
    galleryParagraph.textContent = "Explore beautiful spaces.";
    journeryTitle.textContent = "Your journey starts here";
  } else if (screenWidth < 730) {
    h1.textContent = "Welcome to Villa Jure";
    titleParagraph.textContent = "Villa between sea and hills.";
    galleryParagraph.textContent =
      "Explore our gallery for beautiful spaces and serenity.";
    journeryTitle.textContent = "Begin your journey with Villa Jure!";
  } else {
    h1.textContent = "Experience Luxury at Villa Jure";
    titleParagraph.textContent =
      "Your dream getaway awaits in beautiful Kastela";
    galleryTitle.textContent = "Check out our gallery!";
    galleryParagraph.textContent =
      "Browse through our gallery to see the villa's beautiful spaces and serene surroundings.";
    journeryTitle.textContent = "Start Your Journey with Villa Jure Today!";
  }
}
