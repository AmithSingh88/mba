import React from 'react';
import Header from '../../components/header/Header';
import img1 from '../../assets/carousel-img/1.avif';
import img2 from '../../assets/carousel-img/2.png';
import img3 from '../../assets/carousel-img/3.avif';
import img4 from '../../assets/carousel-img/4.avif';
import ImageCarousel from '../../components/image-carousel/ImageCarousel';

const Home = () => {
    return (
        <div>
            <Header />


            <ImageCarousel  images={[img1, img2, img3, img4 ]}/>
        </div>
    )
}


export default Home;
