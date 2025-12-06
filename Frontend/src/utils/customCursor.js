export const initCustomCursor = () => {
  const cursorInner = document.querySelector(".cursor-inner");
  const cursorOuter = document.querySelector(".cursor-outer");
  const links = document.querySelectorAll("a, button, .cursor-pointer");

  if (!cursorInner || !cursorOuter) return;

  let mouseX = 0, mouseY = 0;

  const moveCursor = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursorOuter.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  };

  document.removeEventListener("mousemove", moveCursor); // prevent duplicates
  document.addEventListener("mousemove", moveCursor);

  // Hover Effects
  links.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorInner.classList.add("hover");
      cursorOuter.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursorInner.classList.remove("hover");
      cursorOuter.classList.remove("hover");
    });
  });
};
