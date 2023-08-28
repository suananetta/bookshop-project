import styles from './StarRating.module.css'

function StarRating(props) {
    
    let rate = props.rating/5*100;

    return (
        <div className={styles.rating}>
            <div 
                className={styles.ratingBody} 
                style={{'--rating': `${rate}%`}}>
            </div>
        </div>
    )
}

export default StarRating;