export function preventDefaults(event: Event): void {
  event.stopPropagation();
  event.stopImmediatePropagation();
  event.preventDefault();
}

export function domRectIntersect(r1: DOMRect, r2: DOMRect) {
  return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
}

export function domRectContains(r: DOMRect, x: number, y: number) {
  return r.x <= x && x <= r.x + r.width && r.y <= y && y <= r.y + r.height;
}
