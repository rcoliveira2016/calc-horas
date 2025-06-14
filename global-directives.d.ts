import type { ObjectDirective } from "vue";
import type { TooltipOptions } from "./types/tooltip";

declare module "vue" {
  interface GlobalDirectives {
    vTooltip: ObjectDirective<HTMLElement, string | TooltipOptions>;
  }
}
