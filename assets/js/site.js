const menuBtn=document.querySelector(".menu-toggle"),navLinks=document.querySelector(".nav-links");
if(menuBtn&&navLinks){menuBtn.addEventListener("click",()=>{const o=navLinks.classList.toggle("active");menuBtn.classList.toggle("active",o);menuBtn.setAttribute("aria-expanded",o?"true":"false");document.body.classList.toggle("nav-open",o)});navLinks.querySelectorAll("a").forEach(l=>l.addEventListener("click",()=>{navLinks.classList.remove("active");menuBtn.classList.remove("active");document.body.classList.remove("nav-open")}))}
const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".hero-dot")];let index=0,timer;
function showSlide(i){if(!slides.length)return;slides.forEach((s,n)=>s.classList.toggle("active",n===i));dots.forEach((d,n)=>d.classList.toggle("active",n===i));index=i}
function nextSlide(){showSlide((index+1)%slides.length)}function startSlider(){if(slides.length>1)timer=setInterval(nextSlide,5200)}function resetSlider(){clearInterval(timer);startSlider()}
dots.forEach((d,i)=>d.addEventListener("click",()=>{showSlide(i);resetSlider()}));startSlider();
const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const galleryTrack=document.getElementById('galleryTrack');
const galleryPrev=document.querySelector('.gallery-prev');
const galleryNext=document.querySelector('.gallery-next');
if(galleryTrack&&galleryPrev&&galleryNext){
  const scrollGallery=dir=>galleryTrack.scrollBy({left:dir*galleryTrack.clientWidth*.92,behavior:'smooth'});
  galleryPrev.addEventListener('click',()=>scrollGallery(-1));
  galleryNext.addEventListener('click',()=>scrollGallery(1));
}

document.querySelectorAll(".project-gallery-wrap").forEach(wrap => {
  const track = wrap.querySelector(".project-image-track");
  const left = wrap.querySelector(".project-gallery-arrow.left");
  const right = wrap.querySelector(".project-gallery-arrow.right");

  if(left && right && track){
    left.addEventListener("click", () => {
      track.scrollBy({ left: -420, behavior: "smooth" });
    });

    right.addEventListener("click", () => {
      track.scrollBy({ left: 420, behavior: "smooth" });
    });
  }
});

const galleryImages = Array.from(document.querySelectorAll(".project-image-track img"));
const lightbox = document.getElementById("imageLightbox");

if(lightbox && galleryImages.length){
  const lightboxImg = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".image-lightbox-close");
  const lightboxPrev = lightbox.querySelector(".lightbox-prev");
  const lightboxNext = lightbox.querySelector(".lightbox-next");
  let currentImageIndex = 0;

  function openLightbox(index){
    currentImageIndex = index;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox(){
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
    lightboxImg.src = "";
  }

  function showPrevImage(){
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  function showNextImage(){
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  if(lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if(lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage);
  if(lightboxNext) lightboxNext.addEventListener("click", showNextImage);

  lightbox.addEventListener("click", e => {
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if(!lightbox.classList.contains("active")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowLeft") showPrevImage();
    if(e.key === "ArrowRight") showNextImage();
  });
}
