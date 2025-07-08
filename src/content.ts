// Todo: Dragging loses context / bugs out if you drag something else on the page, the handle stops working
// Investigate: Discrepency between how Firefox and Chrome take screenshots
// Idea?: Add state to keep position of handle / image between refreshes?
// Idea: Add Pop UI for the extension for easy on and off toggling... or clicking the extension should toggle it?
// NOTE: When handle is at max/above width, it creates horizontal overflow (undesirable)

function isAlreadyInjected(): boolean {
  return document.querySelector(".comparison-tool") !== null;
}

function createOverlayImage(): HTMLImageElement {
  const overlay = document.createElement("img");
  overlay.className = "comparison";
  overlay.style.display = "none";
  return overlay;
}

function createHandle(): HTMLDivElement {
  const handle = document.createElement("div");
  handle.className = "handle";
  return handle;
}

function createFilePicker(): HTMLInputElement {
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/*";
  picker.style.position = "fixed";
  picker.style.bottom = "10px";
  picker.style.right = "10px";
  picker.style.zIndex = "1000001";
  picker.style.pointerEvents = "auto";
  return picker;
}

function setupFilePickerHandler(
  picker: HTMLInputElement,
  overlay: HTMLImageElement,
  handle: HTMLDivElement,
): void {
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
}

function setupDragHandlers(
  handle: HTMLDivElement,
  overlay: HTMLImageElement,
): void {
  let isDragging = false;

  const onPointerMove = (e: PointerEvent): void => {
    if (!isDragging) return;
    const clamped = Math.min(Math.max(e.clientX, 0), window.innerWidth);
    handle.style.transform = `translateX(${clamped}px)`;
    overlay.style.clipPath = `inset(0 0 0 ${clamped}px)`;
  };

  const onPointerUp = (e: PointerEvent): void => {
    isDragging = false;
    handle.releasePointerCapture(e.pointerId);
    handle.removeEventListener("pointermove", onPointerMove);
    handle.removeEventListener("pointerup", onPointerUp);
  };

  handle.addEventListener("pointerdown", (e: PointerEvent) => {
    isDragging = true;
    handle.setPointerCapture(e.pointerId);
    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
  });
}

function setupResizeHandler(
  overlay: HTMLImageElement,
  handle: HTMLDivElement,
): void {
  window.addEventListener("resize", () => {
    const rect = overlay.getBoundingClientRect();
    handle.style.height = `${rect.height}px`;
  });
}

function createContainer(): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "comparison-tool";
  return container;
}

function initializePusher(): void {
  console.log("✨ Pusher is live and ready ✨");

  if (isAlreadyInjected()) {
    console.log("🟡 Already injected");
    return;
  }

  const container = createContainer();
  const overlay = createOverlayImage();
  const handle = createHandle();
  const picker = createFilePicker();

  setupFilePickerHandler(picker, overlay, handle);
  setupDragHandlers(handle, overlay);
  setupResizeHandler(overlay, handle);

  container.appendChild(overlay);
  container.appendChild(handle);
  container.appendChild(picker);
  document.body.appendChild(container);
}

initializePusher();
