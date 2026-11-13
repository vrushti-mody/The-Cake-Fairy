(() => {
  const iconIds = new Map([
    ['↗', 'arrow-up-right'], ['↓', 'arrow-down'], ['←', 'arrow-left'], ['→', 'arrow-right'],
    ['★', 'star'], ['✳', 'sparkle'], ['◷', 'clock'], ['◈', 'diamond'], ['⌁', 'wave'],
    ['⌖', 'pin'], ['☎', 'phone'], ['◎', 'instagram'], ['●', 'dot']
  ]);
  const iconNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !/[↗↓←→★✳◷◈⌁⌖☎◎●]/u.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      return node.parentElement?.closest('svg,script,style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  const textNodes = [];
  while (iconNodes.nextNode()) textNodes.push(iconNodes.currentNode);
  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.nodeValue.split(/([↗↓←→★✳◷◈⌁⌖☎◎●])/u);
    parts.forEach((part) => {
      const icon = iconIds.get(part);
      if (!icon) {
        if (part) fragment.append(document.createTextNode(part));
        return;
      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', `inline-icon icon-${icon}`);
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', `#icon-${icon}`);
      svg.append(use);
      fragment.append(svg);
    });
    node.replaceWith(fragment);
  });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !expanded);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    }));
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
