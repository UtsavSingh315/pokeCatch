export const getHighlightedName = (name, inputRef) => {
    // const inputLower = input.trim().toLowerCase();
    const inputLower = inputRef.current.value.trim().toLowerCase();

    let result = [];
    for (let i = 0; i < name.length; i++) {
      if (i < inputLower.length && name[i].toLowerCase() === inputLower[i]) {
        result.push(
          <span key={i} style={{ color: "#eab308", fontWeight: "bold" }}>
            {name[i].toUpperCase()}
          </span>
        );
      } else {
        result.push(<span key={i}>{name[i].toUpperCase()}</span>);
      }
    }
    return result;
  };