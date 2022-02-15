import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DialogTabs } from "./DialogTabs";

export default {
  title: "Molecules/Dialog Content/Dialog Tabs",
  component: DialogTabs,
} as ComponentMeta<typeof DialogTabs>;

const Template: ComponentStory<typeof DialogTabs> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogTabs {...args} />
);

export const Tabs = Template.bind({});
const item = {
  id: "storybookid",
  label: "Just another label",
  description: `Den franske revolusjon var en periode med store sosiale og politiske
  omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
  første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
  det ut masseopprør i Paris og fengselet Bastillen ble stormet.`,
  topicImage: {
    path: "https://images.unsplash.com/photo-1557657043-23eec69b89c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",
    alt: "White seal on soil",
    copyright: {
      author: "Amy Asher",
      license: "Unsplash License",
      source: "https://unsplash.com/photos/giZJHm2m9yY",
      title: "White seal on soil",
      version: "1",
      year: "2019",
    },
  },
  dialog: {
    hasNote: true,
    text: "Text text for testing Text text test.",
    links: ["www.youtube.com", "www.ndla.com"],
    video: {
      path: "https://player.vimeo.com/video/224857514?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1",
    },
    audio: {
      file: { path: "https://bigsoundbank.com/UPLOAD/mp3/0001.mp3" },
      subtext: `
        <b>
          Den franske revolusjon var en periode med store sosiale og politiske
          omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
          første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
          det ut masseopprør i Paris og fengselet Bastillen ble stormet.
        </b>
        <br />
        <p>
          Perioden 1787-1789 kalles gjerne førrevolusjonen, men langsiktige
          årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i
          tid. De viktigste politiske, sosiale og administrative omveltninger
          skjedde i perioden 1789-1794.
        </p>
    `,
    },
  },
};
Tabs.args = { item };
