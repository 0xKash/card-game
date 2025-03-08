export const FinalMsg = ({ msg, action }) => (
  <>
    <h1>{msg}</h1>
    <button onClick={action}>Restart Button</button>
  </>
);
