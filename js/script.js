window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Slider 

    let slideIndex = 1,
    slides = document.querySelectorAll('.a-slide'),
    dotsWrap = document.querySelector('.slick-dots'),
    dots = document.querySelectorAll('.slick-dots li');

    if (dotsWrap) {
        function showSlides(item) {

            if (item > slides.length) {
                slideIndex = 1;
            }
            if (item < 1) {
                slideIndex = slides.length;
            }
            slides.forEach((slide) => {
                slide.style.display = 'none';
                slide.style.opacity = 0.1;
            });
            dots.forEach((dot) => dot.classList.remove('slick-active'));
    
            slides[slideIndex - 1].style.display = 'block';
            changeOpacity(slides[slideIndex - 1], 0, 1);
    
            dots[slideIndex - 1].classList.add('slick-active');
        };
    
        function changeOpacity(element, from, to) {
            let timer = setInterval(function() {
                if (from >= to) {
                    clearInterval(timer);
                }
                else {
                    from += 0.1;
                    element.style.opacity = from;
                }
            }, 100);
        }
    
        function currentSlide(item) {
            showSlides(slideIndex = item);
        }
    
        function autoScroll() {
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            setInterval(function() {currentSlide(slideIndex); slideIndex++}, 3000);
        }

        dotsWrap.addEventListener('click', function(event) {
            for (let i = 0; i < dots.length + 1; i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                    currentSlide(i);
                }
            }
        });
    
        autoScroll();
    }

    

    // Slider end

    // Tab hightlighting    
    let tabLinks = document.querySelectorAll('#navigation li a'),
    currentURL = document.URL.split('/'),
    currentDomain = currentURL[3];

    tabLinks.forEach(function(element) {
        let attrValue = element.getAttribute('href');
        if (attrValue == currentDomain) {
            element.classList.add('active');
        }
    })

    // Modal window on Invitation page

    let btnDelete = document.querySelector('.choice__btn.choice__btn-4'),
        btnEdit = document.querySelector('.choice__btn.choice__btn-1'),
        overlayBlock = document.querySelector('#overlay-modal'),
        modalBlock = document.querySelector('#invitationModal .invitation-block'),
        modalInputs = document.querySelectorAll('.invitation-block__input'),
        inviteField = document.querySelectorAll('.invitation-block__field'),
        initialData = ['Андрей и Марина', '23 сентября в 13:00', 'г. Москва, ул. Комсомольская, 37. Ресторан “Прага"'];

    if (btnEdit) {
        btnEdit.addEventListener('click', function() {
            showHide(1, 1);
        });
    
        if (overlayBlock) {
            overlayBlock.addEventListener('click', function() {
                let emptyFields = 0;
                for (let i = 0; i < modalInputs.length; i++) {
                    if (modalInputs[i].value == '') {
                        emptyFields++;
                    }
                }
                if (emptyFields == 0) {
                    for (let i = 0; i < inviteField.length; i++) {
                        inviteField[i].innerHTML = modalInputs[i].value;
                        modalInputs[i].value = '';
                    }
                }
                showHide(0, 0);
            });
        }
    
        btnDelete.addEventListener('click', function() {
        for (let i = 0; i < inviteField.length; i++) {
            inviteField[i].innerHTML = initialData[i];
        }
        });
    
        function showHide(opacity, willBeVisible) {
            overlayBlock.style.opacity = opacity;
            modalBlock.style.opacity = opacity;
            if (willBeVisible == 1) {
                overlayBlock.style.visibility = 'visible';
                modalBlock.style.visibility = 'visible';
            }
            else if (willBeVisible == 0) {
                overlayBlock.style.visibility = 'hidden';
                modalBlock.style.visibility = 'hidden';
            }
            else {
                console.log('Ошибка значения!')
            }
        }
    }
    
    // Form adjustments 

    let formInput = document.querySelectorAll('.form-addguest input'),
        textFields = document.querySelectorAll('.builder3-block__text'),
        nameList = document.querySelector('.builder3-block'),
        blockAdd = document.querySelector('.block-add'),
        paragraph = document.createElement('p'),
        btnAdd = document.querySelector('.form-button__add');

    paragraph.classList.add('builder3-block__text');

    for (let i = 0; i < formInput.length; i++) {
        formInput[i].addEventListener('input', function() {
            this.value = this.value.replace (/[A-Za-z0-9]/, '');
        });
    }
    if (formInput && btnAdd) {
        btnAdd.addEventListener('click', function(e) {
            e.preventDefault();
            if (formInput[0] != '' && formInput[1] != '') {
                paragraph.textContent = `${formInput[0].value} ${formInput[1].value}`;
                // blockAdd.appendChild(paragraph);
                blockAdd.insertAdjacentElement('beforeend', paragraph);
                formInput[0].value = formInput[1].value = '';
            }
           
        });

        btnDelete.addEventListener('click', function() {
            for (let i = 0; i < textFields.length; i++) {
                textFields[i].innerHTML = '';
            }
            });

        formInput[0].addEventListener('input', function() {
            if (formInput[1].value != '') {
                btnAdd.disabled = false;
            }
            else {
                btnAdd.disabled = true;
            }
        });

        formInput[1].addEventListener('input', function() {
            if (formInput[0].value != '') {
                btnAdd.disabled = false;
            }
            else {
                btnAdd.disabled = true;
            }
        });

    }


});