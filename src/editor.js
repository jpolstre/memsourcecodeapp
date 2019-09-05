import React, { Fragment, Component } from "react";

import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const styles = {
  root: {
    // overflowY:'auto',
    // height:'400px',
    fontSize: "12px",
    width: "100%",
    border: "1px solid mediumvioletred",
    borderRadius: "5px",
    boxSizing: "border-box",
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    ...theme.plain
  }
};

class EditorExample extends Component {
  constructor(props) {
    //  console.log(props)
    super(props);
    this.state = {
      code: props.codeSelected.code,
      language: props.codeSelected.languaje
    };
  }

  onValueChange = code => {
    this.setState({ code });
    this.props.valueChange(code);
  };

  highlight = code => (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={this.props.codeSelected.languaje}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  render() {
    return (
      <Editor
        value={this.props.codeSelected.code}
        onValueChange={this.onValueChange}
        highlight={this.highlight}
        padding={10}
        style={styles.root}
      />
    );
  }
}
export default EditorExample;
