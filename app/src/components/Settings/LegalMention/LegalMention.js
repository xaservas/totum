import './legalMention.scss';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LegalMention({ funct }) {
  return (
    <div className='legalMention-full'>
      <FontAwesomeIcon
        icon={regular('circle-xmark')}
        onClick={() => funct.closeAllModal()}
        className='login-close'
      />
      <h1 className='title'>Mentions légales</h1>
      <p className='text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam suscipit
        rem tempora consequatur iste incidunt, veritatis quisquam veniam atque
        officiis omnis provident dolore perspiciatis voluptate itaque alias
        accusantium! Sunt, sapiente. Fugiat ex veniam autem commodi nostrum.
        Culpa dicta debitis optio officiis modi. Quod, dolorem, culpa odit
        temporibus itaque perspiciatis a ullam expedita nostrum delectus vitae
        id mollitia recusandae, commodi animi? Maxime consectetur temporibus
        necessitatibus esse debitis atque quod sint facere. Rem fuga ea sapiente
        quis laudantium reiciendis consequuntur incidunt accusamus non hic ad
        quidem aspernatur consequatur, voluptates placeat cupiditate sunt.
      </p>
    </div>
  );
}

export default LegalMention;
