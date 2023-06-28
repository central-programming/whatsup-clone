import React from 'react';
import { HeaderButtons, Item, OverflowMenu, HiddenItem, HeaderButton } from 'react-navigation-header-buttons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HeaderButtonProps } from 'react-navigation-header-buttons';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ChatListHeaderRightProps {
    color?: string;
}
const ChatListHeaderRight = ({color}:ChatListHeaderRightProps) => {
    const CustomHeaderButton = (props: HeaderButtonProps) => {
        return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={color} />;
    };
    return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Create new chat"
                iconName="create-outline"
                onPress={() => {
                    // Handle button press event
                }}
            />
            {/* <OverflowMenu OverflowIcon={<MaterialIcons name="more-vert" size={23} color="black" />} >
                <HiddenItem title="Edit" onPress={() => { }} />
                <HiddenItem title="Delete" onPress={() => { }} />
            </OverflowMenu> */}
        </HeaderButtons>
    )
};



export default ChatListHeaderRight;