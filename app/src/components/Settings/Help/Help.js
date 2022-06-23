import './help.scss';

function Help() {
  return (
    <div className='help'>
      <h1>Aide</h1>
      <h2>Nous contacter</h2>
      <form action='mailto:someone@example.com'>
        <input
          required
          name='email'
          type='email'
          className='input'
          placeholder='Mail'
        />
        <input
          name='about'
          type='text'
          className='textarea'
          placeholder='Présente toi en quelques ligne'
        />
        <button className='button' type='submit'>
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Help;
