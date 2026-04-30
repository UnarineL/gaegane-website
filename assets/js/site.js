const menuBtn=document.querySelector(".menu-toggle"),navLinks=document.querySelector(".nav-links");
if(menuBtn&&navLinks){menuBtn.addEventListener("click",()=>{const o=navLinks.classList.toggle("active");menuBtn.classList.toggle("active",o);menuBtn.setAttribute("aria-expanded",o?"true":"false");document.body.classList.toggle("nav-open",o)});navLinks.querySelectorAll("a").forEach(l=>l.addEventListener("click",()=>{navLinks.classList.remove("active");menuBtn.classList.remove("active");document.body.classList.remove("nav-open")}))}

const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".hero-dot")];let index=0,timer;
function showSlide(i){if(!slides.length)return;slides.forEach((s,n)=>s.classList.toggle("active",n===i));dots.forEach((d,n)=>d.classList.toggle("active",n===i));index=i}
function nextSlide(){showSlide((index+1)%slides.length)}function startSlider(){if(slides.length>1)timer=setInterval(nextSlide,5200)}function resetSlider(){clearInterval(timer);startSlider()}
dots.forEach((d,i)=>d.addEventListener("click",()=>{showSlide(i);resetSlider()}));startSlider();

const carousels=document.querySelectorAll(".portfolio-carousel");
carousels.forEach(carousel=>{
  const track=carousel.querySelector(".carousel-track");
  const cards=[...carousel.querySelectorAll(".carousel-card")];
  const prev=carousel.querySelector(".carousel-btn.prev");
  const next=carousel.querySelector(".carousel-btn.next");
  let position=0;
  function visibleCount(){return window.innerWidth<=640?1:window.innerWidth<=980?2:3}
  function maxPosition(){return Math.max(0,cards.length-visibleCount())}
  function update(){
    if(!cards.length)return;
    position=Math.min(position,maxPosition());
    const cardWidth=cards[0].getBoundingClientRect().width;
    const gap=parseFloat(getComputedStyle(track).gap)||0;
    track.style.transform=`translateX(-${position*(cardWidth+gap)}px)`;
  }
  prev&&prev.addEventListener("click",()=>{position=Math.max(0,position-1);update()});
  next&&next.addEventListener("click",()=>{position=Math.min(maxPosition(),position+1);update()});
  window.addEventListener("resize",update);
  update();
});

const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
