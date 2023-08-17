import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// 장바구니 기능

const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

// 장바구니 보이기
function showBasket() {
  basketEl.classList.add('show')
}

// 장바구니 숨기기
function hideBasket() {
  basketEl.classList.remove('show')
}

// 드롭다운
basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  if (basketEl.classList.contains('show')) {
    // hide
    hideBasket()
  } else {
    showBasket()
  }
})

basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})

window.addEventListener('click', function () {
  hideBasket()
})

// 검색창 기능
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, i) {
    el.style.transitionDelay = i * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, i) {
    el.style.transitionDelay = i * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, i) {
    el.style.transitionDelay = i * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, i) {
    el.style.transitionDelay = i * .4 / searchDelayEls.length + 's'
  })
  searchInputEl.value = ''
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})

// 비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function () {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// 아이템 렌더링
const itemsEl = document.querySelector('section.compare .items')

ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})


// 네비게이션 렌더링
const navigationsEl = document.querySelector('footer .navigations')

navigations.forEach(function (navigation) {
  const navigationEl = document.createElement('div')
  navigationEl.classList.add('map')

  let navList = ''
  navigation.maps.forEach(function (nav) {
    navList += /* html */`
      <li>
        <a href="${nav.url}">${nav.name}</a>
      </li>
      `
  })

  navigationEl.innerHTML = /* html */`
    <h3>
      <span class="text">${navigation.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${navList}
    </ul>
  `

  navigationsEl.append(navigationEl)
})


// 카피라이트 년도 표기
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()
