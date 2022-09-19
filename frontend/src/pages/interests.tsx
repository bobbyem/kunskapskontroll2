import useGetInterests from "../api/hooks/useGetInterests";

function Interests() {
  const { data, message, getInterests } = useGetInterests();

  return (
    <div>
      <h1>Interests</h1>
      <button
        onClick={() => {
          getInterests();
        }}
      >
        Get My Interests
      </button>
      <ul>
        {data
          ? data.map((item, index) => {
              return <li key={index}>{item}</li>;
            })
          : null}
      </ul>
    </div>
  );
}

export default Interests;
