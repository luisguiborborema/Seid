// assets/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Site da SEID carregado com sucesso.");

    // Futuramente, você pode adicionar aqui:
    // 1. Lógica para o menu mobile (hambúrguer).
    // 2. Animações de scroll para revelar elementos.
    // 3. Validação avançada do formulário de contato.
    // 4. Um carrossel para os depoimentos ou portfólio.

    
    // Seleciona todos os inputs com a classe 'phone-mask'
    const phoneInputs = document.querySelectorAll('.phone-mask');

    // Função que aplica a máscara
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

    // Adiciona o 'escutador' de evento a cada campo de telefone
    phoneInputs.forEach(input => {
        input.addEventListener('input', handlePhoneInput);
    });

    // --- Funcionalidade do Acordeão (FAQ) ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Encontra o .faq-item pai do elemento clicado
            const clickedItem = question.closest('.faq-item');

            // Encontra todos os itens que já estão abertos (com a classe .active)
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                // Se o item aberto não for o que acabamos de clicar, feche-o
                if (openItem !== clickedItem) {
                    openItem.classList.remove('active');
                }
            });

            // Agora, abra ou feche o item que foi clicado
            clickedItem.classList.toggle('active');
        });
    });
});