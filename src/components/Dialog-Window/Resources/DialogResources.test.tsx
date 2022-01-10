import { render } from "@testing-library/react";
import * as React from "react";
import { DialogResources } from "./DialogResources";

describe("", () => {
  it("Should have rendered.", () => {
    const tab = render(
      <DialogResources relevantLinks={[]} customLinks={[]} />,
    ).container;

    expect(tab.querySelector("div")).toBeTruthy();
    expect(tab.querySelector("input")).toBeTruthy();
    expect(tab.querySelector("button")).toBeTruthy();
  });
});