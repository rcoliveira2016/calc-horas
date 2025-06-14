import type { TooltipDirection, TooltipOptions } from "@/types/tooltip";
import type { DirectiveBinding, ObjectDirective } from "vue";

interface TooltipHTMLElement extends HTMLElement {
  _tooltip?: HTMLElement;
}

const createTooltipElement = (texto: string): HTMLElement => {
  const el = document.createElement("div");
  el.className = "tw-tooltip-directive";
  el.role = "tooltip";
  el.innerText = texto;
  el.classList.add(
    "tw-absolute",
    "tw-bg-black",
    "tw-bg-opacity-75",
    "tw-text-white",
    "tw-px-2",
    "tw-py-1",
    "tw-rounded",
    "tw-text-xs",
    "tw-z-[1000]",
    "tw-pointer-events-none",
    "tw-transition-opacity",
    "tw-duration-200",
    "tw-opacity-0"
  );
  document.body.appendChild(el);
  return el;
};

const tooltipDirective: ObjectDirective = {
  mounted(
    el: TooltipHTMLElement,
    binding: DirectiveBinding<string | TooltipOptions>
  ) {
    const modifiers = binding.modifiers ?? {};
    let delay = 100;
    let offset = 8;
    let direction: TooltipDirection =
      (Object.keys(modifiers)[0] as TooltipDirection) || "top";
    let texto = "";

    if (typeof binding.value === "string") {
      texto = binding.value;
    } else if (typeof binding.value === "object") {
      texto = binding.value.texto;
      direction = binding.value.direcao || "top";
      delay = binding.value.delay || delay;
      offset = binding.value.offset || offset;
    }

    const tooltip = createTooltipElement(texto);

    const positionTooltip = (): void => {
      const rect = el.getBoundingClientRect();
      const ttRect = tooltip.getBoundingClientRect();
      let top = 0,
        left = 0;

      switch (direction) {
        case "top":
          top = rect.top - ttRect.height - offset;
          left = rect.left + (rect.width - ttRect.width) / 2;
          break;
        case "bottom":
          top = rect.bottom + offset;
          left = rect.left + (rect.width - ttRect.width) / 2;
          break;
        case "left":
          top = rect.top + (rect.height - ttRect.height) / 2;
          left = rect.left - ttRect.width - offset;
          break;
        case "right":
          top = rect.top + (rect.height - ttRect.height) / 2;
          left = rect.right + offset;
          break;
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    };

    const show = (): void => {
      setTimeout(() => {
        positionTooltip();
        tooltip.classList.remove("tw-opacity-0");
        tooltip.classList.add("tw-opacity-100");
      });
    };

    const hide = (): void => {
      tooltip.classList.remove("tw-opacity-100");
      tooltip.classList.add("tw-opacity-0");
    };

    el.addEventListener("mouseenter", show);
    el.addEventListener("focus", show);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("blur", hide);

    el._tooltip = tooltip;
  },
  unmounted(el: TooltipHTMLElement) {
    if (el._tooltip) {
      document.body.removeChild(el._tooltip);
      delete el._tooltip;
    }
  },
  getSSRProps() {
    return {};
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", tooltipDirective);
});
