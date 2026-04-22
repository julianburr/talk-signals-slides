export function vh(value: number) {
  return window.document.body.clientHeight * (value / 100);
}

export function vw(value: number) {
  return window.document.body.clientWidth * (value / 100);
}
