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
    scrollHeight: 0
  }

  UNSAFE_componentWillMount() {
    // Scale an image to the minimum size that is large enough to completely
    // fill the crop box.
    const widthRatio = this.props.image.width / this.props.size.width;
    const heightRatio = this.props.image.height / this.props.size.height;
    this._horizontal = widthRatio > heightRatio;
    if (this._horizontal) {
      this._scaledImageSize = {
        width: this.props.image.width / heightRatio,
        height: this.props.size.height,
      };
    } else {
      this._scaledImageSize = {
        width: this.props.size.width,
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
      this.props.size.width / this._scaledImageSize.width,
      this.props.size.height / this._scaledImageSize.height,
    );
    this._updateTransformData(
      this._contentOffset,
      this._scaledImageSize,
      this.props.size,
    );
  }

  _onScroll(event) {
    // console.log('_onScroll', event.nativeEvent.contentOffset, event.nativeEvent.contentSize, event.nativeEvent.layoutMeasurement,)
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

    const fillerSize = (this.state.scrollHeight - this.props.size.height) / 2
    const cropData: ImageCropData = {
      offset: {
        x: this.props.image.width * offsetRatioX,
        y: (this.props.image.height * offsetRatioY) - fillerSize,
      },
      size: {
        width: this.props.image.width * sizeRatioX,
        height: this.props.image.height * sizeRatioY,
      },
    };
    this.props.onTransformDataChange && this.props.onTransformDataChange(cropData)
  }

  onLayout = e => {
    const {x, y, height, width} = e.nativeEvent.layout

    this.setState({ scrollHeight: height })
  }

  render() {
    const viewWidth = Dimensions.get('window').width - 20 // 10 margins on either side
    const measuredSize = { maxHeight: this.props.size.height, maxWidth: viewWidth }
    const { height: imageHeight, width: imageWidth } = this._scaledImageSize
    const { height, width } = this.props.size
    const fillerSize = { height: (this.state.scrollHeight - height) / 2, width: viewWidth }

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
        contentContainerStyle={[this.props.style]}
        pinchGestureEnabled
        centerContent
        scrollEventThrottle={16}
        onLayout={e => this.onLayout(e)}>
        <Image
          source={{ uri: this.props.image.path }}
          style={[styles.image, this._scaledImageSize]}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  filler: {
    flex: 1,
    backgroundColor: 'blue',
  },
  image: {
    display: 'flex',
  },
  imageCropper: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
})
