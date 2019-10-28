import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseurl';
import { Loading } from './LoadingComponent';
import { DISHES } from '../shared/dishes';
// We will  make a class component here because we need to move the state into all of our components to get it ready with redux.

const mapStateToProps = state => ({
  dishes: state.dishes,
});

class Menu extends Component {
  // Local Navigation options ...

  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    /* const { navigate } = this.props; */
    const { dishes } = this.props.dishes;

    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => (
      // We set the ITEM and Key here we want to loop over.
      <Tile
        key={index}
        title={item.name}
        caption={item.description}
        featured
        onPress={() => navigate('DishDetail', { dishId: item.id })}
        // eslint-disable-next-line global-require
        imageSrc={{ uri: baseUrl + item.image }}
      />
    );

    // our props for this component will conatain one propery named navigation, we are extracting it here.
    // When we press an item in the menucomponent  we will pass this information to dishdetailcomponent with the navigator
    if (this.props.dishes.isLoading) {
      return <Loading />;
    }
    if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{props.dishes.errMess}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

Menu.propTypes = {
  // // WTF?
  /*   item: PropTypes.array.isRequired, */
  dishes: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Menu);
