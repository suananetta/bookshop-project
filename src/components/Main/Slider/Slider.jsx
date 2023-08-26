import uniqid from 'uniqid';
import { useEffect, useState } from 'react';

import styles from './Slider.module.css';

import Button from '../../_shared/Button/Button';

function Slider() {
    const [slides, setSlides] = useState([
        {
            id: 'banner1',
            name: 'banner1 - black friday',
            visability: true
        },
        {
            id: 'banner2',
            name: 'banner2 - top 10 books',
            visability: false
        },
        {
            id: 'banner3',
            name: 'banner3 - check out',
            visability: false
        }
    ]);

    let [bannerStyle, setBannerStyle] = useState('banner1');

    let handleClick = (e) => {
        console.log(e.target.id);

        let newSlides = [];

        slides.map(image => {
            image.id === e.target.id? image.visability = true : image.visability = false;
            if(image.visability === true) setBannerStyle(image.id);
        })

        newSlides = [...slides];
        setSlides(newSlides);
    }

    return (
        <div className={styles.sliderBlock}>
            {slides.map(image => {
                return image.visability? 
                    <div className={styles[bannerStyle]} key={uniqid()}></div>
                        : 
                    <></>;
                })
            }
            <div className={styles.dots}>
                <Button
                    btnClass={styles.dot}
                    btnID='banner1'
                    disabled={false}
                    onClick={handleClick}
                />
                <Button
                    btnClass={styles.dot}
                    btnID='banner2'
                    disabled={false}
                    onClick={handleClick}
                />
                <Button
                    btnClass={styles.dot}
                    btnID='banner3'
                    disabled={false}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default Slider;