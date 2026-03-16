const MovieSection = ({ title, children, id }) => {
  return (
    <div className="mb-8!" id={id}>
      <h2 className="text-3xl bold text-white mb-6!">{title}</h2>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default MovieSection;
