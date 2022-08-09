import type {
  Audio, H5PIntegrationObject, H5PCopyrightLicenses, H5PMetadata,
  H5PMediaCopyright, IH5PContentType, H5PExtras, H5PConfirmationDialog,
  H5PDialog, EventDispatcher
} from "h5p-types";
import { ArrowItemType } from "../types/ArrowItemType";
import { Params } from "../types/Params";
import { TopicMapItemType } from "../types/TopicMapItemType";

// Temporarily use local definition instead of incomplete from h5p-types
type H5PObject = {
  // Constants
  copyrightLicenses: H5PCopyrightLicenses;
  /** H5P content is rendered inside an iframe */
  isFramed: boolean;
  // Functions
  buildMetadataCopyrights(metadata: H5PMetadata): H5PMediaCopyright;
  createUUID: () => string;
  getCopyrights(instance: IH5PContentType): string;
  getPath: (path: string, contentId: string) => string;
  newRunnable: (
    library: { library: string; params: unknown },
    contentId: string,
    $attachTo?: JQuery,
    skipResize?: boolean,
    extras?: H5PExtras
  ) => IH5PContentType;
  // Classes
  jQuery: typeof jQuery;
  ConfirmationDialog: typeof H5PConfirmationDialog;
  Dialog: typeof H5PDialog;
  EventDispatcher: typeof EventDispatcher;
  exitFullScreen: () => void;
  fullScreen: (
    $element: JQuery,
    instance: IH5PContentType,
    exitCallback?: () => void,
    body?: JQuery,
    forceSemiFullScreen?: boolean
  ) => void;
  isFullscreen: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const H5P = (window as any).H5P as H5PObject;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const H5PIntegration = (window as any).H5P as H5PIntegrationObject;

export const normalizeAssetPath = (path: string, contentId: string): string => {
  const pathAlreadyAbsolute =
    path.startsWith("http://") || path.startsWith("https://");

  if (pathAlreadyAbsolute) {
    return path;
  }
  return H5P.getPath(path, contentId);
};

/**
 * Replace relative paths to image(s) in Topic Map Item(s) with absolute paths
 *
 * @param items An array with Topic Map Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeBackgroundImagePathsAbsolute = (
  items: Array<TopicMapItemType> | undefined,
  contentId: string,
): Array<TopicMapItemType> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.topicImage) return item;

    return {
      ...item,
      topicImage: {
        ...item.topicImage,
        path: normalizeAssetPath(item.topicImage.path, contentId),
      },
    };
  });
};

/**
 * Replace relative paths to image(s) in Arrow Item(s) with absolute paths
 *
 * @param items An array with Arrow Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeArrowImagePathsAbsolute = (
  items: Array<ArrowItemType> | undefined,
  contentId: string,
): Array<ArrowItemType> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.topicImage) return item;

    return {
      ...item,
      topicImage: {
        ...item.topicImage,
        path: normalizeAssetPath(item.topicImage.path, contentId),
      },
    };
  });
};

export const normalizeArrowItemPaths = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  let arrowItems: ArrowItemType[] | undefined;
  if (params.topicMap) {
    arrowItems = makeArrowImagePathsAbsolute(
      params.topicMap.arrowItems,
      contentId,
    );
  }

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      arrowItems,
    },
  };
};

export const normalizeTopicMapItemPaths = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  let topicMapItems: TopicMapItemType[] | undefined;
  if (params.topicMap) {
    topicMapItems = makeBackgroundImagePathsAbsolute(
      params.topicMap.topicMapItems,
      contentId,
    );
  }

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      topicMapItems,
    },
  };
};

export const normalizeGridBackgroundImagePath = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  if (!params.topicMap?.gridBackgroundImage?.path) {
    return params;
  }

  const path = normalizeAssetPath(
    params.topicMap.gridBackgroundImage.path,
    contentId,
  );

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      gridBackgroundImage: {
        ...(params.topicMap?.gridBackgroundImage ?? {}),
        path,
      },
    },
  };
};

/**
 * It is in the nature of the grid to create sizes that doesn't
 * necessarily fit. Therefore, this function changes the sizes of
 * elements touching the positive edges to fit a 100*100
 * normalized grid.
 */
export const normalizeSizes = (params: Required<Params>): Required<Params> => {
  const topicMapItems: Array<TopicMapItemType> | undefined =
    params.topicMap?.topicMapItems?.map(item => {
      const tooWide = item.xPercentagePosition + item.widthPercentage > 100;
      const tooTall = item.yPercentagePosition + item.heightPercentage > 100;

      let { widthPercentage, heightPercentage } = item;
      if (tooWide) {
        widthPercentage = 100 - item.xPercentagePosition;
      }

      if (tooTall) {
        heightPercentage = 100 - item.yPercentagePosition;
      }

      return {
        ...item,
        widthPercentage,
        heightPercentage,
      };
    });

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      topicMapItems,
    },
  };
};

/**
 * Replace relative paths to audio(s) in Dialog(s) with absolute paths
 *
 * @param items An array with Audio Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeAudioPathsAbsolute = (
  items: Array<Audio> | undefined,
  contentId: string,
): Array<Audio> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.path) return item;

    return {
      ...item,
      path: normalizeAssetPath(item.path, contentId),
    };
  });
};

/**
 * Replace relative paths to audio(s) in Topic Map Item(s) with absolute paths
 *
 * @param items An array with Topic Map Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeDialogAudioPathsAbsolute = (
  items: Array<TopicMapItemType> | undefined,
  contentId: string,
): Array<TopicMapItemType> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.dialog?.audio?.audioFile) return item;

    const audioFile = makeAudioPathsAbsolute(
      item.dialog?.audio.audioFile,
      contentId,
    );

    return {
      ...item,
      dialog: {
        ...item.dialog,
        audio: {
          ...item.dialog.audio,
          audioFile,
        },
      },
    };
  });
};

export const normalizeDialogAudioPaths = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  let topicMapItems: TopicMapItemType[] | undefined;
  if (params.topicMap) {
    topicMapItems = makeDialogAudioPathsAbsolute(
      params.topicMap.topicMapItems,
      contentId,
    );
  }

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      topicMapItems,
    },
  };
};

/**
 * Replace relative paths to audio(s) in Arrow Item(s) with absolute paths
 *
 * @param items An array with Arrow Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeArrowDialogAudioPathsAbsolute = (
  items: Array<ArrowItemType> | undefined,
  contentId: string,
): Array<ArrowItemType> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.dialog?.audio?.audioFile) return item;

    const audioFile = makeAudioPathsAbsolute(
      item.dialog?.audio.audioFile,
      contentId,
    );

    return {
      ...item,
      dialog: {
        ...item.dialog,
        audio: {
          ...item.dialog.audio,
          audioFile,
        },
      },
    };
  });
};

export const normalizeArrowDialogAudioPaths = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  let arrowItems: ArrowItemType[] | undefined;
  if (params.topicMap) {
    arrowItems = makeArrowDialogAudioPathsAbsolute(
      params.topicMap.arrowItems,
      contentId,
    );
  }

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      arrowItems,
    },
  };
};
