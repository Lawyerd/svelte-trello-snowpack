export function autoFocusout(el, focusoutListener) {
  const foucusinLisner = event => {
    event.stopPropagation();
    // Propagation : 부모 요소로 이벤트가 전파되는 것
    // 이걸 하지 않으면 window라는 객체까지 다다른다.
    // 따라서 이 el 위쪽으로는 더 이상 현재 이벤트가 전파되지 않도록 막는다.
  };
  setTimeout(() => {
    el.addEventListener("click", foucusinLisner);
    window.addEventListener("click", focusoutListener);
  }, 0);
  // setTimeout에 0을 넣으면 된다.

  return {
    update() {
      // 두번째 인수로 넘어오는 데이터가 변경되면 update가 실행된다.
    },
    destroy() {
      // element가 파괴되면 실행된다.
      el.removeEventListener("click", foucusinLisner);
      window.removeEventListener("click", focusoutListener);
    },
  };
}
