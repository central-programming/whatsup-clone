import React from "react";
import { Ionicons } from "@expo/vector-icons";

export interface IconProps extends React.ComponentProps<typeof Ionicons> {
    focused: boolean;
    color: string;
    size: number;
    }

  const SmartIcon = (props: IconProps) => {
    return <Ionicons {...props} />;
  }

    export default SmartIcon;
