import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";

const Togglable = props => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Segment basic>
          <Button
            primary
            size="tiny"
            floated="right"
            onClick={toggleVisibility}
          >
            {props.buttonLabel}
          </Button>
        </Segment>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button size="tiny" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
