// Todo: Dragging loses context / bugs out if you drag something else on the page, the handle stops working
// Investigate: Discrepency between how Firefox and Chrome take screenshots
// Idea?: Add state to keep position of handle / image between refreshes?
// Idea: Add Pop UI for the extension for easy on and off toggling... or clicking the extension should toggle it?
console.log("✨ Pusher is live and ready ✨");

if (document.querySelector(".comparison-tool")) {
  console.log("🟡 Already injected");
} else {
  const container = document.createElement("div");
  container.className = "comparison-tool";

  const overlay = document.createElement("img");
  overlay.className = "comparison";
  overlay.style.display = "none";

  const handle = document.createElement("div");
  handle.className = "handle";

  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/*";
  picker.style.position = "fixed";
  picker.style.bottom = "10px";
  picker.style.right = "10px";
  picker.style.zIndex = "1000001";
  picker.style.pointerEvents = "auto";

  picker.addEventListener("change", () => {
    const file = picker.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    overlay.src = url;
    overlay.style.display = "block";

    overlay.onload = () => {
      overlay.style.display = "block";
      const rect = overlay.getBoundingClientRect();
      handle.style.height = `${rect.height}px`;
    };
  });

  container.appendChild(overlay);
  container.appendChild(handle);
  container.appendChild(picker);
  document.body.appendChild(container);

  let isDragging = false;

  handle.addEventListener("pointerdown", (e) => {
    isDragging = true;
    handle.setPointerCapture(e.pointerId);
    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
  });

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const clamped = Math.min(Math.max(e.clientX, 0), window.innerWidth);
    handle.style.transform = `translateX(${clamped}px)`;
    overlay.style.clipPath = `inset(0 0 0 ${clamped}px)`;
  };

  const onPointerUp = (e: PointerEvent) => {
    isDragging = false;
    handle.releasePointerCapture(e.pointerId);
    handle.removeEventListener("pointermove", onPointerMove);
    handle.removeEventListener("pointerup", onPointerUp);
  };

  window.addEventListener("resize", () => {
    const rect = overlay.getBoundingClientRect();
    handle.style.height = `${rect.height}px`;
  });
}
