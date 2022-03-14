import useResizeObserver from "@react-hook/resize-observer";
import * as React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { AppWidthContext } from "../../contexts/AppWidthContext";
import { getUserData, setUserData } from "../../hooks/useLocalStorage";
import { Params } from "../../types/H5P/Params";
import { UserData } from "../../types/UserData";
import { defaultTheme } from "../../utils/semantics.utils";
import { Navbar } from "../Navbar/Navbar";
import styles from "./App.module.scss";

export type AppProps = {
  params: Params;
  title: string | undefined;
  toggleIPhoneFullscreen: () => void;
};

export const App: React.FC<AppProps> = ({
  params,
  title,
  toggleIPhoneFullscreen,
}) => {
  const fullscreenHandle = useFullScreenHandle();
  const [isIPhoneFullscreenActive, setIsIPhoneFullscreenActive] =
    React.useState<boolean>(false);

  const handleToggleIPhoneFullscreen = (): void => {
    setIsIPhoneFullscreenActive(!isIPhoneFullscreenActive);
    toggleIPhoneFullscreen();
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [storageData, setStorageData] = React.useState<UserData>(getUserData());

  React.useEffect(() => {
    setUserData(storageData);
  }, [storageData]);

  React.useLayoutEffect(() => {
    const initialWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    setWidth(initialWidth);
  }, []);

  useResizeObserver(containerRef, ({ contentRect }) => {
    setWidth(contentRect.width);
  });

  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.colorTheme],
  );

  return (
    <div
      className={
        isIPhoneFullscreenActive ? styles.iPhoneFullscreenStyle : undefined
      }
    >
      <AppWidthContext.Provider value={width}>
        <div
          className={`${themeClassName} ${
            isIPhoneFullscreenActive && styles.iPhoneFullscreenThemeStyle
          }`}
        >
          <FullScreen
            className={styles.fullscreenStyle}
            handle={fullscreenHandle}
          >
            <div className={styles.navbarWrapper} ref={containerRef}>
              <Navbar
                navbarTitle={title ?? ""}
                params={params}
                setStorageData={setStorageData}
                fullscreenHandle={fullscreenHandle}
                toggleIPhoneFullscreen={handleToggleIPhoneFullscreen}
                isIPhoneFullscreenActive={isIPhoneFullscreenActive}
                storageData={{ ...storageData }}
              />
            </div>
          </FullScreen>
        </div>
      </AppWidthContext.Provider>
    </div>
  );
};