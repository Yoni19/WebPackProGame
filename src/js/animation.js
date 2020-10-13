import anime from "animejs/lib/anime.es.js";



const observerAnimation = (observables) => {
    let observation = 0.2;
    const flyingPage = (target) => {
      anime({
        targets: target,
        translateY: [-500, 0],
        duration: 2500,
      });
    };

    const animation = (cards) => {
      cards.forEach((card) => {
        if (card.intersectionRatio >= observation) {
          flyingPage(card.target);
          observer.unobserve(card.target);
        }
      });
    };
  
    let observer = new IntersectionObserver(
      (entries) => {
        animation(entries);
      },
      { threshold: observation }
    );
    document.querySelectorAll(observables).forEach((item) => {
      observer.observe(item);
    });
  };
  

  
const pushNewContent = () => {
    window.scrollBy(0, window.innerHeight / 3);
  };
  
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  export{pushNewContent,observerAnimation,backToTop};