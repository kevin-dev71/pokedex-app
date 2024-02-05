// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "whatwg-fetch"
import "@testing-library/jest-dom"

import { mswServer } from "./src/mocks/mswServer"

// jest.mock("recaptcha-v3", () => ({
//   load: jest.fn().mockResolvedValue({ execute: jest.fn().mockResolvedValue("captcha") }),
// }))

// jest.mock("chart.js", () => ({
//   Chart: {
//     register: jest.fn(),
//   },
// }))
// To prevent Navigation in test
HTMLAnchorElement.prototype.click = jest.fn()

global.URL.createObjectURL = jest.fn().mockReturnValue("/mocked-url-string.png")
global.URL.revokeObjectURL = jest.fn()

// jest.mock("next/router", () => require("next-router-mock"))
// jest.mock("next/dist/client/router", () => require("next-router-mock"))

//  Mock IntersectionObserver
// This mock of the IntersectionObserver is used by headlessUi test: https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/components/dialog/dialog.test.tsx
class IntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// fix TypeError: Cannot redefine property: onbeforeunload
Object.defineProperty(window, "onbeforeunload", {
  writable: true,
  value: jest.fn(),
})

const originalConsole = console
const originalImage = Image

beforeAll(async () => {
  await mswServer.listen()

  const tooltipRoot = document.createElement("div")
  tooltipRoot.setAttribute("id", "tooltip")
  document.body.appendChild(tooltipRoot)
})

afterAll(() => {
  mswServer.close()
})

afterEach(() => {
  mswServer.resetHandlers()
  // Restore the original console
  // eslint-disable-next-line no-global-assign
  console = originalConsole
  // eslint-disable-next-line no-global-assign
  Image = originalImage
})
