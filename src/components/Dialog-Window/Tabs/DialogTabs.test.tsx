/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from "@testing-library/react";
import * as React from "react";
import { DialogTabs } from "./DialogTabs";

Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

describe(DialogTabs.name, () => {
  it("should have rendered.", () => {
    const tabs = render(
      <DialogTabs
        tabContents={{
          text: "",
          hasNote: true,
        }}
        id="test"
      />,
    ).container;

    expect(tabs.querySelector("div")).toBeTruthy();
  });
});
