/*
 * Theme toggle + restrained motion
 * - Theme toggle syncs html[data-theme] with localStorage 'theme'.
 *   Initial value is set by the inline FOUC-prevention script in <head>
 *   before first paint.
 * - Motion features (reveal-on-enter, hero parallax) are gated on
 *   prefers-reduced-motion AND on IntersectionObserver availability;
 *   if either is missing/fails, .motion-on is never set and CSS defaults
 *   to fully visible — no FOUC, no broken state.
 */

(function () {
   'use strict';

   var html = document.documentElement;

   /* ---------- Theme toggle ---------- */
   var btn = document.getElementById('theme-toggle-btn');
   if (btn) {
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
   }

   /* ---------- Motion ----------
      .motion-on was set inline in <head> if IO is supported and the user
      hasn't requested reduced motion. We don't need to re-check those here;
      we just verify that .motion-on is present (it is what hides the reveal
      targets in CSS). If IO construction fails below, we remove .motion-on
      so content becomes visible — graceful fallback. */
   if (!html.classList.contains('motion-on')) {
      return;
   }

   var io;
   try {
      io = new IntersectionObserver(function (entries) {
         entries.forEach(function (entry) {
            if (entry.isIntersecting) {
               entry.target.classList.add('is-visible');
               io.unobserve(entry.target);
            }
         });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
   } catch (e) {
      html.classList.remove('motion-on');
      return;
   }

   var revealTargets = document.querySelectorAll('.work, .bottom, .project, .sec-bar');
   for (var i = 0; i < revealTargets.length; i++) {
      io.observe(revealTargets[i]);
   }

   /* Hero parallax — single passive scroll listener writes --name-shift on
      .hero. CSS uses transform: translateY(var(--name-shift)) on .name.
      Capped at 8px; below that no rAF batching is needed. */
   var hero = document.querySelector('.hero');
   if (hero) {
      var updateShift = function () {
         var shift = Math.min(8, Math.max(0, window.scrollY * 0.04));
         hero.style.setProperty('--name-shift', shift + 'px');
      };
      window.addEventListener('scroll', updateShift, { passive: true });
      updateShift();
   }
})();
