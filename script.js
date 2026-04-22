/*
 * Theme toggle — syncs html[data-theme] with localStorage 'theme'.
 * Initial value is set by the inline FOUC-prevention script in <head>
 * before first paint.
 */

(function () {
   'use strict';

   var html = document.documentElement;
   var btn  = document.getElementById('theme-toggle-btn');
   if (!btn) return;

   btn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try {
         localStorage.setItem('theme', next);
      } catch (e) {
         /* storage may be disabled; degrade gracefully */
      }
   });
})();
