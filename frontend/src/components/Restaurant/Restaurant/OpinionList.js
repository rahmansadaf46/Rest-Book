import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-multi-carousel/lib/styles.css';
import { Container } from 'react-bootstrap';
import image from './profileImage.png'
const OpinionList = ({reviewData}) => {
    console.log(reviewData)
    // const [opinions, setOpinions] = useState([{data:{name:'Sadaf'}}])

    useEffect(() => {
        // fetch('http://localhost:4200/opinions')
        //     .then((response) => response.json())
        //     .then(data => {
        //         // console.log(data)
        //         setOpinions(data)
        //     })
    }, [])
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
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
        }
    };
    return (
        <section className='slider-container mb-5'>
            <Container>
                <div style={{ marginBottom: '10px' }}>
                    <h4 style={{ color: 'white', fontSize: '34px', fontWeight: '600' }} className='text-center text-dark'>
                        Publics <span className="text-danger">Review</span>
                    </h4>
                </div>

                <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={5000}
                    keyBoardControl={true} dotListClass="custom-dot-list-style" showDots={true}>
                    {
                        reviewData.map(opinion => {
                            return (
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <img src={image} alt="" style={{ width: '60px', position: 'relative', top: '30px', }} />
                                    </div>
                                    <div className="mx-3 text-center" style={{ border: '1px solid black', background: 'white', height: '200px', borderRadius: '15px' }}>

                                        <p style={{ marginTop: '30px' }} className=" text-danger"><b>{opinion.name}</b></p>
                                        <p className="mt-4  text-info"><b>{opinion.review}</b></p>

                                        {/* <img className='carousel-image' src='https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcarousel&psig=AOvVaw1r280-b5ItRv-IZYZI_oEC&ust=1637175820011000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPiUlK7JnfQCFQAAAAAdAAAAABAD' alt="" /> */}
                                    </div>
                                </div>

                            )
                        })
                    }
                </Carousel>
            </Container>
        </section>
    );
};

export default OpinionList;
