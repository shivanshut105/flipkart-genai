/* eslint-disable @next/next/no-img-element */
import classes from './Card.module.css';
import Button from '../../UI/Button/Button';

const truncate = (str)=>{
  return str.length > 40 ? str.substring(0, 40) + "..." : str;
}

const Card = (props) => {
  return (
    <div className={classes.card}>
      <img src={props.image} alt={props.name}/>
      <div className={classes['card-body']}>
        <h2>{truncate(props.name)}</h2>
        <Button link={props.link}>Link</Button>
      </div>
    </div>
  );
}

export default Card;