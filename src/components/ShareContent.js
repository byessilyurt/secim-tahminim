import Country from "./Country";

const ShareContent = ({ id, layout, candidatesData, countriesData }) => {
  return (
    <div id={id}>
      <Country countriesData={countriesData} />
    </div>
  );
};

export default ShareContent;
