import './notification.scss';

function Notification() {
  return (
    <div className='notification'>
      <p>Notifications, e-mail et SMS</p>

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
  );
}

export default Notification;
