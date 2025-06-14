export type TooltipDirection = "top" | "bottom" | "left" | "right";

export interface TooltipOptions {
  texto: string;
  direcao?: TooltipDirection;
  delay?: number;
  offset?: number;
}
