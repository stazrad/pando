import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  View,
  Platform,
  StyleSheet,
} from 'react-native'

export default class ImageCropper extends React.Component {
  state = {
    cropData: {
      offset: {
        x: 0,
        y: 0,
      },
      size: {
        height: 0,
        width: 0
      }
    },
  }

  UNSAFE_componentWillMount() {
    this.resetImageSize(this.props.size)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (this.props.size.height !== nextProps.size.height || this.props.size.width !== nextProps.size.width) {
      this.resetImageSize(nextProps.size)
    }
  }

  resetImageSize (size) {
    // Scale an image to the minimum size that is large enough to completely
    // fill the crop box.
    const widthRatio = this.props.image.width / size.width;
    const heightRatio = this.props.image.height / size.height;
    this._horizontal = widthRatio > heightRatio;
    if (this._horizontal) {
      this._scaledImageSize = {
        width: this.props.image.width / heightRatio,
        height: size.height,
      };
    } else {
      this._scaledImageSize = {
        width: size.width,
        height: this.props.image.height / widthRatio,
      };
      if (Platform.OS === 'android') {
        // hack to work around Android ScrollView a) not supporting zoom, and
        // b) not supporting vertical scrolling when nested inside another
        // vertical ScrollView (which it is, when displayed inside UIExplorer)
        this._scaledImageSize.width *= 2;
        this._scaledImageSize.height *= 2;
        this._horizontal = true;
      }
    }
    this._contentOffset = {
      x: (this._scaledImageSize.width - this.props.size.width) / 2,
      y: (this._scaledImageSize.height - this.props.size.height) / 2,
    };
    this._maximumZoomScale = Math.min(
      this.props.image.width / this._scaledImageSize.width,
      this.props.image.height / this._scaledImageSize.height,
    );
    this._minimumZoomScale = Math.max(
      size.width / this._scaledImageSize.width,
      size.height / this._scaledImageSize.height,
    );
    this._updateTransformData(
      this._contentOffset,
      this._scaledImageSize,
      size,
    );
  }

  _onScroll(event) {
    this._updateTransformData(
      event.nativeEvent.contentOffset,
      event.nativeEvent.contentSize,
      event.nativeEvent.layoutMeasurement,
    );
  }

  _updateTransformData(offset, scaledImageSize, croppedImageSize) {
    const offsetRatioX = offset.x / scaledImageSize.width;
    const offsetRatioY = offset.y / scaledImageSize.height;
    const sizeRatioX = croppedImageSize.width / scaledImageSize.width;
    const sizeRatioY = croppedImageSize.height / scaledImageSize.height;

    const cropData = {
      offset: {
        x: this.props.image.width * offsetRatioX,
        y: (this.props.image.height * offsetRatioY),
      },
      size: {
        width: this.props.image.width * sizeRatioX,
        height: this.props.image.height * sizeRatioY,
      },
    };

    this.setState({ cropData })
    this.props.onTransformDataChange && this.props.onTransformDataChange(cropData)
  }

  render() {
    const viewWidth = Dimensions.get('window').width - 20 // 10 margins on either side
    const measuredSize = { maxHeight: this.props.size.height, maxWidth: viewWidth }
    const { height: imageHeight, width: imageWidth } = this._scaledImageSize
    const { height, width } = this.props.size
    const { containerSize = {} } = this.props
    const { cropData } = this.state
    const fillerSize = { height: containerSize?.height + (imageHeight - height), width: containerSize?.width || viewWidth }

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentOffset={this._contentOffset}
        decelerationRate='fast'
        horizontal={this._horizontal}
        maximumZoomScale={this._maximumZoomScale}
        minimumZoomScale={this._minimumZoomScale}
        onMomentumScrollEnd={this._onScroll.bind(this)}
        onScrollEndDrag={this._onScroll.bind(this)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[styles.imageCropper, measuredSize]}
        contentContainerStyle={[styles.contentContainer]}
        pinchGestureEnabled
        centerContent
        directionalLockEnabled
        scrollEventThrottle={16}>
        <Image
          source={{ uri: this.props.image.path }}
          style={[styles.image, this._scaledImageSize]}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    overflow: 'hidden',
  },
  filler: {
    flex: 1,
    backgroundColor: 'green',
  },
  image: {
    display: 'flex',
  },
  imageCropper: {
    alignSelf: 'center',
    overflow: 'hidden',
  },
})
