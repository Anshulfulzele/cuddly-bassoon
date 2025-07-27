const samplePhotos = [];
for (let i = 1; i <= 30; i++) {
  samplePhotos.push(`./images/photo${i}.jpg`);
}

const gallery = document.getElementById("photoGallery");
samplePhotos.forEach((src) => {
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo-item";
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Anshul's Photo";
  photoDiv.appendChild(img);
  gallery.appendChild(photoDiv);
});

function toggleMenu() {
  const menu = document.getElementById("menuPanel");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function openModal(type) {
  const modal = document.getElementById("contentModal");
  const content = document.getElementById("modalContentArea");
  modal.style.display = "flex";

  if (type === "about") {
    content.innerHTML = "<h2>About Me</h2><p>I'm Anshul Sharma, a passionate photographer capturing moments through my lens.</p>";
  } else if (type === "stories") {
    content.innerHTML = "<h2>Stories</h2><p>Each photo has a story. Stay tuned for behind-the-scenes and inspirations!</p>";
  } else if (type === "contact") {
    content.innerHTML = `
      <h2>Contact Me</h2>
      <form action="https://formspree.io/f/mwkgrvow" method="POST">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" rows="4" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    `;
  }
}

function closeModal() {
  document.getElementById("contentModal").style.display = "none";
}

window.onload = () => {
  const audio = document.getElementById("bgMusic");
  if (audio) {
    audio.volume = 0.2;
  }
};