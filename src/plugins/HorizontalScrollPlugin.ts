import Scrollbar from "smooth-scrollbar";

class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
  static pluginName = "horizontalScroll";

  transformDelta(delta: { x: number; y: number }, fromEvent: { type: string }) {
    if (!/wheel/.test(fromEvent.type)) {
      return delta;
    }

    if (this.options.active) {
      return {
        y: 0,
        x: Math.abs(delta.x) > Math.abs(delta.y) ? delta.x : delta.y,
      };
    }

    return delta;
  }
}

Scrollbar.use(HorizontalScrollPlugin);

// eslint-disable-next-line import/no-default-export
export default HorizontalScrollPlugin;
