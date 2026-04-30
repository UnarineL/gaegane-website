const menuBtn=document.querySelector(".menu-toggle"),navLinks=document.querySelector(".nav-links");
if(menuBtn&&navLinks){menuBtn.addEventListener("click",()=>{const o=navLinks.classList.toggle("active");menuBtn.classList.toggle("active",o);menuBtn.setAttribute("aria-expanded",o?"true":"false");document.body.classList.toggle("nav-open",o)});navLinks.querySelectorAll("a").forEach(l=>l.addEventListener("click",()=>{navLinks.classList.remove("active");menuBtn.classList.remove("active");document.body.classList.remove("nav-open")}))}
const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".hero-dot")];let index=0,timer;
function showSlide(i){if(!slides.length)return;slides.forEach((s,n)=>s.classList.toggle("active",n===i));dots.forEach((d,n)=>d.classList.toggle("active",n===i));index=i}
function nextSlide(){showSlide((index+1)%slides.length)}function startSlider(){if(slides.length>1)timer=setInterval(nextSlide,5200)}function resetSlider(){clearInterval(timer);startSlider()}
dots.forEach((d,i)=>d.addEventListener("click",()=>{showSlide(i);resetSlider()}));startSlider();
const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
