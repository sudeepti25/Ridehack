document.addEventListener('DOMContentLoaded', function () {
    var options = {
        strings: [
            "The ultimate destination for hackathon enthusiasts!",
            "Ready to innovate?",
            "Sign up and start collaborating today!"
        ],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true
    };
    var typed = new Typed("#typed", options);
});

// Scroll event listener for feature box animations
document.addEventListener('scroll', function() {
    var featureBoxes = document.querySelectorAll('.feature-box');
    var triggerHeight = window.innerHeight / 1.1;
    featureBoxes.forEach((box, index) => {
        var boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerHeight) {
            setTimeout(() => {
                box.style.opacity = 1;
                box.style.transform = 'translateY(0)';
                box.style.animation = 'popUp 0.5s ease-out';
            }, index * 300); // Delay based on the index
        }
    });
});
// faq option
document.querySelectorAll('.faq-boxes').forEach(faqBox => {
    const faqQuestionBox = faqBox.querySelector('.faq-question-box');
    const answerBox = faqBox.querySelector('.faq-answer-box');
    const faqToggle = faqBox.querySelector('.faq-toggle');

    faqQuestionBox.addEventListener('click', () => {
        answerBox.classList.toggle('faq-answer-box-show');
       
    });
});
