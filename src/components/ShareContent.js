import Country from "./Country";

const ShareContent = ({ id, countriesData }) => {
  return (
    <div id={id} className="hidden">
      <Country countriesData={countriesData} />
    </div>
  );
};

export default ShareContent;
