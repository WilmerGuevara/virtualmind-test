// This is a react component that is technically functional,
// but would be very hard to maintain because of it's size.

// It's easier to write tests for smaller components that pass
// data between them. Rewrite this component so that it could be
// rendered from somewhere else by using these lines.

// const checkboxes = [0, 1, 2];

// <Form>
// 	checkboxes.map(id =>
// 		<Checkbox key={id} id={id}/>
// 	)
// </Form>

// or (easier but less impresive)

// <Form checkboxes={checkboxes} />

// If you decide to do the second option you MUST STILL create and
// render a Checkbox Component inside the Form Component

function Checkbox({ name, checked, label, onChange, ...props }) {
  return (
    <div className="checkbox-wrapper">
      <span>{label}</span>
      <input
        checked={checked}
        onChange={onChange}
        name={name}
        type="checkbox"
        {...props}
      />
    </div>
  );
}

function BigForm({ checkboxes: items = [], ...props }) {
  const [state, setState] = useState({
    checkboxes: items,
  });
  const { checkboxes } = state;
  const checked = checkboxes.map((checkbox) => checkbox.checked);

  const onCheckBoxHandler = useCallback(
    (id) => (event) => {
      const { checked } = event?.target;
      const checkboxesUpdate = [...checkboxes];

      // Update the checked value
      checkboxesUpdate[id].checked = checked;

      setState((state) => ({
        ...state,
        checkboxes: checkboxesUpdate
      }));
    },
    [checkboxes]
  );

  return (
    <div className="form">
      <span>Checked boxes: {checked}</span>
      {checkboxes &&
        checkboxes.map(({ name, checked }, index) => {
          return (
            <Checkbox
              key={`checkbox-${index}`}
              label={`Checkbox ${index}`}
              name={name}
              checked={checked}
              onChange={onCheckBoxHandler(index)}
              {...props}
            />
          );
        })}
    </div>
  );
}

const checkboxes = [
  {
    name: "checkbox-0",
    label: "Checkbox 0",
    checked: false,
  },
  {
    name: "checkbox-1",
    label: "Checkbox 1",
    checked: false,
  },
  {
    name: "checkbox-2",
    label: "Checkbox 2",
    checked: true,
  },
];

ReactDOM.render(
  <BigForm checkboxes={checkboxes} />,
  document.getElementById("container")
);
