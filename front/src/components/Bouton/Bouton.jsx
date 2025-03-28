import './Bouton.css';

const Bouton = ({ text, mail, href, onClick }) => {
  const link = href || (mail && `mailto:${mail}`);

  if (link) {
    return (
      <a href={link} className="bouton-link">
        <button className="Bouton">{text}</button>
      </a>
    );
  }

  return (
    <button className="Bouton" onClick={onClick}>
      {text}
    </button>
  );
}

export default Bouton;