// Javascript DOM - Navigasi
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navList = document.querySelector('.nav-list');
const menuBtn = document.querySelector('.menu-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const pageScroll = document.querySelectorAll('.page-scroll');

menuBtn.onclick = () => {
  navList.classList.add('active');
  menuBtn.classList.add('hide');
  cancelBtn.classList.add('show');
  body.classList.add('disabledScroll');
};

cancelBtn.onclick = () => {
  navList.classList.remove('active');
  menuBtn.classList.remove('hide');
  cancelBtn.classList.remove('show');
  body.classList.remove('disabledScroll');
};

// Dropdown Menu
const dropDown = document.querySelector('.dropdown');
const subMenu = document.querySelector('.submenu');

dropDown.addEventListener('click', function (e) {
  if (subMenu.classList.contains('submenu-hide')) {
    subMenu.classList.add('submenu-show');
    subMenu.classList.remove('submenu-hide');
  } else if (subMenu.classList.contains('submenu-show')) {
    subMenu.classList.remove('submenu-show');
    subMenu.classList.add('submenu-hide');
  }

  e.preventDefault();
});

// Ketika Scroll, tambah class sticky di Nav
window.onscroll = () => {
  this.scrollY > 20 ? nav.classList.add('sticky') : nav.classList.remove('sticky');
};

// Page scroll Offset
pageScroll.forEach((scroll) => {
  scroll.addEventListener('click', function (e) {
    e.preventDefault();
    const tujuan = this.getAttribute('href');
    const elemenTujuan = document.querySelector(tujuan);
    const posisiTujuan = elemenTujuan.offsetTop - 96;

    window.scrollTo({
      top: posisiTujuan,
      behavior: 'smooth',
    });
  });
});

let listMatkul = [];

const listMatkulEle = document.querySelector('#list-matkul');

for (let index = 6; index >= 1; index--) {
  const h1 = document.createElement('h1');
  h1.id = 'semester-0' + index;
  h1.className = 'semester';
  h1.textContent = 'Semester 0' + index;
  listMatkulEle.appendChild(h1);

  const div = document.createElement('div');
  div.id = 'semester-0' + index + '-list';
  div.className = 'list-course';
  listMatkulEle.appendChild(div);

  const hr = document.createElement('hr');
  listMatkulEle.appendChild(hr);
}

const semester06 = document.querySelector('#semester-06-list');
const semester05 = document.querySelector('#semester-05-list');
const semester04 = document.querySelector('#semester-04-list');
const semester03 = document.querySelector('#semester-03-list');
const semester02 = document.querySelector('#semester-02-list');
const semester01 = document.querySelector('#semester-01-list');

// Fetch data matkul
fetch('./assets/json/list-matkul.json')
  .then((response) => response.json())
  .then((data) => {
    listMatkul = data;
    listMatkul.forEach((matkul) => {
      const article = document.createElement('article');
      article.className = 'course';

      const h1 = document.createElement('h1');
      h1.textContent = matkul.name;
      article.appendChild(h1);

      const h3Info = document.createElement('h3');
      h3Info.className = 'info-matkul';
      h3Info.textContent = `${matkul.kelompok} • ${matkul.sks} SKS • ${matkul['ruang-01']}, ${matkul['ruang-02']}`;
      article.appendChild(h3Info);

      const h3Dosen = document.createElement('h3');
      h3Dosen.className = 'dosen';
      h3Dosen.textContent = '👨‍🏫 ' + matkul.dosen;
      article.appendChild(h3Dosen);

      const p = document.createElement('p');
      p.textContent = matkul.description;
      article.appendChild(p);

      switch (matkul.semester) {
        case 6:
          semester06.appendChild(article);
          break;
        case 5:
          semester05.appendChild(article);
          break;
        case 4:
          semester04.appendChild(article);
          break;
        case 3:
          semester03.appendChild(article);
          break;
        case 2:
          semester02.appendChild(article);
          break;
        case 1:
          semester01.appendChild(article);
          break;
        default:
          break;
      }
    });
  });
