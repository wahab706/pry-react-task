import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const InputWrapper = styled("div")(
  ({ theme }) => `
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
    </div>
  );
}

// function Tag(props) {
//   const { label, additionalValue, ...other } = props;

//   const [inputValue, setInputValue] = useState(additionalValue);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleInputBlur = () => {
//     setIsEditing(false);
//     // onInputSave(inputValue);
//   };

//   return (
//     <div {...other} className="flex items-center">
//       <span>{label}</span>
//       {isEditing ? (
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onBlur={handleInputBlur}
//           autoFocus
//         />
//       ) : (
//         <span onClick={() => setIsEditing(true)} className="px-1">
//           <span className={additionalValue && "px-1"}>{additionalValue && "|"}</span>
//           {additionalValue || "[x]"}
//         </span>
//       )}
//     </div>
//   );
// }

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  // additionalValue: PropTypes.string,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 28px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export function CustomField() {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: options,
    freeSolo: true,
    getOptionLabel: (option) => option.title,
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState(false);

  const handleBackspace = (e) => {
    if (e.key === "Backspace" && selectedTags.length > 0) {
      // Remove the last tag when the backspace key is pressed

      if (selectedTags.length > 1) {
        const secondLastItem = selectedTags[selectedTags.length - 2];
        handleTagSelection(selectedTags.slice(0, -2), secondLastItem);
      } else if (selectedTags.length == 1) {
        setSelectedTags([]);
      }
    }
  };

  const isOption = (text) => {
    return options.some((option) => option.title === text);
  };

  const handleTagSelection = (selectedTags, option) => {
    if (selectedTags.length > 0) {
      const lastSelectedTag = selectedTags[selectedTags.length - 1];
      if (
        !isArithmeticOperator(lastSelectedTag.title) &&
        !isArithmeticOperator(option.title)
      ) {
        // Check if neither the last tag nor the current option is an arithmetic operator
        setError(true);
      } else if (
        isArithmeticOperator(lastSelectedTag.title) &&
        isArithmeticOperator(option.title)
      ) {
        // Check if two consecutive arithmetic operators are selected
        setError(true);
      } else {
        setError(false);
      }
      setSelectedTags([...selectedTags, option]);
    } else if (isOption(option.title)) {
      // If the first option is from the predefined list
      setError(false);
      setSelectedTags([option]);
    }
  };

  const handleArithmaticSelection = (value) => {
    if (isArithmeticOperator(value)) {
      const lastSelectedTag = selectedTags[selectedTags.length - 1];
      if (
        isArithmeticOperator(lastSelectedTag.title) &&
        isArithmeticOperator(value)
      ) {
        setError(true);
      }
      setSelectedTags([...selectedTags, { title: value, type: "operator" }]);
    }
  };

  function isArithmeticOperator(text) {
    const operatorRegex = /[+\-*/^()]/;
    return operatorRegex.test(text);
  }

  const calculateTotal = (selectedTags) => {
    let total = 0;
    let currentNumber = 0;
    let currentOperator = "+";

    selectedTags.forEach((tag) => {
      if (tag.type === "operator") {
        currentOperator = tag.title;
      } else {
        switch (currentOperator) {
          case "+":
            currentNumber += tag.value;
            break;
          case "-":
            currentNumber -= tag.value;
            break;
          case "*":
            currentNumber *= tag.value;
            break;
          case "/":
            currentNumber /= tag.value;
            break;
          case "^":
            currentNumber = Math.pow(currentNumber, tag.value);
            break;
          default:
            break;
        }
      }
    });

    return currentNumber.toFixed(2);
  };

  return (
    <Root>
      <div className="flex items-center justify-between py-2 pl-5 pr-4 bg-gray-100 jss70">
        <div className="flex items-center">
          <span className="text-lg font-semibold">
            {error ? (
              <span className="text-lg font-semibold text-red-400">#ERROR</span>
            ) : (
              <span className="text-lg font-semibold">
                {calculateTotal(selectedTags)}$
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="my-4 ml-4 mr-4 rounded">
        <div {...getRootProps()}>
          <InputWrapper
            ref={setAnchorEl}
            className={`${focused ? "focused" : ""} input-wrapper`}
          >
            {selectedTags.map((tag, index) => (
              <Fragment key={index}>
                {tag.type == "operator" ? (
                  <span>{tag.title}</span>
                ) : (
                  <StyledTag label={tag.title} />
                )}
              </Fragment>
            ))}
            <input
              {...getInputProps()}
              onChange={(e) => handleArithmaticSelection(e.target.value)}
              onKeyDown={handleBackspace}
            />
          </InputWrapper>
        </div>

        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li
                {...getOptionProps({ option, index })}
                key={index}
                onClick={() => handleTagSelection(selectedTags, option)}
              >
                <span>{option.title}</span>
                <span className="text-right text-gray-600">{option.type}</span>
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </Root>
  );
}

const options = [
  { title: "Payroll Bonus COGS", value: 150, type: "currency" },
  { title: "Payroll R&D", value: 100, type: "currency" },
  { title: "Payroll COGS", value: 200, type: "currency" },
  { title: "Payroll Tax", value: 25, type: "currency" },
  { title: "ABS", value: 20, type: "number" },
  { title: "Contractor R&D", value: 40, type: "number" },
  { title: "Tax", value: 15, type: "number" },
];
