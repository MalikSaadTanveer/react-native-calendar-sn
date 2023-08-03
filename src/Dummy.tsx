import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, PanResponder, Animated } from 'react-native';
import { PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';

const ZoomAndDragScreen = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [baseScale, setBaseScale] = useState(1);
  const [baseTranslateX, setBaseTranslateX] = useState(0);
  const [baseTranslateY, setBaseTranslateY] = useState(0);

  const onPinchGestureEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  });

  const onPinchHandlerStateChange = (event:any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setBaseScale(baseScale * event.nativeEvent.scale);
      scale.setValue(1);
    }
  };

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanHandlerStateChange = (event:any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setBaseTranslateX(baseTranslateX + event.nativeEvent.translationX);
      setBaseTranslateY(baseTranslateY + event.nativeEvent.translationY);
      translateX.setValue(0);
      translateY.setValue(0);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (baseScale > 1) {
          event;
          translateX.setValue(gestureState.dx);
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: () => {
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
      >
        <Animated.View style={styles.zoomableView}>
          <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanHandlerStateChange}
          >
            <Animated.View
              style={[
                styles.draggableView,
                {
                  transform: [
                    { scale: Animated.multiply(scale, baseScale) },
                    { translateX: Animated.add(translateX, baseTranslateX) },
                    { translateY: Animated.add(translateY, baseTranslateY) },
                  ],
                },
              ]}
              {...panResponder.panHandlers}
            >
              {/* Your content goes here */}
              <Image source={require('./assets/picdummy.jpg')} style={styles.image} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  zoomableView: {
    flex: 1,
  },
  draggableView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ZoomAndDragScreen;
