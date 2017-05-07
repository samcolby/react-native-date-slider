import React, { PureComponent } from "react";
import { FlatList, View } from "react-native";

import WeekView from "./WeekView";

class DateSliderComponent extends PureComponent {
  static propTypes = {
    arrDates: React.PropTypes.array.isRequired,
    captureFlatListRef: React.PropTypes.func.isRequired,
    getItemLayout: React.PropTypes.func,
    onDateSelected: React.PropTypes.func,
    onEndReached: React.PropTypes.func,
    onEndReachedThreshold: React.PropTypes.number,
    onLayout: React.PropTypes.func,
    onViewableItemsChanged: React.PropTypes.func,
    viewWidth: React.PropTypes.number.isRequired
  };

  render() {
    const {
      arrDates,
      captureFlatListRef,
      getItemLayout,
      onEndReached,
      onEndReachedThreshold,
      onLayout,
      onViewableItemsChanged,
      viewWidth
    } = this.props;

    return (
      <View style={{ width: "100%" }} onLayout={onLayout}>
        <FlatList
          data={arrDates}
          extraData={viewWidth}
          ref={captureFlatListRef}
          getItemLayout={getItemLayout}
          horizontal={true}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          onViewableItemsChanged={onViewableItemsChanged}
          pagingEnabled={true}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <WeekView
        arrSelected={item.arrSelected}
        startingDate={item.date}
        onDateSelected={this.props.onDateSelected}
        viewWidth={this.props.viewWidth}
      />
    );
  };
}

export default DateSliderComponent;
