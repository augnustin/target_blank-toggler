(function(){
  var toggleLinksTargetBlank = function(isToggled) {
    var $links = document.getElementsByTagName('a');
    for (var i=0; i<$links.length; i++) {
      var $link = $links[i];
      if (isToggled) {
        $link.setAttribute('data-external', $link.getAttribute('target') === '_blank');
      }
      if (($link.getAttribute('data-external') === 'true') === isToggled) {
        $link.removeAttribute('target');
      } else {
        $link.setAttribute('target', $link.getAttribute('target') || '_blank');
      }
      if (!isToggled) {
        $link.removeAttribute('data-external');
      }
    }
  };

  var needsToggle = function(e) {
    return e.which === 88;
  };

  if (document.documentElement.classList.contains('link-toggler'))
    return;

  document.addEventListener('keydown', function(downEvent){
    if (!downEvent.repeat && needsToggle(downEvent)) {
      toggleLinksTargetBlank(true);
      var onceListener = function(upEvent) {
        toggleLinksTargetBlank(false);
        document.removeEventListener('keyup', onceListener);
      };
      document.addEventListener('keyup', onceListener);
    }
  });

})();
