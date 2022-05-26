import classes from './Card.module.css'

const Card = (props) => {
   return (
      <section className={`${classes.wrapper} ${classes.props}`}>
         {props.children}
      </section>
   )
}

export default Card
