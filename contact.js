(function () {
  emailjs.init("JpjMG4Ch4sECdb8eF"); // Replace with your EmailJS Public Key (User ID)
})();

function sendEmail() {
  const to_name = "Recipient Name"; // Replace with the recipient's name if desired
  const from_name = document.getElementById("name").value;
  const from_surname = document.getElementById("surname").value;
  const message = document.getElementById("message").value;
  const email = document.getElementById("email").value;
  const phoneNum = document.getElementById("phone").value;

  emailjs
    .send("service_xmwx2zj", "template_0p9687u", {
      to_name: "Wind",
      from_name: from_name,
      from_surname: from_surname,
      message: message,
      from_email: email,
      from_phone: phoneNum,
    })
    .then(() => {
      document.getElementById("status-message").innerText =
        "Email sent successfully!";
    })
    .catch((error) => {
      document.getElementById("status-message").innerText =
        "Error sending email: " + error.text;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const priceWrappers = document.querySelectorAll(".price-wrapper");

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.3, // Trigger when 30% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("swing-in-top-fwd");
        observer.unobserve(entry.target); // Stop observing once animation starts
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  priceWrappers.forEach((wrapper) => observer.observe(wrapper));
});
