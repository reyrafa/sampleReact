import Banner from "../components/Banner.js";
import FeaturedCourse from "../components/FeaturedCourse.js";
import Highlights from "../components/Highlights.js";

export default function Home() {
    const data = {
        title: "Zuitt Coding Bootcamp",
        content: "Opportunities for everyone, everywhere",
        destination: "/courses",
        label: "Enroll now!",
    };

    return (
        <>
            <Banner data={data} />
            <Highlights />
            <FeaturedCourse/>
        </>
    );
}
