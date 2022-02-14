/* eslint-disable react/no-danger */
import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { Image } from "../../../types/H5P/Image";
import { formatCopyright } from "../../../utils/dialog.utils";
import styles from "./DialogText.module.scss";

export type DialogTextProps = {
  description: string;
  topicImage: Image | undefined;
  introduction: string | undefined;
  bodyText: string | undefined;
};

export const DialogText: React.FC<DialogTextProps> = ({
  description,
  topicImage,
  introduction,
  bodyText,
}) => {
  const copyrightTitle = useL10n("copyrightPhoto");

  return (
    <div className={styles.dialogText}>
      {description ? (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}
      {topicImage ? (
        <>
          <img
            className={styles.topicImage}
            src={topicImage.path}
            alt={topicImage.alt ?? ""}
          />
          {topicImage?.copyright ? (
            <div className={styles.copyright}>
              {formatCopyright(copyrightTitle, topicImage.copyright)}
            </div>
          ) : null}
        </>
      ) : null}

      {introduction ? (
        <p className={styles.introduction}>{introduction}</p>
      ) : null}

      {bodyText ? <p className={styles.bodyText}>{bodyText}</p> : null}
    </div>
  );
};
