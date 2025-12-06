import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const MarqueeSection = () => {
const location = useLocation();

// Detect screen size
const [screenWidth, setScreenWidth] = useState(window.innerWidth);

useEffect(() => {
const handleResize = () => setScreenWidth(window.innerWidth);
window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, []);

// Responsive values
const isTablet = screenWidth <= 991 && screenWidth > 768;
const isMobile = screenWidth <= 768;

// Duplicated slides to ensure looping works
const topSlides = [
"Challenge your mind.",
"Decode every layer.",
"Challenge your mind.",
"Decode every layer.",
];

const bottomSlides = [
"Conquer the flag.",
"Hack Smart. Think Faster.",
"Conquer the flag.",
"Hack Smart. Think Faster.",
];

// Function to dynamically style text
const getTextStyle = () => {
let fontSize = "80px";
let gap = "40px";
let circleHeight = "30px";

if (isTablet) {
fontSize = "50px";
gap = "28px";
circleHeight = "24px";
} else if (isMobile) {
fontSize = "38px";
gap = "18px";
circleHeight = "18px";
}

return { fontSize, gap, circleHeight };
};

const { fontSize, gap, circleHeight } = getTextStyle();

return (
<div
className="gt-marque-section"
style={{
position: "relative",
zIndex: 1,
overflow: "hidden",
padding: isMobile ? "20px 0" : "40px 0",
}}
>
{/* Top Marquee (left to right) */}
<div className="marquee-text-slider-3 style-11">
<Swiper
key={location.pathname + "-top"}
modules={[Autoplay]}
slidesPerView="auto"
loop={true}
speed={6000}
autoplay={{
delay: 1,
disableOnInteraction: false,
pauseOnMouseEnter: false,
}}
allowTouchMove={false}
style={{ transitionTimingFunction: "linear" }}
>
{topSlides.map((text, idx) => (
<SwiperSlide key={idx} style={{ width: "auto" }}>
<div
style={{
display: "flex",
alignItems: "center",
gap: gap,
}}
>
<span
style={{
fontSize: fontSize,
fontWeight: "700",
color: "#fff",
lineHeight: "1",
whiteSpace: "nowrap",
textTransform: "uppercase",
}}
>
{text}
</span>
{idx % 2 === 0 && (
<span>
<img
src="/assets/img/home-1/circle.png"
alt="circle"
style={{ height: circleHeight }}
/>
</span>
)}
</div>
</SwiperSlide>
))}
</Swiper>
</div>

{/* Bottom Marquee (right to left) */}
<div className="marquee-text-slider-3 style-12">
<Swiper
key={location.pathname + "-bottom"}
modules={[Autoplay]}
slidesPerView="auto"
loop={true}
speed={6000}
autoplay={{
delay: 1,
disableOnInteraction: false,
pauseOnMouseEnter: false,
reverseDirection: true,
}}
allowTouchMove={false}
style={{ transitionTimingFunction: "linear" }}
>
{bottomSlides.map((text, idx) => (
<SwiperSlide key={idx} style={{ width: "auto" }}>
<div
style={{
display: "flex",
alignItems: "center",
gap: gap,
}}
>
<span
style={{
fontSize: fontSize,
fontWeight: "700",
color: "#fff",
lineHeight: "1",
whiteSpace: "nowrap",
textTransform: "uppercase",
}}
>
{text}
</span>
{idx % 2 === 0 && (
<span>
<img
src="/assets/img/home-1/circle.png"
alt="circle"
style={{ height: circleHeight }}
/>
</span>
)}
</div>
</SwiperSlide>
))}
</Swiper>
</div>
</div>
);
};

export default MarqueeSection;

