/**
 *	* https://github.com/tongyy/react-native-draggable
 *
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
} from 'react-native';
import PropTypes from 'prop-types';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheet';

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

interface IProps {
    /**** props that should probably be removed in favor of "children" */
    renderText?: string;
    isCircle?: boolean;
    renderSize?: number;
    renderWidth?: number;
    renderHeight?: number;
    imageSource?: number;
    renderColor?: string;
    /**** */
    children?: React.ReactNode;
    shouldReverse?: boolean;
    disabled?: boolean;
    debug?: boolean;
    animatedViewProps?: object;
    touchableOpacityProps?: object;
    onDrag?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onShortPressRelease?: (event: GestureResponderEvent) => void;
    onDragRelease?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    onPressOut?: (event: GestureResponderEvent) => void;
    onRelease?: (event: GestureResponderEvent, wasDragging: boolean) => void;
    onReverse?: () => {x: number, y: number},
    x?: number;
    y?: number;
    // z/elevation should be removed because it doesn't sync up visually and haptically
    z?: number;
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
  };

export default function Draggable(props: IProps) {
  const {
    renderText,
    isCircle,
    renderSize,
    renderWidth,
    renderHeight,
    imageSource,
    renderColor,
    children,
    shouldReverse,
    disabled,
    debug,
    animatedViewProps,
    touchableOpacityProps,
    onDrag,
    onShortPressRelease,
    onDragRelease,
    onLongPress,
    onPressIn,
    onPressOut,
    onRelease,
    x,
    y,
    z,
    minX,
    minY,
    maxX,
    maxY,
  } = props;

  // The Animated object housing our xy value so that we can spring back
  const pan = React.useRef(new Animated.ValueXY());
  // Always set to xy value of pan, would like to remove
  const offsetFromStart = React.useRef({x: 0, y: 0});
  // Width/Height of Draggable (renderSize is arbitrary if children are passed in)
  const childSize = React.useRef({x: renderWidth, y: renderHeight});
  // Top/Left/Right/Bottom location on screen from start of most recent touch
  const startBounds = React.useRef({top: 0, bottom: 0, left: 0, right: 0});
  // Whether we're currently dragging or not
  const isDragging = React.useRef(false);

  const getBounds = React.useCallback(() => {
    const left = x + offsetFromStart.current.x;
    const top = y + offsetFromStart.current.y;
    return {
      left,
      top,
      right: left + childSize.current.x,
      bottom: top + childSize.current.y,
    };
  }, [x, y]);

  const shouldStartDrag = React.useCallback(
    gs => {
      return !disabled && (Math.abs(gs.dx) > 2 || Math.abs(gs.dy) > 2);
    },
    [disabled],
  );

  const reversePosition = React.useCallback(() => {
    Animated.spring(pan.current, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  }, [pan]);

  const onPanResponderRelease = React.useCallback(
    (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      isDragging.current = false;
      if (onDragRelease) {
        onDragRelease(e, gestureState);
        onRelease(e, true);
      }
      if (!shouldReverse) {
        pan.current.flattenOffset();
      } else {
        reversePosition();
      }
    },
    [onDragRelease, shouldReverse, onRelease, reversePosition],
  );

  const onPanResponderGrant = React.useCallback(
    (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      startBounds.current = getBounds();
      isDragging.current = true;
      if (!shouldReverse) {
        pan.current.setOffset(offsetFromStart.current);
        pan.current.setValue({x: 0, y: 0});
      }
    },
    [getBounds, shouldReverse],
  );

  const handleOnDrag = React.useCallback(
    (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const {dx, dy} = gestureState;
      const {top, right, left, bottom} = startBounds.current;
      const far = 999999999;
      const changeX = clamp(
        dx,
        Number.isFinite(minX) ? minX - left : -far,
        Number.isFinite(maxX) ? maxX - right : far,
      );
      const changeY = clamp(
        dy,
        Number.isFinite(minY) ? minY - top : -far,
        Number.isFinite(maxY) ? maxY - bottom : far,
      );
      pan.current.setValue({x: changeX, y: changeY});
      onDrag(e, gestureState);
    },
    [maxX, maxY, minX, minY, onDrag],
  );

  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        shouldStartDrag(gestureState),
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        shouldStartDrag(gestureState),
      onPanResponderGrant,
      onPanResponderMove: Animated.event([], {
        // Typed incorrectly https://reactnative.dev/docs/panresponder
        listener: handleOnDrag,
        useNativeDriver: false,
      }),
      onPanResponderRelease,
    });
  }, [
    handleOnDrag,
    onPanResponderGrant,
    onPanResponderRelease,
    shouldStartDrag,
  ]);

  // TODO Figure out a way to destroy and remove offsetFromStart entirely
  React.useEffect(() => {
    const curPan = pan.current; // Using an instance to avoid losing the pointer before the cleanup
    if (!shouldReverse) {
      curPan.addListener(c => (offsetFromStart.current = c));
    }
    return () => {
        // Typed incorrectly
      curPan.removeAllListeners();
    };
  }, [shouldReverse]);

  const positionCss: StyleProp<ViewStyle> = React.useMemo(() => {
    const Window = Dimensions.get('window');
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: Window.width,
      height: Window.height,
    };
  }, []);

  const dragItemCss = React.useMemo(() => {
    const style: StyleProp<ViewStyle> = {
      top: y,
      left: x,
      elevation: z,
      zIndex: z,
    };
    if (renderColor) {
      style.backgroundColor = renderColor;
    }
    if (isCircle) {
      style.borderRadius = renderSize;
    }

    if (children) {
      return {
        ...style,
        alignSelf: 'baseline',
      };
    }
    return {
      ...style,
      justifyContent: 'center',
      width: renderWidth,
      height: renderHeight,
    };
  }, [children, isCircle, renderColor,renderWidth, renderHeight, renderSize, x, y, z]);

  const touchableContent = React.useMemo(() => {
    if (children) {
      return children;
    } else if (imageSource) {
      return (
        <Image
          style={{width: renderWidth, height: renderHeight}}
          source={imageSource}
        />
      );
    } else {
      return <Text style={styles.text}>{renderText}</Text>;
    }
  }, [children, imageSource, renderSize,renderWidth, renderHeight, renderText]);

  const handleOnLayout = React.useCallback(event => {
    const {height, width} = event.nativeEvent.layout;
    childSize.current = {x: width, y: height};
  }, []);

  const handlePressOut = React.useCallback(
    (event: GestureResponderEvent) => {
      onPressOut(event);
      if (!isDragging.current) {
        onRelease(event, false);
      }
    },
    [onPressOut, onRelease],
  );

  const getDebugView = React.useCallback(() => {
    const {width, height} = Dimensions.get('window');
    const far = 9999;
    const constrained = minX || maxX || minY || maxY;
    if (!constrained) {
      return null;
    } // could show other debug info here
    const left = minX || -far;
    const right = maxX ? width - maxX : -far;
    const top = minY || -far;
    const bottom = maxY ? height - maxY : -far;
    return (
      <View
        pointerEvents="box-none"
        style={{left, right, top, bottom, ...styles.debugView}}
      />
    );
  }, [maxX, maxY, minX, minY]);

  return (
    <View pointerEvents="box-none" style={positionCss}>
      {debug && getDebugView()}
      <Animated.View
        pointerEvents="box-none"
        {...animatedViewProps}
        {...panResponder.panHandlers}
        style={pan.current.getLayout()}>
        <TouchableOpacity
          {...touchableOpacityProps}
          onLayout={handleOnLayout}
          style={dragItemCss}
          disabled={disabled}
          onPress={onShortPressRelease}
          onLongPress={onLongPress}
          onPressIn={onPressIn}
          onPressOut={handlePressOut}>
          {touchableContent}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

/***** Default props and types */

Draggable.defaultProps = {
  renderText: '＋',
  renderSize: 36,
  renderWidth: 36,
  renderHeight: 36,
  shouldReverse: false,
  disabled: false,
  debug: false,
  onDrag: () => {},
  onShortPressRelease: () => {},
  onDragRelease: () => {},
  onLongPress: () => {},
  onPressIn: () => {},
  onPressOut: () => {},
  onRelease: () => {},
  x: 0,
  y: 0,
  z: 1,
};

const styles = StyleSheet.create({
  text: {color: '#fff', textAlign: 'center'},
  debugView: {
    backgroundColor: '#ff000044',
    position: 'absolute',
    borderColor: '#fced0ecc',
    borderWidth: 4,
  },
});