import classes from './Button.module.css';

const button = (props) => {
    return (
        <a href={props.link}>
            <button className={classes.button}>{props.children}</button>
        </a>
    );
}

export default button;