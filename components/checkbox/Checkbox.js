import React from 'react'
import {
    View, TouchableWithoutFeedback, ViewPropTypes, Image, Text,
} from 'react-native'
import { WithTheme } from '../style'
import CheckboxStyles from './style'
import PropTypes from 'prop-types'

const disabledCheckSource = require('./assets/check-circle-disabled.png')
const checkSource = require('./assets/check-circle.png')
const disabledCheckOSource = require('./assets/check-circle-disabled-o.png')
const checkOSource = require('./assets/check-circle-o.png')

export default class Checkbox extends React.Component {
    static propTypes = {
        style: ViewPropTypes.style,
        styles: ViewPropTypes.style,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        children: PropTypes.any,
        onChange: PropTypes.func,
        pointerEvents: PropTypes.oneOf(['box-none', 'none', 'box-only', 'auto']),
    }
    static defaultProps = {
        style: {},
        styles: {},
        disabled: false,
        children: null,
        onChange: () => {},
        pointerEvents: 'auto',
    }
    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked || props.defaultChecked || false,
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (typeof props.checked === 'boolean' && props.checked !== state.checked) {
            return {
                checked: props.checked,
            }
        }
        return null
    }
    onPress = () => {
        const {
            disabled,
            checked,
            onChange,
        } = this.props
        if (disabled) {
            return
        }
        const {
            checked: oldchecked,
        } = this.state
        if (!(typeof checked === 'boolean')) {
            this.setState({
                checked: !oldchecked,
            })
        }
        if (onChange) {
            onChange({ checked: !oldchecked })
        }
    }
    render() {
        const { checked } = this.state
        const {
            style,
            styles,
            children,
            disabled,
            pointerEvents,
        } = this.props
        return (
            <WithTheme themeStyles={CheckboxStyles} styles={styles}>
                {
                    (_styles, theme) => {
                        let icon
                        if (checked) {
                            icon = disabled ? (
                                <Image
                                    style={[styles.icon, style]}
                                    source={disabledCheckSource}
                                />
                            ) : (
                                <Image
                                    style={[styles.icon, style]}
                                    source={checkSource}
                                />
                            )
                        } else {
                            icon = disabled ? (
                                <Image
                                    style={[styles.icon, style]}
                                    source={disabledCheckOSource}
                                />
                            ) : (
                                <Image
                                    style={[styles.icon, style]}
                                    source={checkOSource}
                                />
                            )
                        }
                        return (
                            <TouchableWithoutFeedback pointerEvents={pointerEvents} onPress={this.onPress}>
                                <View style={_styles.wrapper}>
                                    {icon}
                                    {
                                        typeof children === 'string' ? (
                                            <Text style={styles.iconRight}>{children}</Text>
                                        ) : (
                                            children
                                        )
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }
                }
            </WithTheme>
        )
    }
}
