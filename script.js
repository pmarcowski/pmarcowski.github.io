/*
 * Theme toggle
 * Preserves the same contract as before:
 *   - html[data-theme="light"|"dark"] attribute
 *   - localStorage key: 'theme'
 * The initial theme value is set by the inline FOUC-prevention script
 * in <head> before first paint, so users never see a wrong-theme flash.
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
