const anim = lottie.loadAnimation({
  container: document.getElementById('animBox'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'animation_hybix_intro.json',
  rendererSettings: {
   preserveAspectRatio: 'none'
 // this makes it stretch to fill container
  }
});
