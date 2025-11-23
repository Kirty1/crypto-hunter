const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        border: "1px solid #44BBA4",
        borderRadius: 5,
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "#44BBA4" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        width: "22%",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {children}
    </span>
  );
};
export default SelectButton;