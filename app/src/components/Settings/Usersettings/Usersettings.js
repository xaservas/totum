// base page
import './usersettings.scss';

function Usersettings() {
  return (
    <form className='createProfile'>
      <input
        name='firstname'
        type='text'
        className='input'
        placeholder='Prénom'
      />
      <input name='lastname' type='text' className='input' placeholder='Nom' />
      <input name='email' type='email' className='input' placeholder='Mail' />
      <div className='password'>
        <input
          name='password'
          type='password'
          className='input'
          placeholder='Nouveau Mot de passe'
        />
        <input
          name='passwordConfirmation'
          type='password'
          className='input'
          placeholder='Confirmation de Mot de passe'
        />
      </div>
      <input
        name='address'
        type='text'
        className='input'
        placeholder='Adresse'
      />
      <div className='zipCity'>
        <input
          name='zipCode'
          type='text'
          className='input'
          placeholder='Code Postal'
        />
        <input name='city' type='text' className='input' placeholder='Ville' />
      </div>
      <input name='country' type='text' className='input' placeholder='Pays' />
      <input
        name='zip_code'
        type='text'
        className='input'
        placeholder='Code Postal'
      />
      <input
        name='about'
        type='text'
        className='textarea'
        placeholder='Présente toi en quelques ligne'
      />
      <div className='OptionLogin'>
        <label className='checkbox'>
          <input name='landmark' type='checkbox' />{' '}
          <span className='slider round'> </span> <p> Géolocalisation </p>{' '}
        </label>
        <label className='checkbox'>
          <input name='cookie' type='checkbox' />{' '}
          <span className='slider round'> </span> <p> Coockies </p>{' '}
        </label>
        <label className='checkbox'>
          <input name='notification' type='checkbox' />
          <span className='slider round'> </span> <p> Notification </p>
        </label>

        <label className='checkbox'>
          <input name='email' type='checkbox' />
          <span className='slider round'> </span> <p> E-mails </p>
        </label>

        <label className='checkbox'>
          <input name='sms' type='checkbox' />
          <span className='slider round'> </span> <p> SMS </p>
        </label>
      </div>
      <button className='button'> Valider </button>{' '}
    </form>
  );
}

export default Usersettings;
