(async function run() {
    const playbackSpeed = 1;
    const animBox = document.getElementById('animBox');
    const content = document.getElementById('content');

    const animationPaths = [
        'animation_hybix_intro.json',
        'slice_screen.json'
    ];

    try {
        const [introData, sliceData] = await Promise.all(
            animationPaths.map(path => fetch(path).then(res => {
                if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
                return res.json();
            }))
        );

        // helper: play one animation
        function playAnimation(container, animationData) {
            return new Promise((resolve) => {
                container.innerHTML = '';

                const anim = lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
                });

                anim.setSpeed(playbackSpeed);

                anim.addEventListener('complete', () => {
                    anim.destroy();
                    resolve();
                });
            });
        }

        // Play intro + slice
        await playAnimation(animBox, introData);
        await playAnimation(animBox, sliceData);

        // ✅ FADE OUT LOADER, FADE IN CONTENT
        animBox.style.transition = "opacity 0.8s ease";
        animBox.style.opacity = "0";

        setTimeout(() => {
            animBox.remove();
            content.classList.add("show");   // make content visible
            document.body.style.overflow = "auto"; // allow scrolling
        }, 800);

    } catch (error) {
        console.error('Animation failed:', error);
        if (animBox) animBox.remove();
        content.classList.add("show");
        document.body.style.overflow = "auto";
    }
})();
