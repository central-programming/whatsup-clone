import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { colors, styles } from "../styles";
import { selectedIcon } from "../utils";
import SmartIcon, { IconProps } from "../components/smart-icon";
import { Icon } from "@expo/vector-icons/build/createIconSet";

interface InputProps {
  label?: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: string;
  color: string;
  inputMode?: "text" | "numeric" | "decimal" | "email" | "search" | "tel" | "url" | "none";
  initialValue?: string;
  _smartIcon?: boolean;
  iconBgColor?: string;
  smartIcon?: {
    enabled: boolean;
    name: IconProps["name"];
  } 
}

export function Input({
  icon,
  color,
  placeholder,
  iconBgColor,
  secureTextEntry = false,
  value,
  onChangeText,
  inputMode = 'none',
  initialValue,
  _smartIcon,
  smartIcon
}: InputProps) {
  const [inputValue, setInputValue] = useState<string>(initialValue || '');

  const handleOnChangeText = (text: string) => {
    if (onChangeText) {
      setInputValue(text);
      onChangeText(text);
    }
  };
  const backgroundColor = iconBgColor ? iconBgColor : colors.gray

  return (
    <View style={[styles.input, {backgroundColor: iconBgColor}]}>
      <Text style={styles.inputLabel}>
        {smartIcon && smartIcon.enabled ? (
          <SmartIcon name={smartIcon.name} color={color} size={23} focused={false} />
        ) : (
          selectedIcon(icon, color)
        )}
      </Text>
      <TextInput
        inputMode={inputMode}
        value={inputValue}
        onChangeText={handleOnChangeText}
        style={styles.inputText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={inputMode === 'email' ? 'none' : 'sentences'}
      />
    </View>
  );
}
