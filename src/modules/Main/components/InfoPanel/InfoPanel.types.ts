export interface InfoPanelProps {}

export interface Renderer {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  completed: boolean;
  api: Record<string, any>;
  props: Record<string, any>;
  formatted: Record<string, any>;
}
