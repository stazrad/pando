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
    contentOffset: {
      x: 0,
      y: 0,
    },
    horizontal: false,
    maximumZoomScale: 0,
    minimumZoomScale: 0,
    scaledImageSize: {
      x: 0,
      y: 0,
    }
  }

  UNSAFE_componentWillMount() {
    const { imageCropperState, onTransformDataChange, size } = this.props

    if (imageCropperState) {
      // hydrate state from project
      this.setState({ ...imageCropperState }, () => {
        this._updateTransformData(
          imageCropperState.contentOffset,
          imageCropperState.scaledImageSize,
          size,
        )
      })
    } else {
      this.resetImageSize(size)
    }
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
    let _horizontal = widthRatio > heightRatio;
    let _scaledImageSize

    if (_horizontal) {
      _scaledImageSize = {
        width: this.props.image.width / heightRatio,
        height: size.height,
      };
    } else {
      _scaledImageSize = {
        width: size.width,
        height: this.props.image.height / widthRatio,
      };
      if (Platform.OS === 'android') {
        // hack to work around Android ScrollView a) not supporting zoom, and
        // b) not supporting vertical scrolling when nested inside another
        // vertical ScrollView (which it is, when displayed inside UIExplorer)
        _scaledImageSize.width *= 2;
        _scaledImageSize.height *= 2;
        _horizontal = true;
      }
    }
    const _contentOffset = {
      x: (_scaledImageSize.width - this.props.size.width) / 2,
      y: (_scaledImageSize.height - this.props.size.height) / 2,
    };
    const _maximumZoomScale = Math.min(
      this.props.image.width / _scaledImageSize.width,
      this.props.image.height / _scaledImageSize.height,
    );
    const _minimumZoomScale = Math.max(
      size.width / _scaledImageSize.width,
      size.height / _scaledImageSize.height,
    );

    this.setState({
      contentOffset: _contentOffset,
      horizontal: _horizontal,
      maximumZoomScale: _maximumZoomScale,
      minimumZoomScale: _minimumZoomScale,
      scaledImageSize: _scaledImageSize,
    })
    this._updateTransformData(
      _contentOffset,
      _scaledImageSize,
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

  _updateTransformData(contentOffset, scaledImageSize, croppedImageSize) {
    const offsetRatioX = contentOffset.x / scaledImageSize.width;
    const offsetRatioY = contentOffset.y / scaledImageSize.height;
    const sizeRatioX = croppedImageSize.width / scaledImageSize.width;
    const sizeRatioY = croppedImageSize.height / scaledImageSize.height;

    const cropData = {
      offset: {
        x: this.props.image.width * offsetRatioX,
        y: this.props.image.height * offsetRatioY,
      },
      size: {
        width: this.props.image.width * sizeRatioX,
        height: this.props.image.height * sizeRatioY,
      },
    };

    this.setState(({ contentOffset, cropData, scaledImageSize }), () => {
      this.props.onTransformDataChange && this.props.onTransformDataChange(this.state)
    })
  }

  render() {
    const { contentOffset, horizontal, maximumZoomScale, minimumZoomScale, scaledImageSize } = this.state
    const viewWidth = Dimensions.get('window').width - 20 // 10 margins on either side
    const measuredSize = { maxHeight: this.props.size.height, maxWidth: viewWidth }

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentOffset={contentOffset}
        decelerationRate='fast'
        horizontal={horizontal}
        maximumZoomScale={maximumZoomScale}
        minimumZoomScale={minimumZoomScale}
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
          style={[styles.image, scaledImageSize]}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    display: 'flex',
  },
  imageCropper: {
    alignSelf: 'center',
    overflow: 'hidden',
  },
})
