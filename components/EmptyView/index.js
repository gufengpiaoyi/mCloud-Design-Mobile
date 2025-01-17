/**
 * Created by wy on 2019/9/30.
 */
import React from 'react'
import {
    Text,
    ViewPropTypes,
    View,Image,
    TouchableOpacity,
} from 'react-native'
import { WithTheme } from '../style'
import EmptyViewStyles from './style'
import PropTypes from 'prop-types'

const network_failedSource = require('./assets/empty_network_failed.png')
const no_dataSource = require('./assets/empty_no_data.png')

export default class EmptyView extends React.Component {
    static propTypes = {
        styles: ViewPropTypes.style,
        style: ViewPropTypes.style,
        children: PropTypes.any,
        type: PropTypes.string,
        emptyImage: PropTypes.any,
        onRefresh: PropTypes.func,
    }
    static defaultProps = {
        styles: {},
        style: {},
        children: null,
        type: '',
        emptyImage: null,
        onRefresh: null,
    }
    render() {
        const {
            styles,
            style,
            children,
            type,
            emptyImage,
            onRefresh,
        } = this.props
        return (
            <WithTheme themeStyles={EmptyViewStyles} styles={styles}>
                {
                    (_styles, theme) => {
                        let emptyImageView
                        if (type === 'no_image') {
                            emptyImageView = emptyImage
                        } else if ( type === 'network_failed') {
                            emptyImageView = network_failedSource
                        } else if ( type === 'no_data') {
                            emptyImageView = no_dataSource
                        } else if (type === 'custom') {
                            emptyImageView = emptyImage
                        } else {
                            emptyImageView = emptyImage
                        }
                        const textStyle = [
                            _styles.text,
                        ]
                        const EmptyViewStyle = [
                            _styles.wrapper,
                            style,
                        ]
                        const TouchableStyle = [
                            _styles.touchable,
                        ]
                        const TouchableTextStyle = [
                            _styles.touchableText,
                        ]
                        return (
                            <View style={EmptyViewStyle}>
                                {
                                    type === 0 ? null : <Image source={emptyImageView} />
                                }
                                <Text style={textStyle}>
                                    {children}
                                </Text>
                                {
                                    onRefresh
                                        ? (
                                            <TouchableOpacity
                                                style={TouchableStyle}
                                                onPress={() => onRefresh && onRefresh()}
                                            >
                                                <Text style={TouchableTextStyle}>重新加载</Text>
                                            </TouchableOpacity>
                                        )
                                        : null
                                }
                            </View>
                        )
                    }
                }
            </WithTheme>
        )
    }
}
