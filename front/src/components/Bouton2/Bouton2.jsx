import './Bouton2.css';

const Bouton = ({ text, mail, href, onClick }) => {
  const link = href || (mail && `mailto:${mail}`);

  if (link) {
    return (
      <a href={link} className="bouton-link">
        <button className="Bouton2">{text}</button>
      </a>
    );
  }

  return (
    <button className="Bouton2" onClick={onClick}>
      {text}
    </button>
  );
}

export default Bouton;