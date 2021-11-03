import { TYPE } from "./Tab";

export function setEL(el: string | undefined, type: TYPE): HTMLElement {
  if (!el) {
    throw new Error(`'el' must be exist`);
  }

  const isMark: boolean = /^(\.|\#)/.test(el);
  let _el: HTMLElement | null;

  if (!isMark) {
    _el = document.querySelector(`.${el}`) || document.querySelector(`#${el}`);
  } else {
    _el = document.querySelector(el);
  }

  if (!_el) {
    throw new Error('This element with the class or id name is not exist');
  }

  _el.className = `tab ${type}`;

  return _el;
}

export function setType(type: TYPE | string | undefined): TYPE {
  if (!type) {
    return TYPE.FADE;
  }

  for (const key in TYPE) {
    if (TYPE[key] === type) {
      return type as TYPE;
    }
  }

  return TYPE.FADE;
}