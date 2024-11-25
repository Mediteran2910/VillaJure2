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
carouselItems.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "flex"; // Show the modal
    modalImage.src = item.src; // Set the clicked image to the modal
  });
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
});

// Define the intersection observer options
const options = {
  threshold: 0.6, // 50% of the element must be visible to trigger the animation
};

// Function to add animation classes for various elements
const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Handling for articles
      if (entry.target.classList.contains("offerings-description")) {
        const image = entry.target.querySelector("img");
        const text = entry.target.querySelector(".offerings-text");

        if (
          entry.target ===
          document.querySelector(".offerings-description:nth-of-type(1)")
        ) {
          image.classList.add("slide-in-blurred-right");
          text.classList.add("slide-in-blurred-left");
        } else if (
          entry.target ===
          document.querySelector(".offerings-description:nth-of-type(2)")
        ) {
          image.classList.add("slide-in-blurred-left");
          text.classList.add("slide-in-blurred-right");
        } else if (
          entry.target ===
          document.querySelector(".offerings-description:nth-of-type(3)")
        ) {
          image.classList.add("slide-in-blurred-right");
          text.classList.add("slide-in-blurred-left");
        }
      }

      // Handling for icon-section
      if (entry.target.classList.contains("icon-section")) {
        entry.target.classList.add("focus-in-expand-fwd");
      }

      // Handling for gallery (hr, h3, p)
      if (
        entry.target.classList.contains("gallery-hr") ||
        entry.target.classList.contains("gallery-title") ||
        entry.target.classList.contains("gallery-description")
      ) {
        entry.target.classList.add("tracking-in-expand");
      }

      // Handling for carousel-wrapper
      if (entry.target.classList.contains("carousel-wrapper")) {
        entry.target.classList.add("scale-in-hor-center");
      }

      observer.unobserve(entry.target); // Stop observing once animation is triggered
    }
  });
};

// Create an intersection observer instance
const observer = new IntersectionObserver(handleIntersect, options);

// Target elements to observe
const offeringsDescription1 = document.querySelector(
  ".offerings-description:nth-of-type(1)"
);
const offeringsDescription2 = document.querySelector(
  ".offerings-description:nth-of-type(2)"
);
const offeringsDescription3 = document.querySelector(
  ".offerings-description:nth-of-type(3)"
);
const iconSection = document.querySelector(".icon-section");
const hrElement = document.querySelector(".gallery-hr");
const galleryTitle = document.querySelector(".gallery-title");
const galleryDescription = document.querySelector(".gallery-description");
const carouselWrapper = document.querySelector(".carousel-wrapper");

// Start observing the elements
observer.observe(offeringsDescription1);
observer.observe(offeringsDescription2);
observer.observe(offeringsDescription3);
observer.observe(iconSection);
observer.observe(hrElement);
observer.observe(galleryTitle);
observer.observe(galleryDescription);
observer.observe(carouselWrapper);
