// assets/js/script.js

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Se o scroll for maior que 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log("Site da SEID carregado com sucesso.");

    // Inicia a biblioteca de animações
    AOS.init({
        duration: 800, // Duração da animação em milissegundos
        once: true,    // Anima apenas uma vez
        offset: 100,   // Começa a animação um pouco antes do elemento aparecer
    });

    const testimonialSliderElement = document.querySelector('.testimonial-slider');

    if (testimonialSliderElement) {
        // Se ele existir, aí sim iniciamos o Swiper
        const testimonialSlider = new Swiper('.testimonial-slider', {
            // Opções
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                }
            }
        });
    }

    // --- NOVO: FUNCIONALIDADE DO MENU HAMBÚRGUER ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    
    // Verifica se os elementos existem antes de adicionar o evento
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            // Adiciona/remove a classe 'active' nos dois elementos
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Bônus: Impede o scroll da página quando o menu está aberto
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- Funcionalidade da Máscara de Telefone ---
    const phoneInputs = document.querySelectorAll('.phone-mask');
    const handlePhoneInput = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.substring(0, 11);
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = '(' + value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ') ' + value.substring(2, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 11);
        }
        e.target.value = formattedValue;
    };
    phoneInputs.forEach(input => {
        input.addEventListener('input', handlePhoneInput);
    });

    // --- Funcionalidade do Acordeão (FAQ) ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const clickedItem = question.closest('.faq-item');
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                if (openItem !== clickedItem) {
                    openItem.classList.remove('active');
                }
            });
            clickedItem.classList.toggle('active');
        });
    });

    // --- Funcionalidade da Página de Serviços ---
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceDetails = document.querySelectorAll('.service-detail');

    // Verifica se os elementos da página de serviços existem antes de adicionar os eventos
    // Isso evita erros em outras páginas que não têm esses elementos.
    if (serviceLinks.length > 0 && serviceDetails.length > 0) {
        
        serviceLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Previne o comportamento padrão do link
                event.preventDefault();

                // Pega o valor do atributo 'data-service' do link clicado
                const serviceId = this.dataset.service;

                // Remove a classe 'active' de todos os links
                serviceLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                // Adiciona a classe 'active' apenas no link que foi clicado
                this.classList.add('active');
                
                // Esconde todos os painéis de detalhes
                serviceDetails.forEach(detail => {
                    detail.classList.remove('active');
                });

                // Mostra o painel de detalhe correto
                const activeDetailPanel = document.getElementById(serviceId);
                if (activeDetailPanel) {
                    activeDetailPanel.classList.add('active');
                }
            });
        });
    }
    // --- NOVO: FUNCIONALIDADE DE VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contact-form');

    // Este 'if' garante que o código só vai rodar se o formulário existir na página atual
    if (contactForm) {
        const validator = new JustValidate(contactForm, {
            validateBeforeSubmitting: true, // Valida os campos em tempo real
        });

        validator
            .addField('#form-nome', [
                { rule: 'required', errorMessage: 'O nome é obrigatório' },
                { rule: 'minLength', value: 3, errorMessage: 'O nome precisa ter no mínimo 3 caracteres' }
            ])
            .addField('#form-empresa', [
                { rule: 'required', errorMessage: 'O nome da imobiliária é obrigatório' }
            ])
            .addField('#form-email', [
                { rule: 'required', errorMessage: 'O e-mail é obrigatório' },
                { rule: 'email', errorMessage: 'Por favor, insira um e-mail válido' }
            ])
            .addField('#form-telefone', [
                { rule: 'required', errorMessage: 'O WhatsApp é obrigatório' },
                { rule: 'minLength', value: 14, errorMessage: 'Preencha o telefone completo' } // (XX)XXXXX-XXXX tem 15 caracteres
            ])
            .addField('#form-redes', [
                { rule: 'required', errorMessage: 'Este campo é obrigatório' }
            ])
            .addField('#form-faturamento', [
                { rule: 'required', errorMessage: 'Por favor, selecione uma opção' }
            ])
            .onSuccess((event) => {
                // Este código roda QUANDO o formulário é válido e o botão de enviar é clicado.
                console.log('Formulário válido!', event);
                
                // Previne o envio padrão para podermos adicionar nossa lógica
                event.preventDefault();

                // Exemplo: Mostrar um alerta de sucesso
                alert('Diagnóstico solicitado com sucesso! Entraremos em contato em breve.');
                
                // Aqui você adicionaria o código para enviar os dados para um servidor/email.
                // contactForm.submit(); // Descomente esta linha se quiser o envio padrão do HTML
            });
    }
});