(function(){
  var findLink = function($node) {
    return (!$node || ($node.tagName === 'A')) ? $node : findLink($node.parentNode);
  };

  var toggleLinksTargetBlank = function(isToggled) {
    var dataAttr = 'data-initial-target-blank';
    var $links = document.getElementsByTagName('a');
    var clickOpenInCurrentTab = function(clickEvent) {
      var $link = findLink(clickEvent.target);
      if ($link) {
        window.location.href = $link.getAttribute('href');
        clickEvent.preventDefault();
      }
    };

    for (var i=0; i<$links.length; i++) {
      var $link = $links[i];
      if (isToggled) {
        $link.setAttribute(dataAttr, $link.getAttribute(dataAttr) || ($link.getAttribute('target') === '_blank'));
        if ($link.getAttribute(dataAttr) === 'true') {
          $link.addEventListener('click', clickOpenInCurrentTab);
        }
      }
      if (($link.getAttribute(dataAttr) === 'true') === isToggled) {
        $link.removeAttribute('target');
      } else {
        $link.setAttribute('target', $link.getAttribute('target') || '_blank');
      }
      if (!isToggled) {
        if ($link.getAttribute(dataAttr) === 'true') {
          $link.removeEventListener('click', clickOpenInCurrentTab);
        }
        $link.removeAttribute(dataAttr);
      }
    }
  };

  var needsToggle = function(e) {
    return (e.metaKey || e.ctrlKey) && e.shiftKey && e.code.match(/^(Shift|Control)/);
  };

  if (document.documentElement.classList.contains('link-toggler')) {
    console.log('Behavior already loaded on website');
    return;
  }
  document.documentElement.classList.add('link-toggler');

  document.addEventListener('keydown', function(downEvent){
    if (needsToggle(downEvent)) {
      toggleLinksTargetBlank(true);
      var onceListener = function(upEvent) {
        window.removeEventListener('blur', onceListener);
        document.removeEventListener('keyup', onceListener);
        toggleLinksTargetBlank(false);
      };
      // Deactivate either on keyup or on blur to go to new window
      document.addEventListener('keyup', onceListener);
      window.addEventListener('blur', onceListener);
    }
  });
})();
