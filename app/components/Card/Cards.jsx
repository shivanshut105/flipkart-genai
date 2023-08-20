import Card from "./Card";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'
import classes from './Cards.module.css';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    },
};

const Cards = (props) => {
    if(props.items.length===0) return;
    return (
        <>
            <h1 className={classes.title}>{props.title}</h1>
            <Carousel responsive={responsive} className="px-4">
                {props.items.map((item, i) => {
                    return <Card  key={i} name={item.name} image={item.image} link={item.link} />
                })}
            </Carousel>
        </>
    );
}

export default Cards;