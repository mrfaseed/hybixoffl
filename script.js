(async function run() {
    // NEW: Control the animation speed here. 1 is normal speed, 0.5 is half speed, etc.
    const playbackSpeed = 0.75;

    const animBox = document.getElementById('animBox');
    const content = document.getElementById('content');

    const animationPaths = [
        'animation_hybix_intro.json',
        'slice_screen.json'
    ];

    try {
        const [introData, sliceData] = await Promise.all(
            animationPaths.map(path => fetch(path).then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
                }
                return res.json();
            }))
        );

        function playAnimation(container, animationData) {
            return new Promise((resolve) => {
                container.innerHTML = '';

                const anim = lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    animationData: animationData,
                 
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                });

              
                anim.setSpeed(playbackSpeed);

                let completed = false;
                const onComplete = () => {
                    if (completed) return;
                    completed = true;
                    anim.destroy();
                    resolve();
                };

                anim.addEventListener('complete', onComplete);

                anim.addEventListener('DOMLoaded', () => {
          
                    const duration = (anim.getDuration(false) * 1000) / playbackSpeed;
                    setTimeout(onComplete, duration);
                });
            });
        }

        await playAnimation(animBox, introData);
        await playAnimation(animBox, sliceData);

        
        animBox.remove();
        content.style.display = 'block';

    } catch (error) {
        console.error('Animation failed:', error);
        if (animBox) animBox.remove();
        content.style.display = 'block';
    }
})();