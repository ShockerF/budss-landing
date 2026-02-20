// подключаю бургер-меню и мобильную навигацию
const burger = document.querySelector('.header__burger');
const mobileNav = document.getElementById('mobile-nav');

// при клике на бургер открываю/закрываю меню
burger.addEventListener('click', function() {
  const isOpen = burger.classList.toggle('is-open');
  mobileNav.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});

// если кликнули по ссылке внутри мобильного меню - закрываем его
mobileNav.querySelectorAll('a, button').forEach(function(link) {
  link.addEventListener('click', function() {
    burger.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

// переключатель вкладок For Business / For Customers
document.querySelectorAll('.header__tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    // сначала снимаем активный класс со всех вкладок
    document.querySelectorAll('.header__tab').forEach(function(t) {
      t.classList.remove('header__tab--active');
    });
    // потом добавляем на ту, по которой кликнули
    tab.classList.add('header__tab--active');
  });
});

// анимация появления карточек при скролле
// IntersectionObserver следит - видно ли элемент на экране
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      // небольшая задержка для каждой карточки - выглядит красиво
      setTimeout(function() {
        entry.target.classList.add('is-visible');
      }, i * 120);
      observer.unobserve(entry.target); // больше не наблюдаем за этим элементом
    }
  });
}, { threshold: 0.1 });

// скрываем карточки и запускаем наблюдение
document.querySelectorAll('.feature, .about__left').forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// --- МОДАЛЬНОЕ ОКНО ---

const modal = document.getElementById('contact-modal');
const form = document.getElementById('contact-form');
const successBlock = document.getElementById('modal-success');

// открыть модалку
function openModal() {
  modal.classList.add('modal--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // чтобы страница не скроллилась
  // через 100мс ставим фокус на первое поле
  setTimeout(function() {
    document.getElementById('field-name').focus();
  }, 100);
}

// закрыть модалку
function closeModal() {
  modal.classList.remove('modal--open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// вешаем открытие на все кнопки Contact sales
document.querySelectorAll('.js-open-modal').forEach(function(btn) {
  btn.addEventListener('click', openModal);
});

// вешаем закрытие
document.querySelectorAll('.js-close-modal').forEach(function(btn) {
  btn.addEventListener('click', closeModal);
});

// закрытие по Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// --- МАСКА ТЕЛЕФОНА ---

const phoneInput = document.getElementById('field-phone');

phoneInput.addEventListener('input', function() {
  // оставляем только цифры
  let val = this.value.replace(/\D/g, '');

  // если ввели с 8 - заменяем на 7
  if (val.startsWith('8')) {
    val = '7' + val.slice(1);
  }
  if (!val.startsWith('7')) {
    val = '7' + val;
  }

  val = val.slice(0, 11); // максимум 11 цифр

  // форматируем в +7 (___) ___-__-__
  let result = '+7';
  if (val.length > 1) result += ' (' + val.slice(1, 4);
  if (val.length >= 4) result += ') ' + val.slice(4, 7);
  if (val.length >= 7) result += '-' + val.slice(7, 9);
  if (val.length >= 9) result += '-' + val.slice(9, 11);

  this.value = result;
});

// блокируем ввод не-цифр
phoneInput.addEventListener('keydown', function(e) {
  const serviceKeys = [8, 46, 9, 27, 13, 37, 38, 39, 40]; // backspace, delete, tab и т.д.
  if (serviceKeys.includes(e.keyCode)) return;
  if (!/[0-9+]/.test(e.key)) {
    e.preventDefault();
  }
});

// при фокусе автоматически ставим +7 (
phoneInput.addEventListener('focus', function() {
  if (!this.value) {
    this.value = '+7 (';
  }
});

// --- ВАЛИДАЦИЯ ФОРМЫ ---

// правила для каждого поля
var rules = {
  name: {
    validate: function(v) {
      return v.trim().length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(v.trim());
    },
    message: 'Введите имя (минимум 2 буквы)'
  },
  email: {
    validate: function(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    },
    message: 'Введите корректный email'
  },
  phone: {
    validate: function(v) {
      return v.replace(/\D/g, '').length === 11;
    },
    message: 'Введите полный номер телефона'
  }
};

// показать ошибку под полем
function showError(fieldName, message) {
  var input = document.getElementById('field-' + fieldName);
  var error = document.getElementById('error-' + fieldName);
  input.classList.add('form-field__input--error');
  input.classList.remove('form-field__input--valid');
  error.textContent = message;
  error.style.display = 'block';
}

// убрать ошибку, показать зеленую рамку
function showValid(fieldName) {
  var input = document.getElementById('field-' + fieldName);
  var error = document.getElementById('error-' + fieldName);
  input.classList.remove('form-field__input--error');
  input.classList.add('form-field__input--valid');
  error.style.display = 'none';
}

// проверить одно поле
function validateField(name) {
  var input = document.getElementById('field-' + name);
  var rule = rules[name];
  if (!rule) return true;

  if (rule.validate(input.value)) {
    showValid(name);
    return true;
  } else {
    showError(name, rule.message);
    return false;
  }
}

// проверяем поле когда уходим из него (blur)
// и перепроверяем на каждый ввод если уже есть ошибка
Object.keys(rules).forEach(function(name) {
  var input = document.getElementById('field-' + name);

  input.addEventListener('blur', function() {
    validateField(name);
  });

  input.addEventListener('input', function() {
    if (input.classList.contains('form-field__input--error')) {
      validateField(name);
    }
  });
});

// отправка формы
form.addEventListener('submit', function(e) {
  e.preventDefault(); // отменяем стандартную отправку

  // проверяем все обязательные поля
  var nameOk  = validateField('name');
  var emailOk = validateField('email');
  var phoneOk = validateField('phone');

  if (!nameOk || !emailOk || !phoneOk) {
    return; // если есть ошибки - не отправляем
  }

  // имитируем отправку на сервер
  var submitBtn = form.querySelector('.modal__submit');
  submitBtn.textContent = 'Отправка...';
  submitBtn.disabled = true;

  setTimeout(function() {
    // показываем экран успеха
    form.style.display = 'none';
    successBlock.style.display = 'flex';
    successBlock.setAttribute('aria-hidden', 'false');

    // через 3 секунды сбрасываем всё обратно
    setTimeout(function() {
      form.reset();
      form.style.display = '';
      successBlock.style.display = 'none';
      successBlock.setAttribute('aria-hidden', 'true');
      submitBtn.textContent = 'Отправить заявку';
      submitBtn.disabled = false;

      // убираем классы валидации с полей
      document.querySelectorAll('.form-field__input').forEach(function(inp) {
        inp.classList.remove('form-field__input--valid', 'form-field__input--error');
      });
      document.querySelectorAll('.form-field__error').forEach(function(err) {
        err.style.display = 'none';
      });
    }, 3000);

  }, 1000);
});
