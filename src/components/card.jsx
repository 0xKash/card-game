export const Card = ({ src, action }) => (
  <article className="card" onClick={action}>
    <img className="card-img" src={src} />
  </article>
);
