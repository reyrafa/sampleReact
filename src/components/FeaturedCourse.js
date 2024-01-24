import { CardGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

import PreviewCourses from "./PreviewCourses.js";

export default function FeaturedCourses() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/courses/`)
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
                // Create two empty arrays to be used to store random numbers and featured course data.
                const numbers = [];
                const featured = [];

                //Creating a function that will generate a random number from 0 to the lenght of the data array.

                const generateRandomNums = () => {
                    let randomNum = Math.floor(Math.random() * data.length);

                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {    
                        generateRandomNums();
                    }
                };

                for (let i = 0; i < 5; i++) {
                    generateRandomNums();

                    featured.push(
                        <PreviewCourses
                            data={data[numbers[i]]}
                            key={numbers[i]}
                        />
                    );
                }

                setPreviews(featured);
            });
    }, []);

    return (
        <>
            <h1 className="text-center">Featured Courses</h1>
            <CardGroup className="justify-content-around">
            {previews}
            </CardGroup>
            
        </>
    );
}
