import {
  IStackItemStyles,
  IStackStyles,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const stackStyle: IStackStyles = {
    root: { margin: "0 10px 10px 10px", padding: 10 },
  };
  const stackItemStyle: IStackItemStyles = { root: { margin: "0 10px" } };

  const history = useHistory();

  return (
    <div>
      <Stack horizontal verticalAlign="center" styles={stackStyle}>
        <Stack.Item styles={stackItemStyle}>
          <PrimaryButton
            onClick={() => {
              history.push("/designer");
            }}
            text="Theme Designer"
          />
        </Stack.Item>
        <Stack.Item styles={stackItemStyle}>
          <PrimaryButton
            onClick={() => {
              history.push("/dashboard");
            }}
            text="Dashboard"
          />
        </Stack.Item>
      </Stack>
    </div>
  );
};

export default Home;
