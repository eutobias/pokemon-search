import React, { useState } from "react";

type MyComponentProps = {
  text1: string;
  text2: string;

  someFunction: () => void;
};

const MyComponent: React.FC<MyComponentProps> = (props) => {
  const [showConcatString, setShowConcatString] = useState<boolean>(false);

  const simpleString = "Strings simples devem sempre usar aspas duplas";
  const concatString = `Strings concatenadas devem usar o formato de concatenação ES6 ${props.text1} e ${props.text2}`;

  const toggleMessages = () => setShowConcatString(!showConcatString);

  return (
    <div>
      {showConcatString ? <p>{concatString}</p> : <p>{simpleString}</p>}
      <button onClick={props.someFunction}>Botão</button>
      <button onClick={toggleMessages}>Outro Botão</button>
    </div>
  );
};

MyComponent.defaultProps = {
  text1: "Texto 1",
  text2: "Text0 2",
};

export { MyComponent };
