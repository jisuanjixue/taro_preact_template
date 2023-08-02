//Taro自定义导航条navbar组件
import { useSignal } from "@preact/signals";
import Taro from "@tarojs/taro";
import { convertPxToRpx } from "../../utils/screen";
import { IconFont } from '@nutui/icons-react-taro'
import { Fragment, h } from 'preact';

type PageStateProps = {
  layout: number;
  title: string;
  theme: string;
};

type StateType = {
  navBarHeight: number;
  statusBarHeight: number | undefined;
  menuButtonHeight: number;
  menuButtonWidth: number;
};

const NavBar: React.FC<PageStateProps> = ({ layout = 1, title, theme = "light" }: PageStateProps) => {
  const currentPage = Taro.getCurrentPages().length;
  const { model, system, statusBarHeight, screenWidth } = Taro.getSystemInfoSync();
  const { height: menuButtonHeight, left } = Taro.getMenuButtonBoundingClientRect();
  let navBarHeight = 48;

  if (/iPhone/.test(model) && /iOS/.test(system)) {
    navBarHeight = 44;
  }
  const navStyle = useSignal<StateType>({
    navBarHeight: navBarHeight,
    statusBarHeight: statusBarHeight,
    menuButtonHeight: menuButtonHeight,
    menuButtonWidth: screenWidth - left // The sum of the right capsule and the right margin, typically 97
  })


  const handleNavigateBack = (): void => {
    Taro.navigateBack();
  };

  const renderLeftBtns = (withTitle: boolean) => {
    /** The right space with the title, the same as the right capsule, the width of 87, remove the current position */
    const withTitleRight = convertPxToRpx(87) - 158;
    return (
      <div
        className="w-158 flex items-center ml-4"
        /** same height as capsule */
        style={{
          height: `${navStyle.value.menuButtonHeight}rpx`,
          marginRight: withTitle ? `${withTitleRight}rpx` : "0"
        }}
      >
        {currentPage !== 1 && <IconFont name="left" size="20" style={{ color: "white" }} onClick={() => handleNavigateBack()} />}
      </div>
    );
  };

  // render title
  const renderTitle = () => {
    return (
      <div
        className="text-white text-center w-full width-full p-3 text-xl font-sans font-medium"
        style={{ marginRight: `${navStyle.value.menuButtonWidth}px` }}
      >
        {title}
      </div>
    );
  };

  /** render title and back button */
  const renderBackAndTitle = () => {
    return (
      <Fragment>
        {renderLeftBtns(true)}
        {renderTitle()}
      </Fragment>
    );
  };

  /** render another info  */
  const renderOtherAndTitle = () => renderTitle();

  return (
    // <Sticky position="top">
    <div
      className="bg-blue-700"
      style={{
        color: theme === "dark" ? "#FFFFFF" : "#000000"
      }}
    >
      <div className="w-750" style={{ height: `${navStyle.value.statusBarHeight}px` }}></div>
      <div className="flex flex-row flex-start items-center" style={{ height: `${navStyle.value.navBarHeight}px` }}>
        {(() => {
          if (layout === 1) {
            return renderTitle();
          } else if (layout === 2) {
            return renderBackAndTitle();
          }
          return renderOtherAndTitle();
        })()}
      </div>
    </div>
    // </Sticky>
  );
};

export default NavBar;
