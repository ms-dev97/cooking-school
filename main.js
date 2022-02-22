// pre load

window.addEventListener('load',function() {
    document.querySelector('.loading').style.opacity = '0'
    document.querySelector('.loading').style.transition = 'opacity 1.5s'
    setTimeout(() => document.querySelector('.loading').style.display = 'none', 1500)
});


// Mobile Menu

const header = document.querySelector('header .overlay'),
      navicon = header.querySelector('.navicon'),
      navList = header.querySelector('.nav-list'),
      mainNav = header.querySelector('.main-nav'),
      headerSlider = header.querySelector('.slider'),
      headerSlides = headerSlider.querySelectorAll('.slide'),
      diamonds = header.querySelector('.diamonds'),
      numbers = document.querySelector('.numbers'),
      numbersText = numbers.querySelectorAll('i + p');
let textCount = 0;

navicon.addEventListener('click', function() {
    navList.classList.toggle('visible');
});

window.addEventListener('scroll', function() {
    
    if (window.scrollY >= mainNav.offsetHeight) {
        mainNav.classList.add('menu-scroll');
    } else {
        mainNav.classList.remove('menu-scroll');
    }
    
    // Number Count
    if (window.scrollY + window.innerHeight >= (numbers.offsetTop) + numbers.offsetHeight / 2) {
        numbersText.forEach(number => {
            const numberText = parseInt(number.textContent);
            // let textCount = 0;
            setInterval(() => {
                if (textCount >= numberText) return;
                textCount++;
                number.textContent = textCount;
            }, 10);
        });
    }
    
});

// Navbar Search Box
document.querySelector('.search-box').addEventListener('click', function() {
    this.classList.toggle('open');
});

// Header Slider
for (let i = 0; i < headerSlides.length; i++) {    
    let diamond = document.createElement('div');
    diamond.classList.add('diamond');
    diamond.setAttribute('data-slide', i);
    diamonds.appendChild(diamond);
}

const diamond = diamonds.querySelectorAll('.diamond');
diamond[0].classList.add('active');

function slide() {
    diamond.forEach(a => a.classList.remove('active'));
    this.classList.add('active');
    
    headerSlider.style.transform = `translateX(-${this.dataset.slide}00%)`;
}

diamond.forEach(a => a.addEventListener('click', slide));

// Portfolio Filter Images

const portfolio = document.querySelector('.filter-imgs'),
      portfolioItems = portfolio.querySelectorAll('.filter-img'),
      portfolioCats = document.querySelectorAll('.filter > li');

function translateGallery(elWrapper, elChildren, filter = '*') {
    const portfolio = elWrapper,
          parentWidth = portfolio.offsetWidth,
          children = elChildren,
          childCount = children.length,
          windowWidth = window.innerWidth;

    let x = 0,
        y = 0,
        rowItems;

    if (windowWidth <= 768) {
        rowItems = 1;
    } else if (windowWidth <= 992) {
        rowItems = 2;
    } else {
        rowItems = 3;
    }

    const itemWidth = parentWidth/rowItems;

    portfolio.style.height = `${Math.ceil(portfolio.childElementCount/rowItems)*250}px`;
    if (filter === '*') {
        children.forEach(child => {
            child.style.cssText = `transform: translate3d(${x*itemWidth}px, ${y*250}px, 0); opacity: 1;`;
            x++;
            if (x%rowItems === 0) {
                x = 0;
                y++;
            }
        });
        return;
    }

    children.forEach((child, i) => {
        if (child.dataset.filter.includes(filter)) {
            child.style.cssText = `transform: translate3d(${x*itemWidth}px, ${y*250}px, 0); opacity: 1;`;
            x++;
            portfolio.style.height = `${(y+1)*250}px`;
            if (x%rowItems === 0) {
                x = 0;
                y++;
            }
        } else {
            child.style.cssText = 'transform: scale(0.1); opacity: 0;';
        }
    });
}

portfolioCats.forEach(cat => {
    cat.addEventListener('pointerdown', function() {
        portfolioCats.forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');
        const dataFilter = this.dataset.filter;
        translateGallery(portfolio, portfolioItems, dataFilter);
    });
});

translateGallery(portfolio, portfolioItems);


// Blog Slider
 const blogSlider = document.querySelector('.blog .slider'),
       blogContainer = blogSlider.querySelector('.blogs'),
       sliderControls = blogSlider.querySelectorAll('.controls i');
let transform = 0;

sliderControls.forEach(control => control.addEventListener('click', function() {
    if (this.classList.contains('fa-chevron-right')) {
        transform += 25;
        if (transform > 100) {
            transform = 100;
            return;
        }
        blogContainer.style.transform = `translateX(${-transform}%)`;
    } else if (this.classList.contains('fa-chevron-left')) {
        transform -= 25;
        if (transform < 0) {
            transform = 0;
            return;
        }
        blogContainer.style.transform = `translateX(${-transform}%)`;
    }
}));

// Theme Sldier
const themeSLider = document.querySelector('.impression'),
      themeContainer = themeSLider.querySelector('.impression .slide'),
      themeBubbles = themeSLider.querySelectorAll('.impression .bubbles > div');
let themeCount = 0;

function themeSlideshow() {
    themeBubbles.forEach(a => a.classList.remove('active'));
    this.classList.add('active');
    themeContainer.style.transform = `translateX(${-this.dataset.bubble * 100}%)`;
    themeCount = this.dataset.bubble;
}

themeBubbles.forEach(bubble => bubble.addEventListener('click', themeSlideshow));

setInterval(function() {
    themeBubbles.forEach(a => a.classList.remove('active'));
    themeBubbles[themeCount].classList.add('active');
    themeContainer.style.transform = `translateX(${-themeCount * 100}%)`;
    themeCount++;
    if (themeCount > themeBubbles.length - 1) {
        themeCount = 0;
    }
}, 2000);


























