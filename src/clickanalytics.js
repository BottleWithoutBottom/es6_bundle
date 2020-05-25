function startAnalytics() {
  let clickcount = 0;
  let clicklistener = () => clickcount++;
  let isDestroyed = false;
  
  document.addEventListener('click', clicklistener);
  
  return {
    destroy() {
      document.removeEventListener('click', clicklistener)
      isDestroyed = true
    },
    getClicks() {
      if (isDestroyed) {
        return 'analytics was closed'
      }
      return clickcount;
    }  
  }
}

window.analytics = startAnalytics();