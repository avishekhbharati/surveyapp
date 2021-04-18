export function Question(props) {
  return (
    <>
      <div>
        <h1>Question {props.serialno}</h1>
        <h3>{props.data.title}</h3>
        <i>{props.data.subTitle}</i>
        {props.data.options.map((item, index) => (
          <div>
            <input
              type="checkbox"
              key={index}
              className="answerBtn"
              onClick={(e) => {
                props.handleOptions(props.data.id, item.id, e);
                //selected(item.text);
              }}
            />
            <label>{item.text}</label>
          </div>
        ))}
      </div>
    </>
  );
}
