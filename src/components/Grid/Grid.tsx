import * as React from "react";
import { useState } from "react";
import { FullScreenHandle } from "react-full-screen";
import { Xwrapper } from "react-xarrows";
import { ArrowItemType } from "../../types/ArrowItemType";
import { CommonItemType } from "../../types/CommonItemType";
import { Image } from "../../types/H5P/Image";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Arrow } from "../Arrow/Arrow";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
  arrowItems: Array<ArrowItemType>;
  backgroundImage: Image | undefined;
  fullscreenHandle: FullScreenHandle;
};

export const Grid: React.FC<GridProps> = ({
  items,
  arrowItems,
  backgroundImage,
  fullscreenHandle,
}) => {
  const [itemShowingDialog, setItemShowingDialog] =
    useState<CommonItemType | null>(null);

  const arrows = React.useMemo(() => {
    const onClick = (item: ArrowItemType): void => {
      setItemShowingDialog(item);
    };

    return arrowItems.map(item => (
      <Arrow key={item.id} item={item} onClick={() => onClick(item)} />
    ));
  }, [arrowItems]);

  const children = React.useMemo(
    () =>
      items.map(item => (
        <div
          key={item.id}
          id={item.id}
          className={styles.itemWrapper}
          style={{
            left: `${item.xPercentagePosition}%`,
            top: `${item.yPercentagePosition}%`,
            height: `${item.heightPercentage}%`,
            width: `${item.widthPercentage}%`,
          }}
        >
          <TopicMapItem
            item={item}
            onClick={() => setItemShowingDialog(item)}
          />
        </div>
      )),
    [items],
  );

  const bgImageStyle: string | undefined = backgroundImage?.path
    ? `url(${backgroundImage.path})`
    : undefined;

  return (
    <Xwrapper>
      <div
        className={styles.gridWrapper}
        style={{ backgroundImage: bgImageStyle }}
      >
        <div className={styles.grid}>
          <div className={styles.fullscreenButtonWrapper}>
            <FullscreenButton fullscreenHandle={fullscreenHandle} />
          </div>
          {arrows}
          {children}
          {itemShowingDialog?.dialog ? (
            <DialogWindow
              item={itemShowingDialog}
              open={!!itemShowingDialog}
              onOpenChange={() => setItemShowingDialog(null)}
            />
          ) : null}
        </div>
      </div>
    </Xwrapper>
  );
};
