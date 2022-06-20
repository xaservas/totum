import './help.scss';

function Help() {
  return (
    <div className='help'>
      <h1>Aide</h1>
      <h2>Nous contacter</h2>
      <form>
        <input
          name='about'
          type='text'
          className='textarea'
          placeholder='Présente toi en quelques ligne'
        />
        <button className='button'> Envoyer </button>{' '}
      </form>
    </div>
  );
}

export default Help;
