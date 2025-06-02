/////////////////////////////////
// پارالاکس



let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const sections = document.querySelectorAll('.parallax-section');
      sections.forEach(section => {
        const speed = 0.4;  
        const offset = window.scrollY - section.offsetTop;

        if (offset > -window.innerHeight && offset < window.innerHeight * 2) {
          section.querySelector('.parallax-content').style.transform =
            `translateY(${offset * speed}px)`;
        }
      });
      ticking = false;
    });
    ticking = true;
  }
});


 ////////////////////////////////////////////
 // لودر(لودینگ)

document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(() => {
        document.querySelector('.loader-wrapper').remove()
    },2000);
})


/////////////////////////////////////////
// همبرگر منو

const hamburgerMenu=document.querySelector('.hamburger')
const MenuEl= document.querySelector('#Menu')
hamburgerMenu.addEventListener("click",()=>{
    MenuEl.classList.add("active")

})

const RemovHamberger=document.querySelector('.remov-hamberger')
RemovHamberger.addEventListener('click',()=>{
    MenuEl.classList.remove("active")
})


/////////////////////////////////////////////
    //  تایپ خودکار 

const textArray = ['EVERY BITE', 'DINING', 'REDEFINED'];
let textIndex = 0;
let charIndex = 0;

function typeEffect() {
    const currentText = textArray[textIndex];
    document.querySelector('.type').textContent = currentText.slice(0, ++charIndex);

    if (charIndex === currentText.length) {
        textIndex = (textIndex + 1) % textArray.length; 
        charIndex = 0;
    }

    setTimeout(typeEffect,300);
}

typeEffect(); 

///////////////////////////////////////

// المان با اسکرول صفحه بیاد وسط  سکشن 2

const allSection = document.querySelectorAll('.section--2-left, .section--2-right');

window.addEventListener('scroll', Boxes);
Boxes();

function Boxes() {
    const trigger = (window.innerHeight / 5) * 4;

    allSection.forEach((e) => {
        const boxTop = e.getBoundingClientRect().top;
        const boxBottom = e.getBoundingClientRect().bottom;

        if (boxTop < trigger && boxBottom > 0) {
            e.classList.add('show');
        } else {
            e.classList.remove('show');
        }
    });
}

//////////////////////////////////////////////////
        // اسکرول نوبار 

const header=document.querySelector('header')
window.addEventListener('scroll',()=>{
    if(window.scrollY > 500){
        header.style.backgroundColor='#0e110d'
        header.style.boxShadow='0px 2px 2px 0px rgba(8, 8, 8, 0.6)'
    }else{
        header.style.backgroundColor='transparent'
    }
})  




/////////////////////////////////////////////////////
    // شمارش اعداد


const counters = document.querySelectorAll('.counter');
let counted = false;

function runCounters() {
if (counted) return;
const duration = 3000; 
const steps = 100;   
const interval = duration / steps;

counters.forEach(counter => {
 const target = +counter.getAttribute('data-target');
 let count = 0;
 const increment = target / steps;

 const update = () => {
   count += increment;
   if (count < target) {
     counter.innerText = Math.round(count);
     setTimeout(update, interval);
   } else {
     counter.innerText = target;
   }
 };
 update();
});

counted = true;
}

const observer = new IntersectionObserver(entries => {
if (entries[0].isIntersecting) {
 runCounters();
 observer.disconnect();
}
}, {
threshold: 0.3
});

observer.observe(document.querySelector('.counter-section'));



////////////////////////////////////////////

  document.addEventListener("DOMContentLoaded", function () {

    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.nazarat');
    const chervonLeft = document.querySelector('.fa-chevron-left');
    const chervonRight = document.querySelector('.fa-chevron-right');

    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
          testimonial.classList.add('active');
        }
      });
    }

    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }

    function prevTestimonial() {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    }

    chervonLeft.addEventListener('click', prevTestimonial);
    chervonRight.addEventListener('click', nextTestimonial);

    setInterval(nextTestimonial, 5000); 
  });

  //////////////////////////////////////////////
          // Api $$ Local Storage


document.querySelector('#reservationForm').addEventListener('submit', function (e) {
  e.preventDefault(); // جلوگیری از ارسال فرم به صورت پیش‌فرض

  const reservationData = {
    name: document.querySelector('#name').value.trim(),
    email: document.querySelector('#email').value.trim(),
    phone: document.querySelector('#phone').value.trim(),
    date: document.querySelector('#date').value,
    time: document.querySelector('#time').value,
    persons: document.querySelector('#persons').value
  };

  localStorage.setItem('reservation', JSON.stringify(reservationData));

  
  let token = localStorage.getItem("authToken");

  // اگر توکن وجود نداشته باشههه یک توکن فرضی برای تست قرار می‌دیم
  if (!token) {
    token = "12345testTokennnnnnnnn"; // توکن فرضی
    localStorage.setItem("authToken", token);
  }


  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(reservationData)
  })
  .then(response => response.json()) 
  .then(data => {
    // شبیه‌سازی دریافت توکن از پاسخ
    const fakeToken = 'token_' + Math.random().toString(36).substr(2); // توکن ساختگی
    localStorage.setItem("authToken", fakeToken); // ذخیره توکن در localStorage
    alert(fakeToken);  

    console.log('New Fake Token:', fakeToken); 

    console.log('Success:', data);
    document.querySelector('#successMessage').style.display = 'block'; // نمایش پیام موفقیت
  })
  .catch((error) => {
    console.error('Error:', error); // خطا در ارسال
  });
});
