/** Recalculate ScrollTrigger positions after intro, route changes, or layout shifts. */
export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;

  requestAnimationFrame(() => {
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh(true);
    });
  });
}
