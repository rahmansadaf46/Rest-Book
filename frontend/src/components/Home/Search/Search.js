import React from 'react';
// import { FloatingLettersTextBuilder } from 'react-animated-text-builders'
import './Search.css'

const Search = ({handleLocation}) => {
    return (
        <div style={{ marginTop: '68px' }} className="search-container">
            <div style={{ margin: '0 auto', textAlign: 'center' }} className="container">
                <h1 className="headline ">
                    <div>
                    <h1>Best food waiting for your belly</h1>
                    {/* <h2>Ride</h2> */}
                    </div>
                    <button onClick={()=> handleLocation()} style={{fontSize:'25px', borderRadius: '50px', margin:'50px 0px 0px 0px',color:'#E5194B', border:'4px solid #E5194B'}} class="btn btn-light " type="submit"><b>Search Restaurant</b></button>
                    
                    {/* <BlinkingCursorTextBuilder
                        floatingSpeed={500}
                        lettersAppearanceDelay={50}
                        textStyle={{ fontWeight: "bold", font: "Times New Roman", fontSize: "18px" }}
                        style={{ marginTop: "5px", marginBottom: "20px" }}
                        cursorComponent={<div style={{ color: "#393650" }}> 24/7!!</div>}
                        blinkTimeAfterFinish={-1}> We are open </BlinkingCursorTextBuilder> */}

                    {/* <p style={{ color: "#E5194B" }}><FloatingLettersTextBuilder
                        floatingSpeed={500}
                        lettersAppearanceDelay={50}
                        animationMaxMargin={"200px"}
                        animationMinMargin={"0px"}
                    > We&nbsp; are&nbsp; open&nbsp; 24/7!! </FloatingLettersTextBuilder></p> */}
                </h1>
                {/* <div style={{ position: 'relative' }} className="mt-4">
                    <input className="search-item pl-4" placeholder="Search items..." type="text" />
                    <button style={{ backgroundColor: '#E5194B', color: 'white', borderRadius: '30px', left: '-40px', top: '-2px', height: '40px', position: 'relative' }} className="btn pr-4 pl-4" href="#">Search</button>
                </div> */}
            </div>

        </div >
    );
};

export default Search;