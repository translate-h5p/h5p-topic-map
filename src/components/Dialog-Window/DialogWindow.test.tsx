import * as React from "react";
import { getByText, render } from "@testing-library/react";
import { DialogWindow } from "./DialogWindow";

const onOpenChange = console.info;

describe(DialogWindow.name, () => {
  it("should render", () => {
    const item = {
      id: "1",
      topicImage: {
        path: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
        alt: "",
      },
      label: "Sheep in the distance",
      description: "",
      widthPercentage: 50,
      heightPercentage: 25,
      xPercentagePosition: 3,
      yPercentagePosition: 5,
      dialog: {
        text: "Dialog text",
      },
    };

    const dialogWindow = render(
      <DialogWindow item={item} open={false} onOpenChange={onOpenChange} />,
    ).container;

    setTimeout(() => {
      expect(dialogWindow.querySelector("div")).toBeTruthy();
    }, 100);
  });

  it("should render the correct title", () => {
    const item = {
      id: "1",
      topicImage: {
        path: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
        alt: "",
      },
      label: "Sheep in the distance",
      description: "",
      widthPercentage: 50,
      heightPercentage: 25,
      xPercentagePosition: 3,
      yPercentagePosition: 5,
      dialog: {
        text: "Dialog text",
      },
    };

    const dialogWindow = render(
      <DialogWindow item={item} open={false} onOpenChange={onOpenChange} />,
    ).container;

    setTimeout(() => {
      expect(getByText(dialogWindow, "dialog-window-test")).toBeTruthy();
    }, 100);
  });
});