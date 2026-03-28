// path: component/Card.js

function Card({ user }) {
  return (
    <div className="card">
      <span>{user?.id}</span>
      <span>
        {user?.firstName} {user?.lastName}
      </span>
    </div>
  );
}

export default Card;
