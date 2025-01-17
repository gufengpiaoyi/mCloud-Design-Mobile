import React from 'react'
import { View } from 'react-native'
import {
    ActionSheet,
    Button,
} from '../..'

export default class extends React.Component {
    state={
        options:['text','value'],
    }
    render() {
        const {
            options,
        } = this.state
        return (
            <View style={{ backgroundColor:'red' }}>
                <Button
                    onPress={
                        () => {
                            this.setState({
                                options:['text','value','value','value','value','value','value','value','value'],
                            },() => this.actionSheet.show())
                        }
                    }
                >
                    show
                </Button>
                <ActionSheet
                    ref={(e) => this.actionSheet = e}
                    options={options}
                    disabledIndexArrary={[5]}
                    title="zhe是标题dfshdfshuhgconst tempHeight = event.nativeEvent.layout.height"
                />
            </View>
        )
    }
}
