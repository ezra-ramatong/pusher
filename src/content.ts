// Todo: Dragging loses context / bugs out if you drag something else on the page, the handle stops working
// Above: only appears to be an issue in Chrome
// Investigate: Discrepency between how Firefox and Chrome take screenshots
// Idea: Add Pop UI for the extension for easy on and off toggling... or clicking the extension should toggle it?
// NOTE: When handle is at max/above width, it creates horizontal overflow (undesirable)

interface PusherState {
  imageDataUrl?: string;
  handlePosition?: number;
  isVisible?: boolean;
}

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

function createContainer(): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "comparison-tool";
  return container;
}

function saveState(state: PusherState) {
  chrome.storage.local.set({ pusherState: state });
}

function loadState(): Promise<PusherState> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["pusherState"], (result) => {
      resolve(result.pusherState || {});
    });
  });
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
}

function setupFilePickerHandler(
  picker: HTMLInputElement,
  overlay: HTMLImageElement,
  handle: HTMLDivElement,
): void {
  picker.addEventListener("change", async () => {
    const file = picker.files?.[0];
    if (!file) return;

    const dataUrl = await fileToDataURL(file);
    overlay.src = dataUrl;
    overlay.style.display = "block";

    overlay.onload = () => {
      overlay.style.display = "block";
      const rect = overlay.getBoundingClientRect();
      handle.style.height = `${rect.height}px`;

      saveState({
        imageDataUrl: dataUrl,
        handlePosition: 0,
        isVisible: true,
      });
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

    const transform = handle.style.transform;
    const match = transform.match(/translateX\((\d+)px\)/);
    if (match) {
      const position = parseInt(match[1], 10);
      loadState().then((state) => {
        saveState({
          ...state,
          handlePosition: position,
        });
      });
    }
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

async function restoreState(
  overlay: HTMLImageElement,
  handle: HTMLDivElement,
): Promise<void> {
  const state = await loadState();

  if (state.imageDataUrl) {
    overlay.src = state.imageDataUrl;
    overlay.style.display = state.isVisible ? "block" : "none";
  }

  overlay.onload = () => {
    const rect = overlay.getBoundingClientRect();
    handle.style.height = `${rect.height}px`;
    if (state.handlePosition !== undefined) {
      handle.style.transform = `translateX(${state.handlePosition}px)`;
      overlay.style.clipPath = `inset(0 0 0 ${state.handlePosition}px)`;
    }
  };

  if (overlay.complete) {
    overlay.onload?.(new Event("load"));
  }
}

async function initializePusher(): Promise<void> {
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

  await restoreState(overlay, handle);
}

initializePusher();
