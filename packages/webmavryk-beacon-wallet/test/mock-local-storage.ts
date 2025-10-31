/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

class LocalStorageMock {
  store: { [k: string]: string };
  length: number;

  constructor() {
    this.store = {};
    this.length = 0;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
   * @returns
   */
  key = (idx: number): string => {
    const values = Object.values(this.store);
    return values[idx];
  };

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

export default LocalStorageMock;
