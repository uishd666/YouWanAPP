/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface ImageWithTextProps {
    imageSource: string;
    topText: string;
    leftBottomText: string;
    rightBottomText: string;
    onPressTop?: () => void;
    onPressLeftBottom?: () => void;
    onPressRightBottom?: () => void;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({
    imageSource,
    topText,
    leftBottomText,
    rightBottomText,
    onPressTop,
    onPressLeftBottom,
    onPressRightBottom,
}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}
                onPress={onPressTop}
            >
                <Text>{topText}</Text>
            </TouchableOpacity>
            <Image source={{ uri: imageSource }} style={{ width: 100, height: 100 }} />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                    onPress={onPressLeftBottom}
                >
                    <Text>{leftBottomText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                    onPress={onPressRightBottom}
                >
                    <Text>{rightBottomText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ImageWithText;
