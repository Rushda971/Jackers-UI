function initFallingCards(containerSelector = ".vortex", count = 28) {

    const vortex = document.querySelector(containerSelector);
    if (!vortex) return;

    function rand(min,max){return Math.random()*(max-min)+min;}

    const suits = ['♥','♠','♣','♦'];
    const colors = {
        '♥':'#ff2b2b','♦':'#ff2b2b',
        '♠':'#111','♣':'#111'
    };

    for(let i=0;i<count;i++){
        const c = document.createElement('div');
        c.className='card';
        
        const suit = suits[Math.floor(Math.random()*suits.length)];
        c.innerHTML = `<div class="suit" style="color:${colors[suit]}">${suit}</div>`;
        
        const size = rand(40,96);
        c.style.width = size+'px';
        c.style.height = Math.round(size*1.4)+'px';
        c.style.left = rand(-20,120) + '%';
        c.style.top = rand(-30,10) + '%';
        c.style.opacity = rand(0.35,0.95);
        c.style.transform = `rotate(${rand(-40,40)}deg)`;
        
        vortex.appendChild(c);

        (function(el){
            const duration = rand(6000,14000);
            const delay = rand(0,2000);
            el.animate(
                [
                    { transform: `translateY(0) rotate(${rand(-20,20)}deg)`, opacity: el.style.opacity },
                    { transform:`translateY(120vh) rotate(${rand(140,360)}deg)`, opacity: 0.1 }
                ],
                {
                    duration,
                    delay,
                    iterations: Infinity,
                    easing:'cubic-bezier(.2,.8,.2,1)'
                }
            );
        })(c);
    }
}