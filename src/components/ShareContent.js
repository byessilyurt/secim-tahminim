import Country from "./Country";

const ShareContent = ({ id, layout, candidatesData, countriesData }) => {
  const classes =
    layout === "vertical"
      ? "vertical-classes hidden"
      : "horizontal-classes hidden";

  return (
    <div id={id} className={classes}>
      <Country countriesData={countriesData} />
    </div>
  );
};

export default ShareContent;
